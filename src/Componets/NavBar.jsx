import { useState, useEffect, useRef } from "react";
import { Menu, X, Settings, ChevronDown, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../context/LoadingContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
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
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO - Hidden when mobile menu is open */}
          {!isOpen && (
            <div className="flex items-center gap-2">
              <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-2 cursor-pointer group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <img
                    src="https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png" 
                    alt="AGI ACCRA" 
                    className="h-10 w-auto transition-all duration-300 group-hover:drop-shadow-lg group-hover:drop-shadow-red-500/20"
                  />
                  {/* Glow effect on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"
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
                  className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-medium group transition-all duration-300 ${
                    isDark 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {link.name}
                  
                  {/* Animated underline */}
                  <motion.span 
                    className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-red-500 -translate-x-1/2"
                    whileHover={{ width: "80%" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Glow effect on hover */}
                  <motion.span
                    className="absolute inset-0 bg-red-500/0 rounded-lg"
                    whileHover={{ backgroundColor: "rgba(220, 38, 38, 0.05)" }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </motion.div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Button (Desktop) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`hidden md:flex w-9 h-9 items-center justify-center rounded-full transition-all ${
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
                    className={`text-sm uppercase tracking-wider ${
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
