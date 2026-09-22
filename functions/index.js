const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT || 587) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.submitContactForm = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const payload = req.body || {};
  const recipients = (process.env.CONTACT_RECIPIENTS || 'gopi@rgfintelligencesolutions.com').split(',').map((value) => value.trim()).filter(Boolean);

  if (!payload.email || !payload.message || !payload.firstName || !payload.lastName) {
    res.status(400).json({ ok: false, error: 'Missing required fields' });
    return;
  }

  const message = {
    from: process.env.SMTP_FROM || 'noreply@rgfintelligencesolutions.com',
    to: recipients,
    replyTo: payload.email,
    subject: payload.subject || '[RGF Inquiry] New message',
    html: `
      <h3>New Contact Inquiry</h3>
      <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${payload.company || 'Not provided'}</p>
      <p><strong>Industry:</strong> ${payload.industry || 'Not provided'}</p>
      <p><strong>Source:</strong> ${payload.source || 'Website'}</p>
      <p><strong>Submitted At:</strong> ${new Date().toISOString()}</p>
      <hr />
      <p>${(payload.message || '').replace(/\n/g, '<br />')}</p>
    `,
  };

  try {
    await transporter.sendMail(message);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact email send failed:', error);
    res.status(500).json({ ok: false, error: 'Failed to send email' });
  }
});
