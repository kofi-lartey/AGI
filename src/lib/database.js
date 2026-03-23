import { supabase, isSupabaseConfigured } from './supabase';

// Generic CRUD operations
export const db = {
  // Get all records from a table
  async getAll(table, options = {}) {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured');
      return { data: null, error: 'Supabase is not configured' };
    }
    
    let query = supabase.from(table).select(options.select || '*');
    
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { 
        ascending: options.orderBy.ascending ?? true 
      });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.range) {
      query = query.range(options.range[0], options.range[1]);
    }
    
    if (options.filter) {
      options.filter.forEach(f => {
        query = query.filter(f.column, f.operator, f.value);
      });
    }
    
    return await query;
  },

  // Get a single record by ID
  async getById(table, id) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase.from(table).select('*').eq('id', id).single();
  },

  // Create a new record
  async create(table, data) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase.from(table).insert(data).select();
  },

  // Update a record
  async update(table, id, data) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase.from(table).update(data).eq('id', id).select();
  },

  // Delete a record
  async delete(table, id) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase.from(table).delete().eq('id', id);
  },

  // Upsert (insert or update)
  async upsert(table, data) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase.from(table).upsert(data).select();
  }
};

// Blog posts specific operations
export const blogDb = {
  async getAll() {
    return await db.getAll('blog_posts', { 
      orderBy: { column: 'created_at', ascending: false } 
    });
  },

  async getPublished() {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
  },

  async getById(id) {
    return await db.getById('blog_posts', id);
  },

  async create(post) {
    return await db.create('blog_posts', post);
  },

  async update(id, post) {
    return await db.update('blog_posts', id, post);
  },

  async delete(id) {
    return await db.delete('blog_posts', id);
  },

  async incrementViews(id) {
    if (!isSupabaseConfigured()) return { data: null };
    const { data } = await db.getById('blog_posts', id);
    if (data) {
      return await db.update('blog_posts', id, { views: (data.views || 0) + 1 });
    }
    return { data: null };
  }
};

// Media assets specific operations
export const mediaDb = {
  async getAll() {
    return await db.getAll('media_assets', {
      orderBy: { column: 'created_at', ascending: false }
    });
  },

  async getById(id) {
    return await db.getById('media_assets', id);
  },

  async create(media) {
    return await db.create('media_assets', media);
  },

  async update(id, media) {
    return await db.update('media_assets', id, media);
  },

  async delete(id) {
    return await db.delete('media_assets', id);
  },

  async getByCategory(category) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase
      .from('media_assets')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
  }
};

// Membership applications specific operations
export const applicationsDb = {
  async getAll() {
    return await db.getAll('applications', {
      orderBy: { column: 'created_at', ascending: false }
    });
  },

  async getById(id) {
    return await db.getById('applications', id);
  },

  async create(application) {
    return await db.create('applications', application);
  },

  async update(id, application) {
    return await db.update('applications', id, application);
  },

  async delete(id) {
    return await db.delete('applications', id);
  },

  async getByStatus(status) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase
      .from('applications')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
  }
};

// Storage operations for file uploads
export const storage = {
  async uploadFile(bucket, path, file) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase.storage.from(bucket).upload(path, file);
  },

  async deleteFile(bucket, path) {
    if (!isSupabaseConfigured()) {
      return { data: null, error: 'Supabase is not configured' };
    }
    return await supabase.storage.from(bucket).remove([path]);
  },

  getPublicUrl(bucket, path) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }
};

export default db;
