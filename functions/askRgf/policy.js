// Deterministic scope checks (before the model) and reply validation (after the model).
// These run on every request, so a clear violation never reaches OpenAI and a bad model
// reply never reaches the browser.

const { CTA, MESSAGES, DEFAULT_SUGGESTIONS, LIMITS } = require('./config');

function normalize(text) {
  return String(text || '')
    .normalize('NFKC')
    .replace(/[‘’ʼ`]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// --- Visitor-submitted personal / sensitive data -------------------------------------------
const SENSITIVE_PATTERNS = [
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i, // email address
  /(?:\+?\d[\s().-]?){10,}/, // phone-like digit run
  /\b\d{3}-\d{2}-\d{4}\b/, // US SSN
  /\b(?:\d[ -]?){13,19}\b/, // card-like number
  /\b(my|the) (password|passcode|pin|login) (is|:)/,
  /\b(social security|ssn|credit card|card number|bank account number|routing number|passport number|driver'?s licen[cs]e number)\b/,
];

// --- Prompt injection / hidden-instruction extraction -----------------------------------------
const INJECTION_PATTERNS = [
  /\b(ignore|disregard|forget|override|bypass)\b.{0,40}\b(rules?|instructions?|guidelines?|polic(y|ies)|prompts?|restrictions?|guardrails?|context)\b/,
  /\b(act|behave|respond|operate) as (chatgpt|gpt|an? (general|unrestricted|different|new|other)|if you (are|were))/,
  /\bpretend (to be|you('re| are))\b/,
  /\byou are (now|no longer)\b/,
  /\b(jailbreak|dan mode|developer mode|god mode|sudo mode)\b/,
  /\brole[- ]?play\b/,
  /\b(new|updated|real|true) instructions\b/,
  /\b(base64|rot13|hex encoded|encoded version)\b/,
  /\brepeat (the|all|everything|your) (text|words|instructions|above)\b/,
  /\bwhat (were|are) you (told|instructed|programmed)\b/,
  /\b(system|hidden|initial|original|developer|internal|secret) (prompt|instructions|message|rules|configuration|config)\b/,
  /\b(your|the) (prompt|instructions)\b.{0,20}\b(show|reveal|print|display|output|share|leak)\b|\b(show|reveal|print|display|output|share|leak)\b.{0,20}\b(your|the) (prompt|instructions)\b/,
  /\bi am (an? )?(admin|administrator|developer|owner|employee) (of|at|for) rgf\b|\bi('m| am) authori[sz]ed\b/,
];

// --- Restricted company information ----------------------------------------------------------
const BENIGN_OWNER_PHRASES =
  /\b(business|small[- ]business|product|process|data|system|store|shop|restaurant|fleet|property|home|franchise|my|our) owners?\b/g;

const RESTRICTED_PATTERNS = [
  /\bowners?\b|\bowns\b|\bownership\b/,
  /\b(co-?)?founders?\b|\bfounded (by|it)\b|\bwho (started|runs|leads|manages|is behind|created)\b/,
  /\b(ceo|cto|cfo|coo|chief \w+ officer|president of rgf|board members?|investors?|shareholders?|leadership team|management team|(your|rgf'?s) executives)\b/,
  /\bpartners\b|\bpartnerships?\b|\bpartner (count|firms?|compan(y|ies)|list|names?|network)\b|\b(official|certified|gold|premier|preferred) partner\b/,
  /\b(employees?|headcount|head count|staff (count|size|members?|list)|team (size|members?)|how many (people|staff|consultants|engineers|developers)|contractors?|who works (at|for)|workforce|salar(y|ies)|payroll)\b/,
  /\b(biograph(y|ies)|bio of|resume of|linkedin (of|profile)|personal (email|phone|number|address|contact|details|information|life)|home address|(owner'?s|founder'?s|his|her|their) family|wife|husband|spouse|children of)\b/,
  /\b(revenue|profits?|profitability|turnover|earnings|valuation|funding|financials|balance sheet|income statement|net worth|bank (account|details|name|info)|banking|tax (id|return|filing|number|records?)|ein)\b/,
  /\bhow much (money )?(does rgf|do you) (make|earn)\b/,
  /\b(customer|client) (list|names|database|contracts?)\b|\blist (of )?(your )?(customers|clients)\b|\b(your|rgf'?s|existing|signed|current) contracts?\b|\bcontract (terms|value|details)\b/,
  /\b(internal|unpublished|confidential|private) (plans?|operations|documents?|processes|roadmap|data|information|strategy|pricing)\b|\b(your|rgf'?s|company'?s?) (internal )?roadmap\b|\bpricing exceptions?\b/,
  /\b(api keys?|secret keys?|access keys?|credentials?|passwords?|auth tokens?|vector ?store|vector ?db|embeddings? (id|store)|source code|repositor(y|ies)|github|server logs|chat logs|your logs|system logs|firewall|vulnerabilit(y|ies)|exploits?|hack(ing)?)\b|\b(your|rgf'?s|internal) (infrastructure|servers?|security controls|hosting)\b/,
  /\bwhich (llm|model|ai model|openai model|gpt)\b|\bwhat (llm|model|ai model) (do|are) you\b/,
];

// --- Clearly off-topic ------------------------------------------------------------------------
const OFF_TOPIC_PATTERNS = [
  /\b(weather|temperature outside|sports?|nba|nfl|mlb|nhl|soccer|football|cricket|baseball|basketball|world cup|super bowl|olympics|who won|final score|today'?s game|the game)\b/,
  /\b(elections?|presidents?|politic(s|al|ian|ians)?|democrats?|republicans?|congress|senate|parliament|prime minister|vote|voting|immigration|abortion|war in)\b/,
  /\b(celebrit(y|ies)|movies?|films?|tv shows?|netflix|songs?|lyrics|music|horoscope|zodiac|dating|girlfriend|boyfriend)\b/,
  /\b(recipes?|cook(ing)?|bake|baking)\b/,
  /\b(homework|essay|assignment|term paper|thesis|school project|exam|quiz)\b/,
  /\bwrite (me )?(a |an )?(poem|story|song|joke|limerick|haiku|speech|cover letter|resume)\b|\btell me a (joke|story|riddle)\b/,
  /\b(diagnos(e|is)|symptoms?|medical advice|medication|dosage|treatment for|am i sick|disease|illness|therapy for)\b/,
  /\b(legal advice|lawyer|attorney|lawsuit|sue (someone|my|a)|custody|divorce)\b/,
  /\b(investment advice|stocks? to buy|should i (buy|sell|invest)|crypto(currency)?|bitcoin|ethereum|forex|stock market|retirement account|mortgage rates?)\b/,
  /\b(write|give me|generate|create|fix|debug)\b.{0,40}\b(code|script|function|program|sql query|regex|python|javascript|typescript|java|c\+\+|c#|html|css|bash|algorithm)\b/,
  /```/,
  /\b(capital of|population of|meaning of life|how tall is|how old is|who invented|solve for|square root|derivative of|integral of)\b/,
  /\bnews\b(?!.{0,20}\brgf\b)/,
];

// "Which clients have you worked with?" — not restricted, but no approved source exists.
const UNSUPPORTED_CLAIM_PATTERNS = [
  /\b(clients?|customers?|brands?|companies)\b.{0,40}\b(served|worked (with|for)|have you (had|helped|done)|you'?ve (had|helped|served|worked))\b/,
  /\b(famous|notable|big|major|past|previous|existing|current) (clients?|customers?)\b/,
  /\b(case stud(y|ies)|testimonials?|(client|customer) references|provide references|(customer|client|online|google) reviews|certifications?|certified|awards?|iso \d+|soc ?2)\b/,
  /\b(office|offices|headquarters|located|location)\b/,
];

function matchAny(patterns, text) {
  return patterns.some((pattern) => pattern.test(text));
}

/**
 * Deterministic pre-model classification.
 * Returns null when the request may go to the model, else { status, category }.
 */
function classifyMessage(message) {
  const raw = String(message || '');
  const text = normalize(raw);

  if (matchAny(SENSITIVE_PATTERNS, raw) || matchAny(SENSITIVE_PATTERNS, text)) {
    return { status: 'restricted', category: 'sensitive_data' };
  }
  if (matchAny(INJECTION_PATTERNS, text)) {
    return { status: 'restricted', category: 'injection' };
  }
  const withoutBenignOwners = text.replace(BENIGN_OWNER_PHRASES, ' ');
  if (matchAny(RESTRICTED_PATTERNS, withoutBenignOwners)) {
    return { status: 'restricted', category: 'restricted_info' };
  }
  if (matchAny(OFF_TOPIC_PATTERNS, text)) {
    return { status: 'out_of_scope', category: 'off_topic' };
  }
  if (matchAny(UNSUPPORTED_CLAIM_PATTERNS, text)) {
    return { status: 'insufficient_information', category: 'unsupported_claim' };
  }
  return null;
}

/** History entries that would be refused on their own are dropped before reaching the model. */
function filterHistory(history) {
  return history.filter((entry) => entry.role !== 'user' || classifyMessage(entry.content) === null);
}

function safeReply(status, category) {
  const message =
    category === 'sensitive_data'
      ? MESSAGES.sensitive
      : status === 'restricted'
        ? MESSAGES.restricted
        : status === 'out_of_scope'
          ? MESSAGES.outOfScope
          : status === 'error'
            ? MESSAGES.error
            : MESSAGES.insufficient;
  return {
    message,
    status,
    cta: { ...CTA },
    suggestedQuestions: [...DEFAULT_SUGGESTIONS],
  };
}

// --- Post-model validation --------------------------------------------------------------------
const UNSAFE_OUTPUT_PATTERNS = [
  /<\s*[a-z!/][^>]*>/i, // HTML
  /\bjavascript:/i,
  /https?:\/\//i,
  /\bwww\./i,
  /\[[^\]]*\]\([^)]*\)/, // markdown link
  /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i, // email
  /(?:\+?\d[\s().-]?){10,}/, // phone
  /\bvs_[a-z0-9]{6,}/i, // vector store id
  /\bfile-[a-z0-9]{8,}/i, // file id
  /\bsk-[a-z0-9_-]{8,}/i, // API key
  /\b(authoritative system instructions|source discipline|output contract|system prompt|my instructions)\b/i,
];

const RESTRICTED_OUTPUT_PATTERNS = [
  /\b(co-?)?founders?\b|\bfounded by\b|\bowned by\b|\bowner of rgf\b|\brgf'?s owners?\b/i,
  /\b(ceo|cto|cfo|coo)\b/i,
  /\b(headcount|employees|revenue|profits?|valuation|salar(y|ies))\b/i,
  /\$\s?\d/, // price quotes
];

function cleanText(text) {
  return String(text)
    .replace(/\r\n?/g, '\n')
    .replace(/\*\*|__/g, '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function cleanSuggestions(value) {
  if (!Array.isArray(value)) return [...DEFAULT_SUGGESTIONS];
  const cleaned = value
    .filter((item) => typeof item === 'string')
    .map((item) => cleanText(item).replace(/\s+/g, ' '))
    .filter((item) => item.length > 0 && item.length <= LIMITS.maxSuggestionChars)
    .filter((item) => !matchAny(UNSAFE_OUTPUT_PATTERNS, item) && classifyMessage(item) === null)
    .slice(0, LIMITS.maxSuggestions);
  return cleaned.length ? cleaned : [...DEFAULT_SUGGESTIONS];
}

const MODEL_KEYS = ['message', 'status', 'includeCta', 'suggestedQuestions', 'sources'];

/**
 * Converts raw model output into the public response shape, or a deterministic safe reply.
 * `grounded` is the server's own retrieval check, independent of what the model claims.
 * Returns { reply, category }.
 */
function validateModelReply(rawText, { grounded }) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return { reply: safeReply('insufficient_information'), category: 'malformed_output' };
  }

  const keys = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? Object.keys(parsed) : [];
  const shapeOk =
    keys.length === MODEL_KEYS.length &&
    MODEL_KEYS.every((key) => keys.includes(key)) &&
    typeof parsed.message === 'string' &&
    typeof parsed.includeCta === 'boolean' &&
    ['answered', 'out_of_scope', 'restricted', 'insufficient_information'].includes(parsed.status);
  if (!shapeOk) {
    return { reply: safeReply('insufficient_information'), category: 'malformed_output' };
  }

  if (parsed.status !== 'answered') {
    // Refusals always use the approved wording rather than model-authored text.
    return { reply: safeReply(parsed.status), category: `model_${parsed.status}` };
  }

  if (!grounded) {
    return { reply: safeReply('insufficient_information'), category: 'ungrounded' };
  }

  const message = cleanText(parsed.message);
  if (!message || message.length > LIMITS.maxReplyChars * 1.5) {
    return { reply: safeReply('insufficient_information'), category: 'malformed_output' };
  }
  if (matchAny(UNSAFE_OUTPUT_PATTERNS, message)) {
    return { reply: safeReply('insufficient_information'), category: 'unsafe_output' };
  }
  if (matchAny(RESTRICTED_OUTPUT_PATTERNS, message)) {
    return { reply: safeReply('restricted'), category: 'restricted_output' };
  }

  const reply = {
    message: message.length > LIMITS.maxReplyChars ? `${message.slice(0, LIMITS.maxReplyChars).replace(/\s+\S*$/, '')}…` : message,
    status: 'answered',
    suggestedQuestions: cleanSuggestions(parsed.suggestedQuestions),
  };
  if (parsed.includeCta) reply.cta = { ...CTA };
  return { reply, category: 'answered' };
}

module.exports = {
  normalize,
  classifyMessage,
  filterHistory,
  safeReply,
  validateModelReply,
  MODEL_KEYS,
};
