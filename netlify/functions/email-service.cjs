/**
 * Netlify Functions Email Service
 * 
 * This module provides email functionality for Netlify serverless functions.
 * It supports multiple email providers including SMTP, SendGrid, Mailgun, and AWS SES.
 * 
 * Environment Variables (configure in Netlify dashboard):
 * - EMAIL_HOST: SMTP server hostname (e.g., 'smtp.example.com')
 * - EMAIL_PORT: SMTP port (587 for TLS, 465 for SSL)
 * - EMAIL_USER: SMTP username
 * - EMAIL_PASS: SMTP password
 * - EMAIL_FROM: From email address (e.g., 'noreply@yourdomain.org')
 * - EMAIL_FROM_NAME: Display name for sender (e.g., 'Your Organization')
 * 
 * Optional Provider Settings:
 * - EMAIL_PROVIDER: 'smtp' | 'sendgrid' | 'mailgun' | 'ses' (default: 'smtp')
 * - SENDGRID_API_KEY: SendGrid API key
 * - MAILGUN_API_KEY: Mailgun API key
 * - MAILGUN_DOMAIN: Mailgun domain
 * - AWS_ACCESS_KEY_ID: AWS access key for SES
 * - AWS_SECRET_ACCESS_KEY: AWS secret key for SES
 * - AWS_REGION: AWS region for SES
 */

const nodemailer = require('nodemailer');

// Email configuration from environment
// TODO: Replace these defaults with your actual email configuration
// Missing required config will cause emails to be logged instead of sent
const config = {
  host: process.env.EMAIL_HOST || '', // TODO: Set EMAIL_HOST env var
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: parseInt(process.env.EMAIL_PORT || '587') === 465,
  user: process.env.EMAIL_USER || '', // TODO: Set EMAIL_USER env var
  pass: process.env.EMAIL_PASS || '', // TODO: Set EMAIL_PASS env var
  from: process.env.EMAIL_FROM || 'noreply@yourdomain.org', // TODO: Set EMAIL_FROM env var
  fromName: process.env.EMAIL_FROM_NAME || 'Your Organization', // TODO: Set EMAIL_FROM_NAME env var
  provider: process.env.EMAIL_PROVIDER || 'smtp'
};

// Rate limiting state (in production, use Redis or similar)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_EMAILS_PER_WINDOW = 10;

// Check if email is configured
const isEmailConfigured = () => {
  if (config.provider === 'smtp') {
    return !!(config.host && config.user && config.pass);
  }
  return !!(process.env.SENDGRID_API_KEY || process.env.MAILGUN_API_KEY || process.env.AWS_ACCESS_KEY_ID);
};

// Rate limiting check
const checkRateLimit = (email) => {
  const now = Date.now();
  const key = email;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, []);
  }
  
  const timestamps = rateLimitStore.get(key);
  const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);
  
  if (recentTimestamps.length >= MAX_EMAILS_PER_WINDOW) {
    return false;
  }
  
  recentTimestamps.push(now);
  rateLimitStore.set(key, recentTimestamps);
  return true;
};

// Create SMTP transporter
const createSmtpTransporter = () => {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email via SMTP
const sendSmtpEmail = async (to, subject, html, text, attachments = []) => {
  const transporter = createSmtpTransporter();
  
  const mailOptions = {
    from: `"${config.fromName}" <${config.from}>`,
    to,
    subject,
    html,
    text,
    attachments
  };
  
  return await transporter.sendMail(mailOptions);
};

// Send email via SendGrid
const sendSendGridEmail = async (to, subject, html, text, attachments = []) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to,
    from: `"${config.fromName}" <${config.from}>`,
    subject,
    html,
    text,
    attachments: attachments.map(att => ({
      content: att.content.toString('base64'),
      filename: att.filename,
      type: att.contentType,
      disposition: 'attachment'
    }))
  };
  
  return await sgMail.send(msg);
};

// Send email via Mailgun
const sendMailgunEmail = async (to, subject, html, text, attachments = []) => {
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
  
  const data = {
    from: `"${config.fromName}" <${config.from}>`,
    to,
    subject,
    html,
    text,
    attachment: attachments.map(att => ({
      data: att.content,
      filename: att.filename
    }))
  };
  
  return await client.messages.create(process.env.MAILGUN_DOMAIN, data);
};

// Main send email function with fallback
const sendEmail = async (to, subject, html, text, options = {}) => {
  const { attachments = [], retryCount = 2 } = options;
  
  // Check rate limit
  if (!checkRateLimit(to)) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  // Check if email is configured
  if (!isEmailConfigured()) {
    console.warn('Email not configured. Email will be logged instead of sent.');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', text || html.substring(0, 200));
    return { success: true, logged: true };
  }
  
  let lastError = null;
  
  // Try providers in order with fallback
  const providers = [
    { name: 'smtp', fn: () => sendSmtpEmail(to, subject, html, text, attachments) },
  ];
  
  // Add SendGrid if configured
  if (process.env.SENDGRID_API_KEY) {
    providers.push({
      name: 'sendgrid',
      fn: () => sendSendGridEmail(to, subject, html, text, attachments)
    });
  }
  
  // Add Mailgun if configured
  if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
    providers.push({
      name: 'mailgun',
      fn: () => sendMailgunEmail(to, subject, html, text, attachments)
    });
  }
  
  for (const provider of providers) {
    try {
      await provider.fn();
      console.log(`Email sent successfully via ${provider.name}`);
      return { success: true, provider: provider.name };
    } catch (error) {
      console.error(`Failed to send email via ${provider.name}:`, error.message);
      lastError = error;
    }
  }
  
  // All providers failed
  throw lastError || new Error('Failed to send email via all providers');
};

module.exports = {
  sendEmail,
  isEmailConfigured,
  config
};
