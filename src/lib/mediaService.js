/**
 * Media Service - Integrates Cloudinary uploads with Supabase database
 * 
 * Provides complete upload workflow:
 * 1. Upload file to Cloudinary
 * 2. Store URL and metadata in Supabase
 * 3. Return complete media asset record
 */

import { uploadToCloudinary, uploadMultipleToCloudinary, deleteFromCloudinary, validateFile, getFileType, isCloudinaryConfigured } from './cloudinary';
import { supabase, isSupabaseConfigured } from './supabase';

// Upload media and save to database
export const uploadMedia = async (file, metadata = {}) => {
  const {
    title = '',
    description = '',
    category = 'Uncategorized',
    tags = [],
    displayType = 'small',
    location = '',
    eventDate = null,
    uploadedBy = null,
    credits = '',
    altText = '',
    onProgress = () => {}
  } = metadata;

  // Validate file first
  const validation = validateFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.errors.join(', ') };
  }

  // Upload to Cloudinary
  const uploadResult = await uploadToCloudinary(file, {
    folder: `agi/${validation.fileType}s`,
    onProgress
  });

  if (!uploadResult.success) {
    return { success: false, error: uploadResult.error };
  }

  // Prepare media asset data
  const mediaAsset = {
    cloudinary_public_id: uploadResult.data.publicId,
    cloudinary_url: uploadResult.data.url,
    cloudinary_secure_url: uploadResult.data.url,
    original_filename: file.name,
    file_type: validation.fileType,
    mime_type: file.type,
    format: uploadResult.data.format,
    file_size_bytes: file.size,
    width: uploadResult.data.width,
    height: uploadResult.data.height,
    duration_seconds: uploadResult.data.duration,
    title,
    description,
    category,
    tags,
    alt_text: altText,
    display_type: displayType,
    is_active: true,
    location,
    event_date: eventDate,
    uploaded_by: uploadedBy,
    credits
  };

  // Save to Supabase
  const { data, error } = await db.create('media_assets', mediaAsset);

  if (error) {
    // If database save fails, try to delete the uploaded file
    await deleteFromCloudinary(uploadResult.data.publicId, uploadResult.data.resourceType);
    return { success: false, error: error.message || 'Failed to save media metadata' };
  }

  return {
    success: true,
    data: Array.isArray(data) ? data[0] : data
  };
};

// Upload multiple files
export const uploadMediaMultiple = async (files, options = {}) => {
  const {
    category = 'Uncategorized',
    uploadedBy = null,
    onProgress = () => {},
    onFileProgress = () => {}
  } = options;

  const results = await uploadMultipleToCloudinary(files, {
    onProgress,
    onFileProgress: (index, filename, progress) => {
      onFileProgress(index, filename, progress);
    }
  });

  const savedMedia = [];
  const errors = [];

  for (const result of results) {
    if (!result.success) {
      errors.push({ file: result.file, error: result.error });
      continue;
    }

    // Save to database
    const mediaAsset = {
      cloudinary_public_id: result.data.publicId,
      cloudinary_url: result.data.url,
      cloudinary_secure_url: result.data.url,
      original_filename: result.file,
      file_type: getFileType({ name: result.file, type: '' }),
      mime_type: '',
      format: result.data.format,
      file_size_bytes: 0,
      width: result.data.width,
      height: result.data.height,
      category,
      uploaded_by: uploadedBy,
      is_active: true
    };

    const { data, error } = await db.create('media_assets', mediaAsset);

    if (error) {
      errors.push({ file: result.file, error: error.message });
    } else {
      savedMedia.push(Array.isArray(data) ? data[0] : data);
    }
  }

  return {
    success: errors.length === 0,
    uploaded: savedMedia,
    errors,
    summary: {
      total: files.length,
      successful: savedMedia.length,
      failed: errors.length
    }
  };
};

// Delete media from both Cloudinary and Supabase
export const deleteMedia = async (mediaId) => {
  // Get media record from database
  const { data: media, error: fetchError } = await db.getById('media_assets', mediaId);

  if (fetchError || !media) {
    return { success: false, error: 'Media not found' };
  }

  // Delete from Cloudinary
  const cloudinaryResult = await deleteFromCloudinary(
    media.cloudinary_public_id,
    media.file_type === 'video' ? 'video' : 'image'
  );

  if (!cloudinaryResult.success) {
    console.warn('Failed to delete from Cloudinary:', cloudinaryResult.error);
  }

  // Delete from database
  const { error: deleteError } = await db.delete('media_assets', mediaId);

  if (deleteError) {
    return { success: false, error: deleteError.message };
  }

  return { success: true };
};

// Update media metadata
export const updateMediaMetadata = async (mediaId, metadata) => {
  const { data, error } = await db.update('media_assets', mediaId, {
    ...metadata,
    updated_at: new Date().toISOString()
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: Array.isArray(data) ? data[0] : data };
};

// Get media by category
export const getMediaByCategory = async (category) => {
  if (!isCloudinaryConfigured()) {
    return { data: null, error: 'Cloudinary not configured' };
  }

  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return { data, error };
};

// Get media by type
export const getMediaByType = async (fileType) => {
  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .eq('file_type', fileType)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return { data, error };
};

// Get all active media
export const getAllMedia = async (options = {}) => {
  const { 
    limit = 50, 
    offset = 0, 
    category = null,
    fileType = null 
  } = options;

  let query = supabase
    .from('media_assets')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq('category', category);
  }

  if (fileType) {
    query = query.eq('file_type', fileType);
  }

  const { data, error, count } = await query;

  return { data, error, count };
};

// Search media
export const searchMedia = async (searchTerm) => {
  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .eq('is_active', true)
    .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,original_filename.ilike.%${searchTerm}%`)
    .order('created_at', { ascending: false });

  return { data, error };
};

// Get media statistics
export const getMediaStats = async () => {
  const { data: allMedia, error } = await supabase
    .from('media_assets')
    .select('file_type, file_size_bytes')
    .eq('is_active', true);

  if (error) {
    return { error };
  }

  const stats = {
    total: allMedia.length,
    images: 0,
    videos: 0,
    documents: 0,
    audio: 0,
    totalSize: 0
  };

  allMedia.forEach(media => {
    stats[media.file_type + 's'] = (stats[media.file_type + 's'] || 0) + 1;
    stats.totalSize += media.file_size_bytes || 0;
  });

  return { data: stats };
};

export default {
  uploadMedia,
  uploadMediaMultiple,
  deleteMedia,
  updateMediaMetadata,
  getMediaByCategory,
  getMediaByType,
  getAllMedia,
  searchMedia,
  getMediaStats
};
