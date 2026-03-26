import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar, Clock, User, Share2, MessageSquare,
    Bookmark, ChevronRight, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { useTheme } from '../context/ThemeContext';

const BlogPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPostById, publishedPosts, incrementViews } = useBlog();
    const { isDark } = useTheme();

    const post = getPostById(id);

    // Increment views when page loads
    useEffect(() => {
        if (post) {
            incrementViews(parseInt(id));
        }
    }, [id]);

    // Get related posts (same category, excluding current)
    const relatedPosts = publishedPosts
        .filter(p => p.category === post?.category && p.id !== parseInt(id))
        .slice(0, 3);

    if (!post) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${
                isDark ? 'bg-black' : 'bg-white'
            }`}>
                <div className="text-center">
                    <h2 className={`text-2xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Post Not Found
                    </h2>
                    <p className={isDark ? 'text-gray-400 mb-6' : 'text-gray-500 mb-6'}>
                        The blog post you're looking for doesn't exist or has been removed.
                    </p>
                    <Link 
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        <ArrowLeft size={18} />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen font-sans pb-20 pt-14 md:pt-20 overflow-x-hidden ${
            isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}>
            {/* Breadcrumbs with Back Button */}
            <nav className={`max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
                <div className="flex items-center gap-1 md:gap-2 text-xs font-bold uppercase tracking-widest overflow-hidden">
                    <Link to="/" className={`hover:text-red-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'} whitespace-nowrap`}>
                        Home
                    </Link>
                    <ChevronRight size={10} />
                    <Link to="/blog" className={`hover:text-red-600 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'} whitespace-nowrap`}>
                        Blog
                    </Link>
                    <ChevronRight size={10} />
                    <span className={`truncate max-w-[120px] md:max-w-[200px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{post.title}</span>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors ${
                        isDark 
                            ? 'bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white' 
                            : 'bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white'
                    }`}
                >
                    <ArrowLeft size={14} />
                    Back
                </button>
            </nav>

            {/* Floating Social Icons - Fixed Position (Desktop only) */}
            <div className={`hidden xl:flex flex-col gap-3 fixed left-4 2xl:left-10 top-1/2 -translate-y-1/2 z-40 ${
                isDark ? 'bg-black/90' : 'bg-white/90'
            } backdrop-blur-sm p-3 rounded-xl shadow-lg`}>
                <button className={`p-3 rounded-full transition-all ${
                    isDark 
                        ? 'bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white' 
                        : 'bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white'
                }`}>
                    <Share2 size={20} />
                </button>
                <button className={`p-3 rounded-full transition-all ${
                    isDark 
                        ? 'bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white' 
                        : 'bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white'
                }`}>
                    <MessageSquare size={20} />
                </button>
                <button className={`p-3 rounded-full transition-all ${
                    isDark 
                        ? 'bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white' 
                        : 'bg-gray-100 hover:bg-red-600 text-gray-600 hover:text-white'
                }`}>
                    <Bookmark size={20} />
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                {/* Main Content */}
                <main className="lg:col-span-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block ${
                            isDark 
                                ? 'bg-red-900/30 text-red-400 border border-red-800' 
                                : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                            {post.category}
                        </span>
                        <h1 className={`text-2xl md:text-4xl lg:text-6xl font-black leading-tight mb-6 md:mb-8 ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                            {post.title}
                        </h1>

                        <div className={`flex flex-wrap items-center gap-4 md:gap-8 mb-8 md:pb-8 ${
                            isDark ? 'border-b border-gray-800' : 'border-b border-gray-100'
                        }`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                                }`}>
                                    <User size={20} />
                                </div>
                                <div>
                                    <span className={`font-bold text-sm block ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {post.author || 'Editorial Team'}
                                    </span>
                                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {post.authorRole || 'Staff Writer'}
                                    </span>
                                </div>
                            </div>
                            <div className={`flex items-center gap-2 text-sm ${
                                isDark ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                <Calendar size={16} /> {post.date}
                            </div>
                            <div className={`flex items-center gap-2 text-sm ${
                                isDark ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                <Clock size={16} /> {post.readTime || '5 min read'}
                            </div>
                            <div className={`flex items-center gap-2 text-sm ${
                                isDark ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                                <span>{post.views?.toLocaleString() || 0} views</span>
                            </div>
                        </div>

                        <img 
                            src={post.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'} 
                            className="w-full aspect-video object-cover rounded-xl md:rounded-3xl mb-8 md:mb-12 shadow-2xl" 
                            alt={post.title} 
                        />

                        {/* Dynamic Content from Database */}
                        <div className={`prose prose-lg max-w-none leading-relaxed space-y-8 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            {post.content ? (
                                <div className="text-xl font-medium leading-relaxed">
                                    {post.content.split('\n\n').map((paragraph, idx) => (
                                        <p key={idx} className={`mb-4 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p className={`text-xl font-medium leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                                    No content available for this post. Please add content in the admin dashboard.
                                </p>
                            )}
                        </div>

                        {/* Share Section */}
                        <div className={`mt-8 md:mt-12 pt-6 md:pt-8 border-t ${
                            isDark ? 'border-gray-800' : 'border-gray-100'
                        }`}>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <span className={`text-sm font-bold ${
                                    isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>Share:</span>
                                <div className="flex gap-2 flex-wrap">
                                    {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                                        <button
                                            key={social}
                                            className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                isDark 
                                                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                            }`}
                                        >
                                            {social}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-12">
                    <div className={`p-8 rounded-3xl sticky top-24 ${
                        isDark ? 'bg-gray-800' : 'bg-gray-50'
                    }`}>
                        <h4 className={`font-black uppercase tracking-widest text-sm mb-8 ${
                            isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                            Latest Insights
                        </h4>
                        <div className="space-y-8">
                            {relatedPosts.length > 0 ? (
                                relatedPosts.map((relatedPost) => (
                                    <SidebarPost 
                                        key={relatedPost.id}
                                        post={relatedPost}
                                        isDark={isDark}
                                    />
                                ))
                            ) : (
                                <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                                    No related posts available.
                                </p>
                            )}
                        </div>

                        <div className={`mt-12 p-8 rounded-2xl ${
                            isDark ? 'bg-red-900/30 border border-red-800' : 'bg-red-800'
                        } text-white`}>
                            <h5 className="font-bold text-xl mb-4">Be part of the Future</h5>
                            <p className={`text-sm mb-6 ${
                                isDark ? 'text-red-300' : 'text-red-100'
                            }`}>
                                Join AGI today and gain access to exclusive market insights.
                            </p>
                            <Link 
                                to="/membership"
                                className="block w-full text-center bg-white text-red-800 font-bold py-3 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

const SidebarPost = ({ post, isDark }) => (
    <Link to={`/blog/${post.id}`} className="flex gap-4 group cursor-pointer">
        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden">
            <img 
                src={post.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                alt={post.title}
            />
        </div>
        <div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${
                isDark ? 'text-red-400' : 'text-red-600'
            }`}>
                {post.category}
            </span>
            <h5 className={`font-bold text-sm leading-snug group-hover:text-red-600 transition-colors line-clamp-2 ${
                isDark ? 'text-white' : 'text-gray-900'
            }`}>
                {post.title}
            </h5>
        </div>
    </Link>
);

export default BlogPostPage;
