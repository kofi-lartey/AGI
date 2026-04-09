import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useLoading } from './LoadingContext';

const MediaContext = createContext();

// Empty initial state - data fetched from Supabase
const initialMedia = [];

export function MediaProvider({ children }) {
  const [mediaAssets, setMediaAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { startRefreshing, stopRefreshing } = useLoading();

  // Fetch media from Supabase
  const fetchMedia = async (isManualRefresh = false) => {
    if (!isSupabaseConfigured()) {
      // Try localStorage as fallback
      const stored = localStorage.getItem('agi_media');
      if (stored) {
        try {
          setMediaAssets(JSON.parse(stored));
        } catch {
          setMediaAssets([]);
        }
      }
      setLoading(false);
      return;
    }

    // Start refresh loading if this is a manual refresh
    if (isManualRefresh) {
      startRefreshing('Refreshing media...');
    } else {
      setLoading(true);
    }

    try {
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaAssets(data || []);
    } catch (err) {
      console.error('Error fetching media:', err);
      setError(err.message);
      // Try localStorage as fallback
      const stored = localStorage.getItem('agi_media');
      if (stored) {
        try {
          setMediaAssets(JSON.parse(stored));
        } catch {
          setMediaAssets([]);
        }
      }
    } finally {
      setLoading(false);
      if (isManualRefresh) {
        stopRefreshing();
      }
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMedia();
  }, []);

  // Save to localStorage whenever media changes (as backup)
  useEffect(() => {
    if (mediaAssets.length > 0) {
      localStorage.setItem('agi_media', JSON.stringify(mediaAssets));
    }
  }, [mediaAssets]);

  // Get media by category
  const getMediaByCategory = (category) => {
    if (category === 'All') return mediaAssets;
    return mediaAssets.filter(item => item.category === category);
  };

  // Get media by ID
  const getMediaById = (id) => {
    return mediaAssets.find(item => item.id === id || item.id === parseInt(id));
  };

  // Get unique categories from media
  const categories = ['All', ...new Set(mediaAssets.map(item => item.category).filter(Boolean))];

  // Add new media
  const addMedia = async (newMedia) => {
    const media = {
      ...newMedia,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('media_assets')
          .insert(media)
          .select()
          .single();
        
        if (error) throw error;
        if (data) {
          setMediaAssets([data, ...mediaAssets]);
          return data;
        }
      } catch (err) {
        console.error('Error adding media:', err);
      }
    }

    // Fallback: add to local state
    const localMedia = { ...media, id: Date.now() };
    setMediaAssets([localMedia, ...mediaAssets]);
    return localMedia;
  };

  // Update media
  const updateMedia = async (id, updatedData) => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('media_assets')
          .update(updatedData)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        if (data) {
          setMediaAssets(mediaAssets.map(item => item.id === id ? data : item));
          return data;
        }
      } catch (err) {
        console.error('Error updating media:', err);
      }
    }

    // Fallback: update local state
    setMediaAssets(mediaAssets.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  // Delete media
  const deleteMedia = async (id) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('media_assets')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
      } catch (err) {
        console.error('Error deleting media:', err);
      }
    }

    setMediaAssets(mediaAssets.filter(item => item.id !== id));
  };

  // Exposed refresh function that triggers loading state
  const refreshMedia = async () => {
    await fetchMedia(true); // true = isManualRefresh
  };

  // Filter media
  const filterMedia = (category, searchQuery) => {
    return mediaAssets.filter(item => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesSearch = !searchQuery || 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const value = {
    mediaAssets,
    categories,
    loading,
    error,
    getMediaByCategory,
    getMediaById,
    addMedia,
    updateMedia,
    deleteMedia,
    filterMedia,
    refreshMedia: fetchMedia
  };

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
}