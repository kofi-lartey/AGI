/**
 * Cloudinary Service for file, image, and video uploads
 * 
 * Environment variables required in .env:
 * VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
 * VITE_CLOUDINARY_API_KEY=your-api-key
 * VITE_CLOUDINARY_API_SECRET=your-api-secret
 * VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset (optional - for unsigned uploads)
 */

// Cloudinary configuration
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY || '';
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET || '';
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

// File type configurations
const FILE_TYPES = {
  image: {
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'],
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/tiff'],
    maxSize: 10 * 1024 * 1024, // 10MB
    folder: 'agi/images',
    resourceType: 'image'
  },
  video: {
    extensions: ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv', 'wmv'],
    mimeTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/x-flv', 'video/x-ms-wmv'],
    maxSize: 100 * 1024 * 1024, // 100MB
    folder: 'agi/videos',
    resourceType: 'video'
  },
  document: {
    extensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf'],
    mimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'application/rtf'],
    maxSize: 20 * 1024 * 1024, // 20MB
    folder: 'agi/documents',
    resourceType: 'raw'
  },
  audio: {
    extensions: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'],
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/flac', 'audio/aac', 'audio/mp4'],
    maxSize: 20 * 1024 * 1024, // 20MB
    folder: 'agi/audio',
    resourceType: 'video' // Cloudinary treats audio as video
  }
};

// Check if Cloudinary is configured
export const isCloudinaryConfigured = () => {
  return !!(cloudName && apiKey && apiSecret);
};

// Get file type from MIME type or extension
export const getFileType = (file) => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const mimeType = file.type;
  
  for (const [type, config] of Object.entries(FILE_TYPES)) {
    if (config.extensions.includes(extension) || config.mimeTypes.includes(mimeType)) {
      return type;
    }
  }
  return 'document'; // Default to document
};

// Validate file
export const validateFile = (file) => {
  const errors = [];
  const fileType = getFileType(file);
  const config = FILE_TYPES[fileType];
  
  if (!config) {
    errors.push('Unsupported file type');
    return { valid: false, errors };
  }
  
  // Check file size
  if (file.size > config.maxSize) {
    errors.push(`File size exceeds maximum of ${config.maxSize / (1024 * 1024)}MB for ${fileType}s`);
  }
  
  // Check MIME type
  if (!config.mimeTypes.includes(file.type)) {
    errors.push('File MIME type does not match the expected type');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    fileType,
    config
  };
};

// Generate signature for signed uploads
const generateSignature = async (timestamp, params) => {
  // Sort params alphabetically
  const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
    acc[key] = params[key];
    return acc;
  }, {});
  
  // Create parameter string
  const paramString = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  const stringToSign = `${paramString}&timestamp=${timestamp}${apiSecret}`;
  
  // Simple hash implementation (in production, use crypto)
  const encoder = new TextEncoder();
  const data = encoder.encode(stringToSign);
  
  // Use SubtleCrypto for hashing
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};

// Upload file to Cloudinary
export const uploadToCloudinary = async (file, options = {}) => {
  const {
    folder = '',
    publicId = '',
    transformation = {},
    onProgress = () => {}
  } = options;
  
  if (!isCloudinaryConfigured()) {
    return { 
      success: false, 
      error: 'Cloudinary is not configured. Please add VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_API_KEY, and VITE_CLOUDINARY_API_SECRET to your .env file.' 
    };
  }
  
  // Validate file
  const validation = validateFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.errors.join(', ') };
  }
  
  const config = validation.config;
  const fileType = validation.fileType;
  
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    
    // Prepare upload params
    const params = {
      file,
      api_key: apiKey,
      timestamp,
      folder: folder || config.folder,
      resource_type: config.resourceType
    };
    
    if (publicId) {
      params.public_id = publicId;
    }
    
    // Add transformation params if provided
    if (Object.keys(transformation).length > 0) {
      params.transformation = transformation;
    }
    
    // Use unsigned upload if preset is provided
    if (uploadPreset) {
      params.upload_preset = uploadPreset;
      delete params.resource_type; // Let Cloudinary detect
      
      const formData = new FormData();
      Object.keys(params).forEach(key => {
        if (key !== 'file') {
          formData.append(key, params[key]);
        }
      });
      formData.append('file', file);
      
      const xhr = new XMLHttpRequest();
      
      return new Promise((resolve) => {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            onProgress(progress);
          }
        };
        
        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve({
              success: true,
              data: {
                publicId: response.public_id,
                url: response.secure_url,
                format: response.format,
                width: response.width,
                height: response.height,
                bytes: response.bytes,
                resourceType: response.resource_type,
                createdAt: response.created_at
              }
            });
          } else {
            const error = JSON.parse(xhr.responseText);
            resolve({ success: false, error: error.error?.message || 'Upload failed' });
          }
        };
        
        xhr.onerror = () => {
          resolve({ success: false, error: 'Network error during upload' });
        };
        
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`);
        xhr.send(formData);
      });
    }
    
    // Signed upload (more secure)
    const signature = await generateSignature(timestamp, params);
    params.signature = signature;
    
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      if (key !== 'file') {
        formData.append(key, params[key]);
      }
    });
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve) => {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          onProgress(progress);
        }
      };
      
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve({
            success: true,
            data: {
              publicId: response.public_id,
              url: response.secure_url,
              format: response.format,
              width: response.width,
              height: response.height,
              bytes: response.bytes,
              resourceType: response.resource_type,
              createdAt: response.created_at
            }
          });
        } else {
          const error = JSON.parse(xhr.responseText);
          resolve({ success: false, error: error.error?.message || 'Upload failed' });
        }
      };
      
      xhr.onerror = () => {
        resolve({ success: false, error: 'Network error during upload' });
      };
      
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`);
      xhr.send(formData);
    });
    
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Upload multiple files
export const uploadMultipleToCloudinary = async (files, options = {}) => {
  const { 
    folder = '', 
    onProgress = () => {},
    onFileProgress = () => {}
  } = options;
  
  const results = [];
  const totalFiles = files.length;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    const result = await uploadToCloudinary(file, {
      folder,
      onProgress: (progress) => {
        const overallProgress = Math.round(((i + progress / 100) / totalFiles) * 100);
        onProgress(overallProgress);
        onFileProgress(i, file.name, progress);
      }
    });
    
    results.push({
      file: file.name,
      ...result
    });
  }
  
  return results;
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!isCloudinaryConfigured()) {
    return { success: false, error: 'Cloudinary is not configured' };
  }
  
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const params = {
      api_key: apiKey,
      timestamp,
      public_id: publicId,
      resource_type: resourceType
    };
    
    const signature = await generateSignature(timestamp, params);
    params.signature = signature;
    
    const formData = new FormData();
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.result === 'ok') {
      return { success: true };
    } else {
      return { success: false, error: result.error?.message || 'Delete failed' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Generate optimized URL
export const getOptimizedUrl = (publicId, options = {}) => {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto'
  } = options;
  
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (gravity) transformations.push(`g_${gravity}`);
  
  const transformString = transformations.join(',');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
};

// Generate video thumbnail
export const getVideoThumbnail = (publicId, options = {}) => {
  const { width, height, startOffset } = options;
  
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (startOffset) transformations.push(`so_${startOffset}`);
  
  const transformString = transformations.length > 0 ? `${transformations.join(',')}/` : '';
  
  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformString}so_0/vl/flac,ac_none/${publicId}.jpg`;
};

// Get download URL
export const getDownloadUrl = (publicId, options = {}) => {
  const { format = 'png' } = options;
  return `https://res.cloudinary.com/${cloudName}/image/upload/fl_attachment/${publicId}`;
};

// Cloudinary configuration export
export const cloudinaryConfig = {
  cloudName,
  apiKey,
  uploadPreset,
  isConfigured: isCloudinaryConfigured(),
  FILE_TYPES
};

export default {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  getOptimizedUrl,
  getVideoThumbnail,
  getDownloadUrl,
  validateFile,
  getFileType,
  isCloudinaryConfigured,
  cloudinaryConfig
};
