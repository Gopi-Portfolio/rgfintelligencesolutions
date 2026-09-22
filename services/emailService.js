import { EMAIL_SERVICE_CONFIG, getConfiguredRecipients } from '../config/emailConfig';

function buildWebhookPayload(payload, recipients) {
  const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(' ').trim();
  const subject = `${EMAIL_SERVICE_CONFIG.subjectPrefix} ${payload.subject || 'New Inquiry'}`;
  const base = {
    ...payload,
    to: recipients,
    subject,
    source: 'rgf-website-app',
    submittedAt: new Date().toISOString(),
  };

  const isFormSubmit = /formsubmit\.co/i.test(EMAIL_SERVICE_CONFIG.endpoint || '');

  if (isFormSubmit) {
    return {
      _subject: subject,
      name: fullName || 'Website Inquiry',
      email: payload.email,
      company: payload.company || '',
      phone: payload.phone || '',
      industry: payload.industry || '',
      message: payload.message,
      source: base.source,
      submittedAt: base.submittedAt,
    };
  }

  return base;
}

export async function submitContactForm(payload) {
  const recipients = getConfiguredRecipients();
  const body = buildWebhookPayload(payload, recipients);

  if (!EMAIL_SERVICE_CONFIG.endpoint) {
    return {
      ok: false,
      error: 'No email endpoint configured for the current environment.',
      recipients,
      payload: body,
    };
  }

  try {
    const response = await fetch(EMAIL_SERVICE_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(
        errorText
          ? `Email request failed with status ${response.status}: ${errorText}`
          : `Email request failed with status ${response.status}`
      );
    }

    return {
      ok: true,
      recipients,
      response,
    };
  } catch (error) {
    return {
      ok: false,
      error: error?.message || 'Unknown email submission error',
      recipients,
      payload: body,
    };
  }
}
