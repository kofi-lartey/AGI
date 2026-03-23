/**
 * Email Templates
 * 
 * HTML email templates for different notification types.
 * All templates are responsive and work with major email clients.
 */

const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AGI ACCRA</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #dc2626; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
    .header p { margin: 5px 0 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 30px 20px; }
    .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
    .button { display: inline-block; padding: 12px 24px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
    .button:hover { background-color: #b91c1c; }
    .alert { padding: 15px; border-radius: 6px; margin: 15px 0; }
    .alert-success { background-color: #d1fae5; color: #065f46; }
    .alert-error { background-color: #fee2e2; color: #991b1b; }
    .alert-info { background-color: #dbeafe; color: #1e40af; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background-color: #f9fafb; font-weight: 600; }
    .logo { width: 120px; height: auto; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AGI ACCRA</h1>
      <p>Association of Ghana Industries</p>
    </div>
    ${content}
    <div class="footer">
      <p>© ${new Date().getFullYear()} Association of Ghana Industries. All rights reserved.</p>
      <p>42 Dr. Isert Street, North Ridge, Accra, Ghana</p>
      <p>This is an automated message. Please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>
`;

// ============================================
// Upload Confirmation Email
// ============================================
exports.uploadConfirmation = (data) => {
  const { userEmail, userName, filename, fileType, fileSize, uploadTime, mediaUrl } = data;
  
  const content = `
    <div class="content">
      <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">Upload Confirmation</h2>
      <p>Dear ${userName || 'User'},</p>
      <p>Your file has been successfully uploaded to the AGI Media Hub.</p>
      
      <div class="alert alert-success">
        <strong>✓ Upload Successful</strong>
      </div>
      
      <table>
        <tr>
          <th>File Name</th>
          <td>${filename}</td>
        </tr>
        <tr>
          <th>File Type</th>
          <td>${fileType}</td>
        </tr>
        <tr>
          <th>File Size</th>
          <td>${fileSize}</td>
        </tr>
        <tr>
          <th>Upload Time</th>
          <td>${uploadTime}</td>
        </tr>
      </table>
      
      ${mediaUrl ? `<p><a href="${mediaUrl}" class="button">View Media</a></p>` : ''}
      
      <p style="margin-top: 20px;">You can manage your uploaded media from the <a href="https://agighana.org/admin">Admin Dashboard</a>.</p>
    </div>
  `;
  
  return {
    subject: `Upload Successful: ${filename}`,
    html: baseTemplate(content),
    text: `Upload Successful: Your file "${filename}" has been uploaded to the AGI Media Hub.`
  };
};

// ============================================
// New User Registration Email
// ============================================
exports.userRegistration = (data) => {
  const { userEmail, userName, tempPassword } = data;
  
  const content = `
    <div class="content">
      <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">Welcome to AGI ACCRA</h2>
      <p>Dear ${userName},</p>
      <p>Welcome to the Association of Ghana Industries admin platform. Your account has been created successfully.</p>
      
      <div class="alert alert-info">
        <strong>Account Details:</strong>
      </div>
      
      <table>
        <tr>
          <th>Email</th>
          <td>${userEmail}</td>
        </tr>
        ${tempPassword ? `<tr><th>Temporary Password</th><td>${tempPassword}</td></tr>` : ''}
      </table>
      
      <p style="margin-top: 20px;"><a href="https://agighana.org/admin" class="button">Access Admin Dashboard</a></p>
      
      <p style="margin-top: 20px; color: #dc2626;"><strong>Important:</strong> Please change your password after your first login.</p>
    </div>
  `;
  
  return {
    subject: 'Welcome to AGI ACCRA Admin',
    html: baseTemplate(content),
    text: `Welcome to AGI ACCRA! Your account has been created. Please log in at https://agighana.org/admin`
  };
};

// ============================================
// Password Reset Email
// ============================================
exports.passwordReset = (data) => {
  const { userEmail, userName, resetToken, expiryTime } = data;
  
  const content = `
    <div class="content">
      <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">Password Reset Request</h2>
      <p>Dear ${userName},</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="https://agighana.org/admin/reset-password?token=${resetToken}" class="button">Reset Password</a>
      </p>
      
      <div class="alert alert-info">
        <strong>Note:</strong> This link will expire in ${expiryTime || '1 hour'}.
      </div>
      
      <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
    </div>
  `;
  
  return {
    subject: 'Reset Your AGI ACCRA Password',
    html: baseTemplate(content),
    text: `Reset your AGI password: https://agighana.org/admin/reset-password?token=${resetToken}`
  };
};

// ============================================
// Media Deletion Alert
// ============================================
exports.mediaDeletionAlert = (data) => {
  const { adminEmail, adminName, filename, deletedBy, deletionReason, deletedAt } = data;
  
  const content = `
    <div class="content">
      <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">Media Deletion Alert</h2>
      <p>Dear Administrator,</p>
      <p>A media file has been deleted from the AGI Media Hub.</p>
      
      <div class="alert alert-error">
        <strong>⚠ File Deleted</strong>
      </div>
      
      <table>
        <tr>
          <th>File Name</th>
          <td>${filename}</td>
        </tr>
        <tr>
          <th>Deleted By</th>
          <td>${deletedBy}</td>
        </tr>
        <tr>
          <th>Deleted At</th>
          <td>${deletedAt}</td>
        </tr>
        ${deletionReason ? `<tr><th>Reason</th><td>${deletionReason}</td></tr>` : ''}
      </table>
    </div>
  `;
  
  return {
    subject: `Media Deleted: ${filename}`,
    html: baseTemplate(content),
    text: `Alert: Media file "${filename}" was deleted by ${deletedBy}`
  };
};

// ============================================
// Application Received Confirmation
// ============================================
exports.applicationReceived = (data) => {
  const { applicantName, applicantEmail, companyName, applicationType, serialNumber, submittedAt } = data;
  
  const content = `
    <div class="content">
      <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">Application Received</h2>
      <p>Dear ${applicantName},</p>
      <p>Thank you for your interest in the Association of Ghana Industries. We have received your ${applicationType || 'membership'} application.</p>
      
      <div class="alert alert-success">
        <strong>Application Received</strong> - Reference: ${serialNumber}
      </div>
      
      <table>
        <tr>
          <th>Company Name</th>
          <td>${companyName}</td>
        </tr>
        <tr>
          <th>Application Type</th>
          <td>${applicationType || 'Membership'}</td>
        </tr>
        <tr>
          <th>Reference Number</th>
          <td>${serialNumber}</td>
        </tr>
        <tr>
          <th>Submitted At</th>
          <td>${submittedAt}</td>
        </tr>
      </table>
      
      <p style="margin-top: 20px;">Our team will review your application and get back to you within 5-7 business days.</p>
      <p>You can track your application status using your reference number at <a href="https://agighana.org/apply">https://agighana.org/apply</a>.</p>
    </div>
  `;
  
  return {
    subject: `Application Received - ${serialNumber}`,
    html: baseTemplate(content),
    text: `Your application (${serialNumber}) has been received. We'll contact you within 5-7 business days.`
  };
};

// ============================================
// Application Status Update
// ============================================
exports.applicationStatusUpdate = (data) => {
  const { applicantName, applicantEmail, companyName, status, serialNumber, reviewNotes, reviewedBy } = data;
  
  const statusColors = {
    approved: { bg: '#d1fae5', color: '#065f46', text: 'Approved' },
    rejected: { bg: '#fee2e2', color: '#991b1b', text: 'Rejected' },
    review: { bg: '#dbeafe', color: '#1e40af', text: 'Under Review' }
  };
  
  const statusInfo = statusColors[status] || statusColors.review;
  
  const content = `
    <div class="content">
      <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">Application Status Update</h2>
      <p>Dear ${applicantName},</p>
      <p>Your application status has been updated.</p>
      
      <div class="alert" style="background-color: ${statusInfo.bg}; color: ${statusInfo.color};">
        <strong>Status: ${statusInfo.text}</strong> - Reference: ${serialNumber}
      </div>
      
      <table>
        <tr>
          <th>Company Name</th>
          <td>${companyName}</td>
        </tr>
        <tr>
          <th>Reference Number</th>
          <td>${serialNumber}</td>
        </tr>
        <tr>
          <th>Current Status</th>
          <td>${statusInfo.text}</td>
        </tr>
        ${reviewNotes ? `<tr><th>Review Notes</th><td>${reviewNotes}</td></tr>` : ''}
        ${reviewedBy ? `<tr><th>Reviewed By</th><td>${reviewedBy}</td></tr>` : ''}
      </table>
      
      ${status === 'approved' ? `
        <p style="margin-top: 20px;">Congratulations! Your application has been approved. Please log in to your member dashboard to complete the registration process.</p>
        <p><a href="https://agighana.org/membership" class="button">Access Member Dashboard</a></p>
      ` : ''}
      
      ${status === 'rejected' ? `
        <p style="margin-top: 20px;">We regret to inform you that your application was not approved at this time. Please contact us for more information.</p>
        <p><a href="https://agighana.org/contact" class="button">Contact Support</a></p>
      ` : ''}
    </div>
  `;
  
  return {
    subject: `Application Update - ${serialNumber} - ${statusInfo.text}`,
    html: baseTemplate(content),
    text: `Your application (${serialNumber}) status: ${statusInfo.text}`
  };
};

// ============================================
// Admin Alert Email
// ============================================
exports.adminAlert = (data) => {
  const { alertType, title, message, details, adminEmail } = data;
  
  const alertTypes = {
    new_application: { icon: '📝', title: 'New Application Received' },
    high_upload_volume: { icon: '📤', title: 'High Upload Volume' },
    error: { icon: '⚠️', title: 'System Error' },
    security: { icon: '🔒', title: 'Security Alert' },
    maintenance: { icon: '🔧', title: 'Maintenance Notice' }
  };
  
  const alertInfo = alertTypes[alertType] || alertTypes.error;
  
  const content = `
    <div class="content">
      <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">${alertInfo.icon} ${alertInfo.title}</h2>
      <p><strong>${title}</strong></p>
      <p>${message}</p>
      
      ${details ? `
        <table>
          ${Object.entries(details).map(([key, value]) => `
            <tr>
              <th>${key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>
              <td>${value}</td>
            </tr>
          `).join('')}
        </table>
      ` : ''}
      
      <p style="margin-top: 20px;"><a href="https://agighana.org/admin" class="button">View Admin Dashboard</a></p>
    </div>
  `;
  
  return {
    subject: `[AGI Admin] ${alertInfo.title}`,
    html: baseTemplate(content),
    text: `[AGI Admin] ${title}: ${message}`
  };
};

// ============================================
// Batch Export Template
// ============================================
exports.batchExportComplete = (data) => {
  const { userEmail, userName, exportType, recordCount, downloadUrl, expiresAt } = data;
  
  const content = `
    <div class="content">
      <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827;">Export Ready for Download</h2>
      <p>Dear ${userName},</p>
      <p>Your export is ready. The ${exportType} export containing ${recordCount} records has been generated.</p>
      
      <div class="alert alert-success">
        <strong>✓ Export Complete</strong>
      </div>
      
      <table>
        <tr>
          <th>Export Type</th>
          <td>${exportType}</td>
        </tr>
        <tr>
          <th>Total Records</th>
          <td>${recordCount}</td>
        </tr>
        <tr>
          <th>Download Link</th>
          <td><a href="${downloadUrl}">Click to Download</a></td>
        </tr>
        <tr>
          <th>Expires</th>
          <td>${expiresAt}</td>
        </tr>
      </table>
      
      <p style="color: #dc2626; margin-top: 15px;"><strong>Note:</strong> This download link will expire in 24 hours.</p>
    </div>
  `;
  
  return {
    subject: `Export Ready: ${exportType}`,
    html: baseTemplate(content),
    text: `Your ${exportType} export (${recordCount} records) is ready for download`
  };
};

module.exports = exports;
