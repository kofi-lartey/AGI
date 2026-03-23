import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SupabaseContext = createContext();

export function SupabaseProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);

  // Check if Supabase is configured
  useEffect(() => {
    setIsConfigured(isSupabaseConfigured());
  }, []);

  // Listen for auth changes
  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [isConfigured]);

  // Sign up
  const signUp = async (email, password) => {
    if (!isConfigured) {
      setError('Supabase is not configured. Please add your Supabase credentials.');
      return { error: { message: 'Supabase is not configured' } };
    }
    setError(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    return { data, error };
  };

  // Sign in
  const signIn = async (email, password) => {
    if (!isConfigured) {
      setError('Supabase is not configured. Please add your Supabase credentials.');
      return { error: { message: 'Supabase is not configured' } };
    }
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    return { data, error };
  };

  // Sign out
  const signOut = async () => {
    if (!isConfigured) return;
    setError(null);
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
  };

  // Reset password
  const resetPassword = async (email) => {
    if (!isConfigured) {
      setError('Supabase is not configured. Please add your Supabase credentials.');
      return { error: { message: 'Supabase is not configured' } };
    }
    setError(null);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    return { data, error };
  };

  // Update password
  const updatePassword = async (newPassword) => {
    if (!isConfigured) {
      setError('Supabase is not configured. Please add your Supabase credentials.');
      return { error: { message: 'Supabase is not configured' } };
    }
    setError(null);
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setError(error.message);
    return { data, error };
  };

  // Sign in with OAuth (Google, GitHub, etc.)
  const signInWithOAuth = async (provider) => {
    if (!isConfigured) {
      setError('Supabase is not configured. Please add your Supabase credentials.');
      return { error: { message: 'Supabase is not configured' } };
    }
    setError(null);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    });
    if (error) setError(error.message);
    return { data, error };
  };

  const value = {
    user,
    session,
    loading,
    error,
    isConfigured,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    signInWithOAuth
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}

export default SupabaseContext;
