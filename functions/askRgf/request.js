// Strict request-schema validation. Unknown fields anywhere are rejected.

const { LIMITS } = require('./config');

const SESSION_ID = /^[A-Za-z0-9_-]{8,64}$/;
const TOP_LEVEL_KEYS = new Set(['message', 'sessionId', 'history']);
const HISTORY_KEYS = new Set(['role', 'content']);

function onlyKeys(value, allowed) {
  return Object.keys(value).every((key) => allowed.has(key));
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** Returns { ok: true, value } or { ok: false, reason }. `reason` is for logs only. */
function validateRequestBody(body) {
  if (!isPlainObject(body) || !onlyKeys(body, TOP_LEVEL_KEYS)) {
    return { ok: false, reason: 'unknown_or_invalid_fields' };
  }

  const { message, sessionId, history = [] } = body;
  if (typeof message !== 'string') return { ok: false, reason: 'message_type' };
  const trimmed = message.trim();
  if (!trimmed || trimmed.length > LIMITS.maxMessageChars) return { ok: false, reason: 'message_length' };

  if (typeof sessionId !== 'string' || !SESSION_ID.test(sessionId)) return { ok: false, reason: 'session_id' };

  if (!Array.isArray(history) || history.length > LIMITS.maxHistoryEntries) return { ok: false, reason: 'history_length' };
  for (const entry of history) {
    if (!isPlainObject(entry) || !onlyKeys(entry, HISTORY_KEYS)) return { ok: false, reason: 'history_fields' };
    if (entry.role !== 'user' && entry.role !== 'assistant') return { ok: false, reason: 'history_role' };
    if (typeof entry.content !== 'string' || !entry.content.trim() || entry.content.length > LIMITS.maxHistoryChars) {
      return { ok: false, reason: 'history_content' };
    }
  }

  return {
    ok: true,
    value: {
      message: trimmed,
      sessionId,
      history: history.map((entry) => ({ role: entry.role, content: entry.content.trim() })),
    },
  };
}

module.exports = { validateRequestBody };
