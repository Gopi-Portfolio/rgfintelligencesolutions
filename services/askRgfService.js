import { Platform } from 'react-native';

// Browser-facing Ask RGF endpoint. On the web it is served same-origin through the Firebase Hosting
// rewrite in firebase.json; no OpenAI key, vector store ID or instructions ever reach the client.
const DEFAULT_ENDPOINT = Platform.OS === 'web' ? '/api/askRgf' : 'https://rgfintelligencesolutions-23133.web.app/api/askRgf';
const ENDPOINT = process.env.EXPO_PUBLIC_ASK_RGF_ENDPOINT || DEFAULT_ENDPOINT;
const TIMEOUT_MS = 25000;

export const ASK_RGF_STATUSES = ['answered', 'out_of_scope', 'restricted', 'insufficient_information', 'error'];

export class AskRgfError extends Error {
  constructor(kind, message) {
    super(message);
    this.kind = kind; // 'timeout' | 'rate_limited' | 'network' | 'server'
    this.serverMessage = message;
  }
}

export function createSessionId() {
  const bytes = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** Sends one question. Resolves to the server's reply JSON or throws AskRgfError. */
export async function askRgf({ message, sessionId, history, signal }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), TIMEOUT_MS);
  const onExternalAbort = () => controller.abort('cancelled');
  signal?.addEventListener('abort', onExternalAbort);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ message, sessionId, history }),
      signal: controller.signal,
    });
    const body = await response.json().catch(() => null);
    const valid = body && typeof body.message === 'string' && ASK_RGF_STATUSES.includes(body.status);
    if (__DEV__ && !valid) {
      // Dev hint only (no chat content): `expo start` does not serve /api/askRgf — use the Firebase emulators.
      console.warn(`Ask RGF: ${ENDPOINT} returned HTTP ${response.status} without a valid Ask RGF reply. Is the askRgf function running?`);
    }

    if (response.status === 429) throw new AskRgfError('rate_limited', valid ? body.message : undefined);
    if (!response.ok || !valid || body.status === 'error') {
      throw new AskRgfError('server', valid ? body.message : undefined);
    }
    return body;
  } catch (error) {
    if (error instanceof AskRgfError) throw error;
    if (controller.signal.aborted && controller.signal.reason === 'cancelled') throw error;
    throw new AskRgfError(controller.signal.aborted ? 'timeout' : 'network');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onExternalAbort);
  }
}
