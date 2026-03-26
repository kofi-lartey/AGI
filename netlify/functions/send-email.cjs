/**
 * Netlify Serverless Function: Email API
 * 
 * This function provides an API endpoint for sending transactional emails.
 * It's triggered by client-side requests or database webhooks.
 * 
 * Usage:
 * POST /.netlify/functions/send-email
 * {
 *   "type": "upload_confirmation" | "user_registration" | "password_reset" |
 *          "media_deletion" | "application_received" | "application_status" | "admin_alert",
 *   "to": "email@example.com",
 *   "data": { ... }
 * }
 * 
 * TODO: Configure environment variables in Netlify dashboard:
 * - CLIENT_URL: Your website URL (e.g., https://yourdomain.org)
 * - EMAIL_* variables (see email-service.cjs)
 */

const { sendEmail, isEmailConfigured } = require('./email-service');
const templates = require('./email-templates');

// Rate limiting (simple in-memory, use Redis in production)
const rateLimitMap = new Map();
const RATE_LIMIT = 20; // Max requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000;

const checkRateLimit = (ip) => {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW;
  } else {
    record.count++;
  }
  
  rateLimitMap.set(ip, record);
  return record.count <= RATE_LIMIT;
};

// Validate email address
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Handle different email types
const handleEmailRequest = async (type, data) => {
  let template;
  
  switch (type) {
    case 'upload_confirmation':
      template = templates.uploadConfirmation({
        userEmail: data.to,
        userName: data.userName || 'User',
        filename: data.filename,
        fileType: data.fileType,
        fileSize: formatFileSize(data.fileSize),
        uploadTime: new Date().toLocaleString(),
        mediaUrl: data.mediaUrl
      });
      break;
      
    case 'user_registration':
      template = templates.userRegistration({
        userEmail: data.to,
        userName: data.userName,
        tempPassword: data.tempPassword
      });
      break;
      
    case 'password_reset':
      template = templates.passwordReset({
        userEmail: data.to,
        userName: data.userName || 'User',
        resetToken: data.resetToken,
        expiryTime: data.expiryTime || '1 hour'
      });
      break;
      
    case 'media_deletion':
      template = templates.mediaDeletionAlert({
        adminEmail: data.to,
        adminName: data.adminName || 'Admin',
        filename: data.filename,
        deletedBy: data.deletedBy,
        deletionReason: data.deletionReason,
        deletedAt: new Date().toLocaleString()
      });
      break;
      
    case 'application_received':
      template = templates.applicationReceived({
        applicantName: data.applicantName,
        applicantEmail: data.to,
        companyName: data.companyName,
        applicationType: data.applicationType,
        serialNumber: data.serialNumber,
        submittedAt: new Date().toLocaleString()
      });
      break;
      
    case 'application_status':
      template = templates.applicationStatusUpdate({
        applicantName: data.applicantName,
        applicantEmail: data.to,
        companyName: data.companyName,
        status: data.status,
        serialNumber: data.serialNumber,
        reviewNotes: data.reviewNotes,
        reviewedBy: data.reviewedBy
      });
      break;
      
    case 'admin_alert':
      template = templates.adminAlert({
        alertType: data.alertType,
        title: data.title,
        message: data.message,
        details: data.details
      });
      break;
      
    default:
      // Custom email
      template = {
        subject: data.subject || 'Notification',
        html: data.html,
        text: data.text
      };
  }
  
  return template;
};

// Main handler
exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  // Check rate limit (using IP from headers or default)
  const clientIp = event.headers['x-forwarded-for'] || 'unknown';
  if (!checkRateLimit(clientIp)) {
    return {
      statusCode: 429,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Too many requests. Please try again later.' })
    };
  }
  
  // Check if email is configured
  if (!isEmailConfigured()) {
    console.warn('Email not configured - returning test response');
  }
  
  try {
    const body = JSON.parse(event.body);
    const { type, to, data, cc, bcc } = body;
    
    // Validate required fields
    if (!to) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required field: to' })
      };
    }
    
    if (!isValidEmail(to)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }
    
    if (!type && !data?.html) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing required fields: type or html content' })
      };
    }
    
    // Get template
    const template = await handleEmailRequest(type, { ...data, to });
    
    // Send email
    const result = await sendEmail(to, template.subject, template.html, template.text);
    
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        logged: result.logged || false
      })
    };
    
  } catch (error) {
    console.error('Email handler error:', error);
    
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message || 'Failed to send email'
      })
    };
  }
};
