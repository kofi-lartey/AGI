import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useLoading } from './LoadingContext';

const BlogContext = createContext();

// Empty initial state - data fetched from Supabase
const initialPosts = [];

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { startRefreshing, stopRefreshing, isRefreshing } = useLoading();

  // Fetch posts from Supabase
  const fetchPosts = async (isManualRefresh = false) => {
    if (!isSupabaseConfigured()) {
      // Try localStorage as fallback
      const saved = localStorage.getItem('blog_posts');
      if (saved) {
        try {
          setPosts(JSON.parse(saved));
        } catch {
          setPosts([]);
        }
      }
      setLoading(false);
      return;
    }

    // Start refresh loading if this is a manual refresh
    if (isManualRefresh) {
      startRefreshing('Refreshing blog posts...');
    } else {
      setLoading(true);
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err.message);
      // Try localStorage as fallback
      const saved = localStorage.getItem('blog_posts');
      if (saved) {
        try {
          setPosts(JSON.parse(saved));
        } catch {
          setPosts([]);
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
    fetchPosts();
  }, []);

  // Save to localStorage whenever posts change (as backup)
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('blog_posts', JSON.stringify(posts));
    }
  }, [posts]);

  // Get published posts only
  const publishedPosts = posts.filter(post => post.status === 'published');
  
  // Get featured posts
  const featuredPosts = publishedPosts.filter(post => post.featured);

  // Get unique categories from posts
  const categories = ['All Posts', ...new Set(posts.map(post => post.category).filter(Boolean))];

  // Get post by ID
  const getPostById = (id) => {
    return posts.find(post => post.id === parseInt(id));
  };

  // Add new post
  const addPost = async (newPost) => {
    const post = {
      ...newPost,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      readTime: `${Math.max(1, Math.ceil((newPost.content?.length || 0) / 1000))} min read`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(post)
          .select()
          .single();
        
        if (error) throw error;
        if (data) {
          setPosts([data, ...posts]);
          return data;
        }
      } catch (err) {
        console.error('Error adding post:', err);
      }
    }

    // Fallback: add to local state
    const localPost = { ...post, id: Date.now() };
    setPosts([localPost, ...posts]);
    return localPost;
  };

  // Update post
  const updatePost = async (id, updatedData) => {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .update(updatedData)
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        if (data) {
          setPosts(posts.map(post => post.id === id ? data : post));
          return data;
        }
      } catch (err) {
        console.error('Error updating post:', err);
      }
    }

    // Fallback: update local state
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedData } : post
    ));
  };

  // Delete post
  const deletePost = async (id) => {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }

    setPosts(posts.filter(post => post.id !== id));
  };

  // Toggle publish status
  const togglePublishStatus = async (id) => {
    const post = posts.find(p => p.id === id);
    const newStatus = post?.status === 'published' ? 'draft' : 'published';
    await updatePost(id, { status: newStatus });
  };

  // Toggle featured status
  const toggleFeatured = async (id) => {
    const post = posts.find(p => p.id === id);
    await updatePost(id, { featured: !post?.featured });
  };

  // Increment views
  const incrementViews = async (id) => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.rpc('increment_views', { row_id: id });
      } catch {
        // RPC might not exist, try direct update
        const post = posts.find(p => p.id === id);
        if (post) {
          await updatePost(id, { views: (post.views || 0) + 1 });
        }
      }
    }
    
    // Always update local state
    setPosts(posts.map(post => 
      post.id === id ? { ...post, views: (post.views || 0) + 1 } : post
    ));
  };

  // Exposed refresh function that triggers loading state
  const refreshPosts = async () => {
    await fetchPosts(true); // true = isManualRefresh
  };

  // Filter posts
  const filterPosts = (category, searchQuery) => {
    return publishedPosts.filter(post => {
      const matchesCategory = category === 'All Posts' || post.category === category;
      const matchesSearch = !searchQuery || 
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const value = {
    posts,
    publishedPosts,
    featuredPosts,
    categories,
    loading,
    error,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    togglePublishStatus,
    toggleFeatured,
    incrementViews,
    filterPosts,
    refreshPosts: fetchPosts
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
