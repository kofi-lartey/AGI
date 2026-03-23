// Supabase client using native fetch API - no additional dependencies required
// Environment variables should be set in your .env file:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_ANON_KEY=your-anon-key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Generic fetch wrapper for Supabase REST API
const supabaseFetch = async (endpoint, options = {}) => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
    return { data: null, error: 'Supabase is not configured' };
  }

  const url = `${supabaseUrl}/rest/v1/${endpoint}`;
  const headers = {
    'apikey': supabaseAnonKey,
    'Authorization': `Bearer ${supabaseAnonKey}`,
    'Content-Type': 'application/json',
    'Prefer': options.prefer || 'return=representation',
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      return { data: null, error: data };
    }

    // Handle different return types
    if (options.method === 'POST' || options.method === 'PATCH' || options.method === 'PUT') {
      // For mutations, return single object or array based on Prefer header
      const returnType = options.prefer?.includes('return=minimal') ? null : data;
      return { data: returnType, error: null };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Supabase client object with REST API methods
export const supabase = {
  // Authentication
  auth: {
    getSession: async () => {
      // Get session from localStorage (managed by the auth component)
      const session = localStorage.getItem('supabase_session');
      return { data: { session: session ? JSON.parse(session) : null }, error: null };
    },
    
    onAuthStateChange: (callback) => {
      // Listen for storage events (simple implementation)
      const handleStorageChange = (e) => {
        if (e.key === 'supabase_session') {
          const session = e.newValue ? JSON.parse(e.newValue) : null;
          callback('SESSION_UPDATED', session);
        }
      };
      window.addEventListener('storage', handleStorageChange);
      
      // Return unsubscribe function
      return {
        data: {
          subscription: {
            unsubscribe: () => window.removeEventListener('storage', handleStorageChange)
          }
        }
      };
    },
    
    signUp: async ({ email, password }) => {
      const { data, error } = await supabaseFetch('auth/v1/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      return { data, error };
    },
    
    signInWithPassword: async ({ email, password }) => {
      const { data, error } = await supabaseFetch('auth/v1/token?grant_type=password', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      if (data && !error) {
        // Store session
        localStorage.setItem('supabase_session', JSON.stringify(data));
      }
      
      return { data, error };
    },
    
    signOut: async () => {
      localStorage.removeItem('supabase_session');
      return { data: null, error: null };
    },
    
    resetPasswordForEmail: async (email) => {
      return await supabaseFetch('auth/v1/recover', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
    },
    
    updateUser: async (attributes) => {
      const session = JSON.parse(localStorage.getItem('supabase_session') || '{}');
      if (!session.access_token) {
        return { data: null, error: 'No session' };
      }
      
      return await supabaseFetch('auth/v1/user', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify(attributes)
      });
    },
    
    getUser: async () => {
      const session = JSON.parse(localStorage.getItem('supabase_session') || '{}');
      if (!session.access_token) {
        return { data: { user: null }, error: null };
      }
      
      return await supabaseFetch('auth/v1/user', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      });
    }
  },

  // Database operations
  from: (table) => ({
    select: (columns = '*') => ({
      eq: (column, value) => ({
        order: (column, options = {}) => supabaseFetch(`${table}?${columns}=eq.${value}&order=${column}${options.ascending ? '.asc' : '.desc'}`),
        limit: (count) => supabaseFetch(`${table}?${columns}=eq.${value}&limit=${count}`),
        single: () => supabaseFetch(`${table}?${columns}=eq.${value}&limit=1`),
        then: function(fn) { return fn(supabaseFetch(`${table}?${columns}=eq.${value}`)); }
      }),
      order: (column, options = {}) => supabaseFetch(`${table}?order=${column}${options.ascending ? '.asc' : '.desc'}`),
      range: (from, to) => supabaseFetch(`${table}?range=${from}-${to}`),
      limit: (count) => supabaseFetch(`${table}?limit=${count}`),
      then: function(fn) { return fn(supabaseFetch(`${table}?select=${columns}`)); }
    }),
    
    insert: (data) => supabaseFetch(table, {
      method: 'POST',
      body: Array.isArray(data) ? JSON.stringify(data) : JSON.stringify([data]),
      prefer: 'return=representation'
    }),
    
    update: (data) => ({
      eq: (column, value) => supabaseFetch(`${table}?${column}=eq.${value}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        prefer: 'return=representation'
      })
    }),
    
    delete: () => ({
      eq: (column, value) => supabaseFetch(`${table}?${column}=eq.${value}`, {
        method: 'DELETE'
      })
    }),
    
    upsert: (data) => supabaseFetch(table, {
      method: 'POST',
      body: Array.isArray(data) ? JSON.stringify(data) : JSON.stringify([data]),
      prefer: 'resolution=merge-duplicates'
    })
  }),

  // Storage operations
  storage: {
    from: (bucket) => ({
      upload: async (path, file) => {
        if (!isSupabaseConfigured()) {
          return { data: null, error: 'Supabase not configured' };
        }
        
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}/${path}`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${supabaseAnonKey}` },
          body: formData
        });
        
        const data = await response.json();
        return { data, error: response.ok ? null : data };
      },
      
      remove: async (paths) => {
        if (!isSupabaseConfigured()) {
          return { data: null, error: 'Supabase not configured' };
        }
        
        const response = await fetch(`${supabaseUrl}/storage/v1/object/${bucket}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ paths })
        });
        
        const data = await response.json();
        return { data, error: response.ok ? null : data };
      },
      
      getPublicUrl: (path) => {
        return { data: { publicUrl: `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}` } };
      }
    })
  }
};

export default supabase;
