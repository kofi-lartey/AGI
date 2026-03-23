import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../context/LoadingContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Executives", path: "/executives" },
        { name: "Sectors", path: "/sectors" },
        { name: "Membership", path: "/membership" },
        { name: "Media", path: "/media" },
        { name: "Our Blog", path: "/blog" },
        { name: "Admin", path: "/admin" },
    ];

    // Handle navigation with loading
    const handleNavClick = (path) => {
        setIsOpen(false);
        startLoading('Navigating...');
        setTimeout(() => {
            navigate(path);
            // Stop loading after navigation completes
            setTimeout(() => stopLoading(), 300);
        }, 300);
    };

    // Detect scroll (for background upgrade)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* NAVBAR */}
            <nav
                className={`fixed top-0 w-full z-50 px-4 md:px-12 py-3 md:py-4 flex justify-between items-center transition-all duration-300 ${
                    isScrolled
                        ? isDark 
                            ? "bg-gray-900/95 backdrop-blur-xl border-b border-white/10"
                            : "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg"
                        : isDark
                            ? "bg-gray-900 border-b border-white/5"
                            : "bg-white border-b border-gray-100 shadow-sm"
                }`}
            >
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <Link to="/" onClick={() => handleNavClick('/')} className="flex items-center gap-2 cursor-pointer">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            src="https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png" 
                            alt="AGI ACCRA" 
                            className={`h-10 w-auto ${isDark ? '' : 'brightness-0 invert'}`}
                        />
                    </Link>
                </div>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex gap-8 items-center">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => handleNavClick(link.path)}
                                className={`relative text-[11px] uppercase tracking-[0.2em] font-medium group ${
                                    isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-red-600'
                                } transition cursor-pointer`}
                            >
                                {link.name}
                                <motion.span 
                                    className="absolute left-0 -bottom-1 w-0 h-[1px] bg-red-500"
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.2 }}
                                />
                            </button>
                        </motion.div>
                    ))}
                    
                    {/* Admin Link */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: navLinks.length * 0.05 }}
                    >
                        <button
                            onClick={() => handleNavClick('/admin')}
                            className={`relative text-[11px] uppercase tracking-[0.2em] font-medium group cursor-pointer transition flex items-center gap-1 ${
                                isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'
                            }`}
                        >
                            <Settings size={14} />
                            Admin
                        </button>
                    </motion.div> */}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                    {/* THEME TOGGLE */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                            isDark 
                                ? 'bg-gray-800 border border-gray-600' 
                                : 'bg-gray-200 border border-gray-300'
                        }`}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        <motion.div
                            className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                isDark 
                                    ? 'bg-red-500' 
                                    : 'bg-red-600'
                            }`}
                            animate={{ x: isDark ? 28 : 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            {isDark ? (
                                <Moon size={12} className="text-white" />
                            ) : (
                                <Sun size={12} className="text-white" />
                            )}
                        </motion.div>
                    </motion.button>

                    {/* JOIN BUTTON (desktop) */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleNavClick('/membership')}
                        className="hidden lg:block px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                    >
                        Join
                    </motion.button>

                    {/* HAMBURGER */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden cursor-pointer ${isDark ? 'text-white' : 'text-gray-800'}`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className={`fixed top-0 right-0 w-full h-screen z-40 flex flex-col justify-center items-center gap-8 ${
                            isDark 
                                ? 'bg-gray-900' 
                                : 'bg-white'
                        }`}
                    >
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`absolute top-6 right-6 cursor-pointer ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            <X size={28} />
                        </button>

                        {/* THEME TOGGLE IN MOBILE */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className={`absolute top-6 left-6 p-3 rounded-full transition-colors cursor-pointer ${
                                isDark 
                                    ? 'bg-gray-800 hover:bg-gray-700' 
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? (
                                <Sun size={22} className="text-yellow-400" />
                            ) : (
                                <Moon size={22} className="text-gray-600" />
                            )}
                        </motion.button>

                        {/* LINKS */}
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    onClick={() => handleNavClick(link.path)}
                                    className={`text-xl uppercase tracking-widest cursor-pointer ${
                                        isDark 
                                            ? 'text-white hover:text-red-500' 
                                            : 'text-gray-800 hover:text-red-600'
                                    } transition`}
                                >
                                    {link.name}
                                </button>
                            </motion.div>
                        ))}

                        {/* Admin Link Mobile */}
                        {/* <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: navLinks.length * 0.1 }}
                        >
                            <button
                                onClick={() => handleNavClick('/admin')}
                                className={`text-lg uppercase tracking-widest flex items-center gap-2 cursor-pointer ${
                                    isDark 
                                        ? 'text-gray-400 hover:text-red-400' 
                                        : 'text-gray-500 hover:text-red-600'
                                } transition`}
                            >
                                <Settings size={20} />
                                Admin
                            </button>
                        </motion.div> */}

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (navLinks.length + 1) * 0.1 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleNavClick('/membership')}
                                className="mt-4 px-8 py-3 text-xs uppercase tracking-widest font-bold bg-red-600 text-white cursor-pointer"
                            >
                                Join Now
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
