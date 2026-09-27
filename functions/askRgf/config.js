// Ask RGF server configuration. Secrets (OPENAI_API_KEY, OPENAI_VECTOR_STORE_ID) are bound
// in index.js through Secret Manager; nothing here is sent to the browser.

const CTA = Object.freeze({ label: 'Tell us your business problem', href: '/contact' });

const STATUSES = Object.freeze(['answered', 'out_of_scope', 'restricted', 'insufficient_information', 'error']);

const MESSAGES = Object.freeze({
  restricted:
    'I can assist with information about RGF Intelligence Solutions’ services, solutions, industries, and engagement process. Information about ownership, partners, personnel, and internal company operations is not available through this assistant.',
  outOfScope:
    'I’m limited to information about RGF Intelligence Solutions’ services, solutions, industries, and engagement process.',
  insufficient:
    'I don’t have enough approved information to answer that. I can help with RGF’s services, solutions, industries, and engagement process.',
  sensitive:
    'For your privacy, please don’t share personal, confidential, or sensitive information in this chat. I can help with RGF’s services, solutions, industries, and engagement process, or you can contact RGF directly.',
  error: 'Ask RGF is temporarily unavailable. Please try again, or use Tell us your business problem to contact RGF.',
  invalid: 'Please send a shorter question about RGF’s services, solutions, industries, or engagement process.',
  rateLimited: 'You’ve sent several questions in a short time. Please wait a moment and try again.',
});

const DEFAULT_SUGGESTIONS = Object.freeze([
  'What does RGF do?',
  'What solutions do you provide?',
  'How do we engage?',
]);

// Only these vector-store files count as grounding for an "answered" reply.
// Policy files are retrievable (to reinforce refusals) but never count as business facts.
const KNOWLEDGE_FILES = Object.freeze([
  'company_overview.md',
  'services_and_solutions.md',
  'industries_and_use_cases.md',
  'engagement_and_value.md',
  'faqs.md',
]);

const DEFAULT_ALLOWED_ORIGINS = Object.freeze([
  'https://rgfintelligencesolutions.com',
  'https://www.rgfintelligencesolutions.com',
  'https://rgfintelligencesolutions-23133.web.app',
  'https://rgfintelligencesolutions-23133.firebaseapp.com',
]);

const LIMITS = Object.freeze({
  maxBodyBytes: 8 * 1024,
  maxMessageChars: 500,
  maxHistoryEntries: 6,
  maxHistoryChars: 1200,
  maxReplyChars: 1200,
  maxSuggestions: 3,
  maxSuggestionChars: 120,
  maxOutputTokens: 700,
  maxRetrievalResults: 6,
  minRetrievalScore: Number(process.env.ASK_RGF_MIN_RETRIEVAL_SCORE || 0.2),
  providerTimeoutMs: 20000,
});

const RATE_LIMITS = Object.freeze([
  { key: 'ip', windowMs: 60 * 1000, max: 8 },
  { key: 'ip', windowMs: 60 * 60 * 1000, max: 60 },
  { key: 'session', windowMs: 10 * 60 * 1000, max: 25 },
]);

function allowedOrigins() {
  const extra = (process.env.ASK_RGF_ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...extra]);
}

const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

module.exports = {
  CTA,
  STATUSES,
  MESSAGES,
  DEFAULT_SUGGESTIONS,
  KNOWLEDGE_FILES,
  LIMITS,
  RATE_LIMITS,
  OPENAI_MODEL,
  allowedOrigins,
};
