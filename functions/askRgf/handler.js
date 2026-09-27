// HTTP handler for the Ask RGF endpoint. Dependencies are injected so tests can run offline.
// Logs carry request metadata only — never message bodies, history, IPs, or model output.

const crypto = require('crypto');
const { CTA, LIMITS, MESSAGES } = require('./config');
const { validateRequestBody } = require('./request');
const { classifyMessage, filterHistory, safeReply, validateModelReply } = require('./policy');

function errorBody(message) {
  return { message, status: 'error', cta: { ...CTA }, suggestedQuestions: [] };
}

function clientIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || req.ip || 'unknown';
}

/**
 * @param {object} deps
 * @param {() => Function} deps.getModelCaller  lazily builds the OpenAI caller (secrets read at call time)
 * @param {Function} deps.rateLimiter           ({ ip, sessionId }) => boolean
 * @param {Set<string>} deps.allowedOrigins
 * @param {object} deps.logger                  { info, warn, error }
 * @param {Function} [deps.verifyAppCheck]      async (token) => boolean; enforced only when provided
 */
function createAskRgfHandler({ getModelCaller, rateLimiter, allowedOrigins, logger, verifyAppCheck }) {
  return async function askRgf(req, res) {
    const requestId = crypto.randomUUID();
    const startedAt = Date.now();
    const log = (level, fields) =>
      logger[level]('askRgf', { requestId, latencyMs: Date.now() - startedAt, ...fields });

    res.set('Cache-Control', 'no-store');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Request-Id', requestId);

    const origin = req.headers.origin;
    if (!origin || !allowedOrigins.has(origin)) {
      log('warn', { httpStatus: 403, category: 'origin_denied' });
      res.status(403).json(errorBody(MESSAGES.error));
      return;
    }
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Vary', 'Origin');
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type, X-Firebase-AppCheck');
    res.set('Access-Control-Max-Age', '600');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }
    if (req.method !== 'POST') {
      res.set('Allow', 'POST');
      log('warn', { httpStatus: 405, category: 'method_not_allowed' });
      res.status(405).json(errorBody(MESSAGES.error));
      return;
    }
    if (!/^application\/json\b/i.test(String(req.headers['content-type'] || ''))) {
      log('warn', { httpStatus: 415, category: 'content_type' });
      res.status(415).json(errorBody(MESSAGES.invalid));
      return;
    }
    const size = req.rawBody ? req.rawBody.length : Number(req.headers['content-length'] || 0);
    if (size > LIMITS.maxBodyBytes) {
      log('warn', { httpStatus: 413, category: 'too_large' });
      res.status(413).json(errorBody(MESSAGES.invalid));
      return;
    }

    if (verifyAppCheck) {
      const valid = await verifyAppCheck(req.headers['x-firebase-appcheck']).catch(() => false);
      if (!valid) {
        log('warn', { httpStatus: 401, category: 'app_check' });
        res.status(401).json(errorBody(MESSAGES.error));
        return;
      }
    }

    const parsed = validateRequestBody(req.body);
    if (!parsed.ok) {
      log('warn', { httpStatus: 400, category: 'invalid_request', reason: parsed.reason });
      res.status(400).json(errorBody(MESSAGES.invalid));
      return;
    }
    const { message, sessionId, history } = parsed.value;

    if (!rateLimiter({ ip: clientIp(req), sessionId })) {
      log('warn', { httpStatus: 429, category: 'rate_limited' });
      res.set('Retry-After', '60');
      res.status(429).json(errorBody(MESSAGES.rateLimited));
      return;
    }

    const preCheck = classifyMessage(message);
    if (preCheck) {
      log('info', { httpStatus: 200, status: preCheck.status, category: preCheck.category, model: false });
      res.status(200).json(safeReply(preCheck.status, preCheck.category));
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LIMITS.providerTimeoutMs + 2000);
    try {
      const callModel = getModelCaller();
      const result = await callModel({ message, history: filterHistory(history), signal: controller.signal });
      const { reply, category } = validateModelReply(result.text, { grounded: result.grounded });
      log('info', {
        httpStatus: 200,
        status: reply.status,
        category,
        model: true,
        retrievalCount: result.retrievalCount,
        usage: result.usage,
      });
      res.status(200).json(reply);
    } catch (error) {
      const errorClass = controller.signal.aborted ? 'timeout' : error?.constructor?.name || 'Error';
      log('error', { httpStatus: 503, category: 'provider_error', errorClass, providerStatus: error?.status });
      res.status(503).json(safeReply('error'));
    } finally {
      clearTimeout(timer);
    }
  };
}

module.exports = { createAskRgfHandler };
