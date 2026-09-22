const getEnv = (key, fallback = '') => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback;
  }
  return fallback;
};

const defaultRecipients = ['gopi@rgfintelligencesolutions.com', 'rose@rgfintelligencesolutions.com'];
const fallbackEndpoint = 'https://us-central1-rgf-website-app.cloudfunctions.net/submitContactForm';

export const EMAIL_RECIPIENTS = (() => {
  const configured = getEnv('EXPO_PUBLIC_CONTACT_EMAILS', defaultRecipients.join(','));
  return configured
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
})();

export const EMAIL_SERVICE_CONFIG = {
  provider: 'webhook',
  endpoint: getEnv('EXPO_PUBLIC_CONTACT_WEBHOOK_URL', fallbackEndpoint),
  subjectPrefix: '[RGF Inquiry]',
  retryOnFailure: false,
};

export const getConfiguredRecipients = () => EMAIL_RECIPIENTS;
