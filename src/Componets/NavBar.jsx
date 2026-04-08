import { useState, useEffect, useRef } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../context/LoadingContext";
import { blogDb, mediaDb } from "../lib/database";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navRef = useRef(null);
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { startLoading } = useLoading();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Executives", path: "/executives" },
    { name: "Sectors", path: "/sectors" },
    { name: "Membership", path: "/membership" },
    { name: "Media", path: "/media" },
    { name: "Our Blog", path: "/blog" }
  ];

  // Handle navigation
  const handleNavClick = (path) => {
    setIsOpen(false);
    setActiveDropdown(null);
    
    // Only start loading and navigate if the path is different from current location
    if (location.pathname !== path) {
      startLoading('Navigating...');
      navigate(path);
    } else {
      // If already on the same path, just close the menu without loading
      // Optionally scroll to top or refresh content
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Perform search across blog posts and media
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = [];
    const lowerQuery = query.toLowerCase();

    // Search blog posts
    try {
      const { data: blogPosts } = await blogDb.getPublished();
      if (blogPosts) {
        blogPosts.forEach(post => {
          if (
            post.title?.toLowerCase().includes(lowerQuery) ||
            post.content?.toLowerCase().includes(lowerQuery) ||
            post.excerpt?.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              id: post.id,
              title: post.title,
              type: 'Blog',
              path: `/blog/${post.slug || post.id}`
            });
          }
        });
      }
    } catch (e) {
      console.error('Error searching blog posts:', e);
    }

    // Search media
    try {
      const { data: mediaItems } = await mediaDb.getAll();
      if (mediaItems) {
        mediaItems.forEach(media => {
          if (
            media.title?.toLowerCase().includes(lowerQuery) ||
            media.description?.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              id: media.id,
              title: media.title,
              type: 'Media',
              path: `/media?id=${media.id}`
            });
          }
        });
      }
    } catch (e) {
      console.error('Error searching media:', e);
    }

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setIsSearching(false);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedIndex(-1);
    performSearch(query);
  };

  // Handle keyboard navigation
  const handleSearchKeyDown = (e) => {
    if (searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleSearch(searchResults[selectedIndex]);
        } else if (searchQuery.trim()) {
          handleSearch(null);
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeSearch();
        break;
      default:
        break;
    }
  };

  // Handle search submission
  const handleSearch = (result) => {
    if (result) {
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
      startLoading('Searching...');
      navigate(result.path);
    } else if (searchQuery.trim()) {
      // If no specific result, search on blog page
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Close search modal
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Close search on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        closeSearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  // Detect scroll (for background upgrade)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-red-600 z-[60]"
        style={{ width: `${scrollProgress}%` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.1 }}
      />

      {/* NAVBAR */}
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 px-4 md:px-8 lg:px-12 py-3 md:py-4 transition-all duration-500 ${
          isScrolled
            ? isDark 
                ? "bg-black/95 backdrop-blur-2xl shadow-2xl shadow-red-900/10"
                : "bg-white/95 backdrop-blur-2xl shadow-xl shadow-black/5"
            : "bg-transparent"
        }`}
      >
        {/* Wrapper for relative positioning - contains nav content and search dropdown */}
        <div className="relative max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO - Hidden when mobile menu is open */}
          {!isOpen && (
            <div className="flex items-center gap-2">
              <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-2 cursor-pointer group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer"
                >
                  <img
                    src="https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png" 
                    alt="AGI ACCRA" 
                    className="h-10 w-auto transition-all duration-300 group-hover:drop-shadow-lg group-hover:drop-shadow-red-500/20 cursor-pointer"
                  />
                  {/* Glow effect on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-red-500/20 blur-xl rounded-full cursor-pointer"
                  />
                </motion.div>
              </Link>
              
              {/* Logo Text Decoration */}
              <div className="hidden md:flex items-center gap-2 ml-2">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-red-500" />
                <span className={`text-[10px] uppercase tracking-[0.2em] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  Est. 1961
                </span>
              </div>
            </div>
          )}

          {/* Spacer when mobile menu is open to maintain layout */}
          {isOpen && <div className="flex-1" />}

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-1 items-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                <button
                  onClick={() => handleNavClick(link.path)}
                  className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium group transition-all duration-300 cursor-pointer ${
                    isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {link.name}
                  
                  {/* Animated underline */}
                  <motion.span 
                    className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-red-500 -translate-x-1/2 cursor-pointer"
                    whileHover={{ width: "80%" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow effect on hover */}
                  <motion.span
                    className="absolute inset-0 bg-red-500/0 rounded-lg cursor-pointer"
                    whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.05)" }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </motion.div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Button - Visible on all screens */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className={`flex w-9 h-9 items-center justify-center rounded-full transition-all cursor-pointer ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-red-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>

            {/* JOIN BUTTON (desktop) */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(220, 38, 38, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick('/membership')}
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all bg-red-600 hover:bg-red-700 text-white cursor-pointer group"
            >
              <Zap className="w-3.5 h-3.5 group-hover:animate-pulse" />
              Join
            </motion.button>

            {/* HAMBURGER - Hidden when mobile menu is open */}
            {!isOpen && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}
              >
                <motion.div
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={24} />
                </motion.div>
              </button>
            )}
          </div>

          {/* INLINE SEARCH DROPDOWN - Inside relative nav wrapper */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                ref={searchContainerRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[60]"
                role="search"
              >
                {/* Search Input */}
                <div className="relative p-3">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search..."
                    className="w-full bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Search input"
                    aria-describedby="search-help"
                    aria-controls="search-results"
                    aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                        setSelectedIndex(-1);
                        searchInputRef.current?.focus();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Loading State */}
                {isSearching && (
                  <div className="px-4 pb-3 text-xs text-gray-500" role="status">Searching...</div>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <ul 
                      className="max-h-64 overflow-y-auto py-1" 
                      id="search-results" 
                      role="listbox"
                      aria-label="Search results"
                    >
                      {searchResults.map((result, index) => (
                        <li key={`${result.type}-${result.id}`}>
                          <button
                            onClick={() => handleSearch(result)}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${
                              selectedIndex === index 
                                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                            role="option"
                            id={`search-result-${index}`}
                            aria-selected={selectedIndex === index}
                          >
                            <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                              {result.type}
                            </span>
                            <span className="truncate">{result.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* No Results */}
                {!isSearching && searchQuery.trim() && searchResults.length === 0 && (
                  <div className="px-4 py-3 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700" role="status">
                    No results found
                  </div>
                )}

                {/* Keyboard Help */}
                {isSearchOpen && !searchQuery.trim() && (
                  <div id="search-help" className="px-4 py-2 text-xs text-gray-400 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                    <span>↑↓ navigate</span>
                    <span>⏎ select</span>
                    <span>ESC close</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className={`fixed top-0 right-0 w-full h-screen z-40 flex flex-col ${
              isDark 
                ? 'bg-black' 
                : 'bg-white'
            }`}
          >
            {/* MENU BACKGROUND PATTERN */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            
            {/* DECORATIVE ELEMENTS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-20 right-10 w-40 h-40 bg-red-600/5 rounded-full blur-3xl"
            />

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-6 right-6 p-2 cursor-pointer z-50 ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <X size={28} />
              </motion.div>
            </button>

            {/* MOBILE LOGO */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pt-24 px-8"
            >
              <img
                src="https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png" 
                alt="AGI" 
                className="h-12 w-auto"
              />
            </motion.div>

            {/* LINKS CONTAINER */}
            <div className="flex-1 flex flex-col justify-center px-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  className="cursor-pointer"
                >
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`text-3xl md:text-4xl font-black uppercase tracking-tight py-4 cursor-pointer block w-full text-left transition-colors ${
                      isDark 
                        ? 'text-white hover:text-red-500' 
                        : 'text-gray-900 hover:text-red-600'
                    }`}
                  >
                    {link.name}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* CTA SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(220, 38, 38, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick('/membership')}
                className="w-full py-4 text-sm uppercase tracking-widest font-bold bg-red-600 text-white cursor-pointer flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5" />
                Join Now
              </motion.button>

              {/* Social Links */}
              <div className="flex justify-center gap-6 mt-6">
                {['Twitter', 'Instagram', 'Linkedin'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`text-sm uppercase tracking-wider cursor-pointer ${
                      isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-red-600'
                    }`}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>
    </>
  );
}