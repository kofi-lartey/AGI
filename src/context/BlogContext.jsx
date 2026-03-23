import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext();

// Sample initial blog posts
const initialPosts = [
  {
    id: 1,
    title: "Ghana's Industrial Growth Projections for 2024",
    excerpt: "Exploring the rapid expansion of local manufacturing sectors and the impact of the new AfCFTA trade protocols on Ghanaian businesses.",
    content: `The Ghanaian manufacturing sector stands at a critical crossroads. As global markets shift toward decentralized, high-tech production models, the Association of Ghana Industries is leading the charge...

For decades, Ghana's industrial landscape was defined by manual labor and semi-automated systems. However, 2024 marks a pivotal year where the integration of IoT is no longer a luxury, but a necessity.

Our goal isn't just to increase production; it's to transform the DNA of Ghanaian manufacturing to be smarter, greener, and globally competitive.`,
    category: "Industry News",
    author: "Kwesi Mensah",
    authorRole: "Industry Analyst",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    status: "published",
    views: 1250,
    featured: true
  },
  {
    id: 2,
    title: "Strategic Business Scaling in Volatile Markets",
    excerpt: "How to leverage AGI networks for sustainable business scaling and risk management in the current economic landscape.",
    content: "In today's rapidly evolving economic landscape, businesses face unprecedented challenges...",
    category: "Business Strategy",
    author: "Dr. Sarah Kofi",
    authorRole: "Business Consultant",
    date: "2024-01-14",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80",
    status: "published",
    views: 980,
    featured: false
  },
  {
    id: 3,
    title: "Highlights from the AGI Annual General Summit",
    excerpt: "A recap of the key takeaways, executive decisions, and future roadmap presented during this year's premier industry summit.",
    content: "The Annual General Summit brought together industry leaders, policymakers, and stakeholders...",
    category: "Events",
    author: "James Agyeman",
    authorRole: "Events Coordinator",
    date: "2024-01-12",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
    status: "published",
    views: 750,
    featured: false
  },
  {
    id: 4,
    title: "Reviewing New SME Policy Frameworks",
    excerpt: "AGI's response to the latest trade policy proposals and how we are advocating for better incentives for small-scale manufacturers.",
    content: "The government recently unveiled new policy frameworks aimed at supporting SME growth...",
    category: "Policy Advocacy",
    author: "Advocate Mensah",
    authorRole: "Policy Analyst",
    date: "2024-01-10",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80",
    status: "draft",
    views: 0,
    featured: false
  },
  {
    id: 5,
    title: "The Green Transition: Renewables in Manufacturing",
    excerpt: "Sustainable energy practices that are reducing costs and carbon footprints for Ghanaian industrial giants.",
    content: "As climate change becomes an increasingly urgent concern, Ghana's manufacturing sector is embracing renewable energy...",
    category: "Sustainability",
    author: "Dr. Emmanuel Okoe",
    authorRole: "Environmental Consultant",
    date: "2024-01-08",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80",
    status: "published",
    views: 1100,
    featured: true
  },
  {
    id: 6,
    title: "Digital Transformation Trends for 2024",
    excerpt: "Embracing AI, IoT, and automation in the corporate landscape to drive efficiency and global competitiveness.",
    content: "Digital transformation is no longer optional for businesses looking to remain competitive...",
    category: "Business Strategy",
    author: "Nana Yaw",
    authorRole: "Tech Strategist",
    date: "2024-01-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
    status: "published",
    views: 890,
    featured: false
  }
];

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('blog_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialPosts;
      }
    }
    return initialPosts;
  });

  // Save to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('blog_posts', JSON.stringify(posts));
  }, [posts]);

  // Get published posts only
  const publishedPosts = posts.filter(post => post.status === 'published');
  
  // Get featured posts
  const featuredPosts = publishedPosts.filter(post => post.featured);

  // Get post by ID
  const getPostById = (id) => {
    return posts.find(post => post.id === parseInt(id));
  };

  // Add new post
  const addPost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      views: 0,
      readTime: `${Math.max(1, Math.ceil((newPost.content?.length || 0) / 1000))} min read`
    };
    setPosts([post, ...posts]);
    return post;
  };

  // Update post
  const updatePost = (id, updatedData) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedData } : post
    ));
  };

  // Delete post
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Toggle publish status
  const togglePublishStatus = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    ));
  };

  // Toggle featured status
  const toggleFeatured = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured } : post
    ));
  };

  // Increment views
  const incrementViews = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, views: (post.views || 0) + 1 } : post
    ));
  };

  // Get categories
  const categories = [...new Set(posts.map(post => post.category))];

  // Filter posts
  const filterPosts = (category, searchQuery) => {
    return publishedPosts.filter(post => {
      const matchesCategory = category === 'All Posts' || post.category === category;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const value = {
    posts,
    publishedPosts,
    featuredPosts,
    categories,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    togglePublishStatus,
    toggleFeatured,
    incrementViews,
    filterPosts
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
