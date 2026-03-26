import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { useTheme } from '../context/ThemeContext';
import RefreshButton from '../Componets/RefreshButton';
import PullToRefresh from '../Componets/PullToRefresh';

const POSTS_PER_PAGE = 9;

const BlogPage = () => {
  const { publishedPosts, categories, filterPosts, refreshPosts } = useBlog();
  const { isDark } = useTheme();

  const [filter, setFilter] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Include "All Posts" in categories
  const allCategories = ['All Posts', ...categories];

  const filteredPosts = useMemo(() => {
    return filterPosts(filter, searchQuery);
  }, [filter, searchQuery, filterPosts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <PullToRefresh onRefresh={refreshPosts}>
      <div className={`min-h-screen font-sans ${isDark
        ? 'bg-black text-white'
        : 'bg-white text-black'
        }`}>

        {/* Header Section */}
        <header className={`pt-28 pb-12 px-6 max-w-7xl mx-auto ${isDark ? 'border-b border-gray-800' : 'border-b border-gray-100'}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-600 font-bold text-xs uppercase tracking-widest">Perspectives</span>
            <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>/</span>
            <span className={isDark ? 'text-gray-500 font-medium text-xs uppercase tracking-widest' : 'text-gray-400 font-medium text-xs uppercase tracking-widest'}>Industry Insights</span>
          </div>
          <h1 className={`text-5xl md:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-black'
            }`}>
            Our <span className="text-red-600">Blog</span>
          </h1>
          <p className={isDark ? 'text-gray-400 text-lg max-w-2xl leading-relaxed' : 'text-gray-500 text-lg max-w-2xl leading-relaxed'}>
            The pulse of Ghanaian industry. Explore expert analysis, policy updates, and strategic advice for the modern enterprise.
          </p>

          {/* Refresh Button */}
          <div className="mt-4">
            <RefreshButton onRefresh={refreshPosts} label="Refresh Posts" size="sm" />
          </div>
        </header>

        {/* Control Bar: Search & Filters */}
        <section className={`sticky top-14 md:top-16 z-30 backdrop-blur-md py-4 md:py-6 px-4 md:px-6 mb-8 md:mb-12 ${isDark
          ? 'bg-black/80 border-b border-white/10'
          : 'bg-white/80 border-b border-gray-100'
          }`}>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">

            {/* Smart Search */}
            <div className="relative w-full lg:w-96">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
              <input
                type="text"
                placeholder="Search for posts..."
                className={`w-full rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-red-600 outline-none transition-all ${isDark
                  ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
                  }`}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${filter === cat
                    ? 'bg-red-600 text-white shadow-lg'
                    : isDark
                      ? 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
                      : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <main className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode='popLayout'>
              {paginatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} isDark={isDark} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Smart Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p className={isDark ? 'text-gray-400 text-xl' : 'text-gray-400 text-xl'}>No posts found matching your search.</p>
              <button
                onClick={() => { setFilter('All Posts'); setSearchQuery(''); setCurrentPage(1); }}
                className="mt-4 text-red-600 font-bold underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

          {/* Dynamic Pagination */}
          {filteredPosts.length > 0 && totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`p-2 border rounded-lg transition-all ${currentPage === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark
                    ? 'border-gray-700 hover:bg-gray-800 text-gray-400'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-400'
                  }`}
              >
                <ChevronLeft />
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={index} className={`px-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>...</span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === page
                      ? 'bg-red-600 text-white shadow-lg'
                      : isDark
                        ? 'border border-gray-700 hover:bg-gray-800 text-gray-300'
                        : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                  >
                    {page}
                  </button>
                )
              ))}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 border rounded-lg transition-all ${currentPage === totalPages
                  ? 'opacity-50 cursor-not-allowed'
                  : isDark
                    ? 'border-gray-700 hover:bg-gray-800 text-gray-400'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-400'
                  }`}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </main>
      </div>
    </PullToRefresh>
  );
};

const BlogCard = ({ post, isDark }) => (
  <motion.article
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group flex flex-col h-full"
  >
    <Link to={`/blog/${post.id}`}>
      <div className={`relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 shadow-sm ${isDark ? 'border border-gray-700' : 'border border-gray-100'
        }`}>
        <img
          src={post.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`backdrop-blur-sm shadow-sm text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md ${isDark
            ? 'bg-black/80 text-red-400 border border-white/10'
            : 'bg-white/95 text-red-800 border border-red-50'
            }`}>
            {post.category}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <h3 className={`text-2xl font-bold leading-tight mb-4 group-hover:text-red-600 transition-colors ${isDark ? 'text-white' : 'text-gray-900'
          }`}>
          {post.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-6 flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
          {post.excerpt}
        </p>

        <div className={`pt-6 flex justify-between items-center ${isDark ? 'border-t border-gray-800' : 'border-t border-gray-100'
          }`}>
          <span className={`text-xs font-medium flex items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
            <Calendar size={14} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
            {post.date}
          </span>
          <span className={`text-xs font-black uppercase flex items-center gap-1 group-hover:gap-2 transition-all ${isDark ? 'text-red-400' : 'text-red-700'
            }`}>
            Read More <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  </motion.article>
);

export default BlogPage;
