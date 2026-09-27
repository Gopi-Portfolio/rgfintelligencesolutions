// Fixed-window rate limiter held in instance memory. The function's maxInstances cap bounds the
// worst case; move to Firestore/Redis if stricter cross-instance limits are needed.

const crypto = require('crypto');
const { RATE_LIMITS } = require('./config');

const MAX_TRACKED_KEYS = 20000;

function createRateLimiter(rules = RATE_LIMITS, now = () => Date.now()) {
  const buckets = new Map();

  function sweep(time) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= time) buckets.delete(key);
    }
  }

  function hit(key, windowMs, max, time) {
    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= time) {
      bucket = { count: 0, resetAt: time + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;
    return bucket.count <= max;
  }

  /** Returns true when the request is allowed. Identifiers are hashed; raw IPs are never stored. */
  return function check({ ip, sessionId }) {
    const time = now();
    if (buckets.size > MAX_TRACKED_KEYS) sweep(time);
    const ids = {
      ip: crypto.createHash('sha256').update(String(ip || 'unknown')).digest('hex').slice(0, 24),
      session: String(sessionId || 'none'),
    };
    let allowed = true;
    for (const rule of rules) {
      if (!hit(`${rule.key}:${rule.windowMs}:${ids[rule.key]}`, rule.windowMs, rule.max, time)) allowed = false;
    }
    return allowed;
  };
}

module.exports = { createRateLimiter };
