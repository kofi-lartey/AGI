/**
 * Email Client Service (Frontend)
 * 
 * Provides email functionality for the React frontend.
 * Sends requests to the Netlify serverless email function.
 * 
 * Usage:
 * import { emailService } from './lib/emailClient';
 * 
 * // Send upload confirmation
 * await emailService.sendUploadConfirmation(userEmail, { filename, fileType, fileSize });
 */

const EMAIL_FUNCTION_URL = '/.netlify/functions/send-email';

// Configuration for email service
const config = {
  functionUrl: EMAIL_FUNCTION_URL,
  timeout: 30000, // 30 seconds
  retryAttempts: 2,
  retryDelay: 1000 // 1 second
};

// Email service class
class EmailService {
  constructor() {
    this.functionUrl = config.functionUrl;
  }

  // Send email via Netlify function
  async sendEmail(type, to, data = {}) {
    const payload = {
      type,
      to,
      data: {
        ...data,
        to // Include recipient in data for templates
      }
    };

    let lastError;

    for (let attempt = 0; attempt < config.retryAttempts; attempt++) {
      try {
        const response = await fetch(this.functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(config.timeout)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          return { success: true, logged: result.logged };
        }

        throw new Error(result.error || 'Failed to send email');
      } catch (error) {
        lastError = error;
        console.error(`Email send attempt ${attempt + 1} failed:`, error.message);
        
        // Wait before retry
        if (attempt < config.retryAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, config.retryDelay));
        }
      }
    }

    throw lastError || new Error('Failed to send email after retries');
  }

  // Upload confirmation
  async sendUploadConfirmation(userEmail, uploadData) {
    return this.sendEmail('upload_confirmation', userEmail, {
      userName: uploadData.userName,
      filename: uploadData.filename,
      fileType: uploadData.fileType,
      fileSize: uploadData.fileSize,
      mediaUrl: uploadData.mediaUrl
    });
  }

  // User registration
  async sendUserRegistration(userEmail, userData) {
    return this.sendEmail('user_registration', userEmail, {
      userName: userData.userName,
      tempPassword: userData.tempPassword
    });
  }

  // Password reset
  async sendPasswordReset(userEmail, resetData) {
    return this.sendEmail('password_reset', userEmail, {
      userName: resetData.userName,
      resetToken: resetData.resetToken,
      expiryTime: resetData.expiryTime
    });
  }

  // Media deletion alert to admin
  async sendMediaDeletionAlert(adminEmail, deletionData) {
    return this.sendEmail('media_deletion', adminEmail, {
      adminName: deletionData.adminName,
      filename: deletionData.filename,
      deletedBy: deletionData.deletedBy,
      deletionReason: deletionData.deletionReason
    });
  }

  // Application received confirmation
  async sendApplicationReceived(applicantEmail, applicationData) {
    return this.sendEmail('application_received', applicantEmail, {
      applicantName: applicationData.applicantName,
      companyName: applicationData.companyName,
      applicationType: applicationData.applicationType,
      serialNumber: applicationData.serialNumber
    });
  }

  // Application status update
  async sendApplicationStatusUpdate(applicantEmail, statusData) {
    return this.sendEmail('application_status', applicantEmail, {
      applicantName: statusData.applicantName,
      companyName: statusData.companyName,
      status: statusData.status,
      serialNumber: statusData.serialNumber,
      reviewNotes: statusData.reviewNotes,
      reviewedBy: statusData.reviewedBy
    });
  }

  // Admin alert
  async sendAdminAlert(adminEmail, alertData) {
    return this.sendEmail('admin_alert', adminEmail, {
      alertType: alertData.alertType,
      title: alertData.title,
      message: alertData.message,
      details: alertData.details
    });
  }

  // Custom email (for advanced use)
  async sendCustomEmail(to, emailData) {
    return this.sendEmail('custom', to, emailData);
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export individual functions for convenience
export const sendUploadConfirmation = (email, data) => 
  emailService.sendUploadConfirmation(email, data);

export const sendUserRegistration = (email, data) => 
  emailService.sendUserRegistration(email, data);

export const sendPasswordReset = (email, data) => 
  emailService.sendPasswordReset(email, data);

export const sendMediaDeletionAlert = (email, data) => 
  emailService.sendMediaDeletionAlert(email, data);

export const sendApplicationReceived = (email, data) => 
  emailService.sendApplicationReceived(email, data);

export const sendApplicationStatusUpdate = (email, data) => 
  emailService.sendApplicationStatusUpdate(email, data);

export const sendAdminAlert = (email, data) => 
  emailService.sendAdminAlert(email, data);

export default emailService;
