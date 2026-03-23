import React, { useState } from 'react';
import { Twitter, Instagram, Linkedin, Facebook, Shield, Lock, Settings, Users, BarChart3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../context/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
    const { isDark } = useTheme();
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    const footerLinks = {
        company: [
            { name: "About Us", path: "/about" },
            { name: "Our History", path: "/about" },
            { name: "Leadership", path: "/executives" },
            { name: "Sectors", path: "/sectors" },
        ],
        resources: [
            { name: "Blog", path: "/blog" },
            { name: "Media", path: "/media" },
            { name: "Membership", path: "/membership" },
            { name: "Apply", path: "/apply" },
        ],
        legal: [
            { name: "Privacy Policy", path: "#" },
            { name: "Terms & Conditions", path: "#" },
        ]
    };

    // Handle navigation with loading
    const handleNavClick = (path) => {
        if (path === '#') return;
        startLoading('Loading...');
        setTimeout(() => {
            navigate(path);
            setTimeout(() => stopLoading(), 300);
        }, 300);
    };

    // Admin panel visibility
    const [showAdminPanel, setShowAdminPanel] = useState(false);

    // Admin menu items
    const adminMenuItems = [
        { icon: BarChart3, label: 'Dashboard', path: '/admin', description: 'Overview & Stats' },
        { icon: Users, label: 'Users', path: '/admin', description: 'Manage Team' },
        { icon: Settings, label: 'Settings', path: '/admin', description: 'Configure' },
    ];

    return (
        <footer className={`pt-24 pb-10 px-6 md:px-20 transition-colors duration-300 ${
            isDark 
                ? 'bg-gray-900 border-t border-gray-800' 
                : 'bg-white border-t border-gray-200'
        }`}>

            <div className="container mx-auto grid md:grid-cols-4 gap-16">

                {/* BRAND */}
                <div className="space-y-6">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3"
                    >
                        <Link to="/">
                            <img 
                                src="https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png" 
                                alt="AGI ACCRA" 
                                className={`h-12 w-auto ${isDark ? '' : 'brightness-0 invert'}`}
                            />
                        </Link>
                    </motion.div>

                    <p className={`text-sm leading-relaxed max-w-xs ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                        The leading voice of industry in Ghana, driving growth, policy advocacy,
                        and a globally competitive business environment.
                    </p>

                    <div className="flex gap-4">
                        {[
                            { icon: Twitter, href: '#' },
                            { icon: Instagram, href: '#' },
                            { icon: Linkedin, href: '#' },
                            { icon: Facebook, href: '#' }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`transition cursor-pointer ${
                                    isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-red-600'
                                }`}
                            >
                                <social.icon size={20} />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* COMPANY LINKS */}
                <div>
                    <h4 className={`text-xs font-semibold uppercase tracking-widest mb-6 ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                        Company
                    </h4>
                    <ul className={`space-y-4 text-sm ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                        {footerLinks.company.map((link) => (
                            <li key={link.name}>
                                <motion.button
                                    whileHover={{ x: 4 }}
                                    onClick={() => handleNavClick(link.path)}
                                    className={`text-left transition cursor-pointer ${
                                        isDark ? 'hover:text-white' : 'hover:text-red-600'
                                    }`}
                                >
                                    {link.name}
                                </motion.button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RESOURCES */}
                <div>
                    <h4 className={`text-xs font-semibold uppercase tracking-widest mb-6 ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                        Resources
                    </h4>
                    <ul className={`space-y-4 text-sm ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                        {footerLinks.resources.map((link) => (
                            <li key={link.name}>
                                <motion.button
                                    whileHover={{ x: 4 }}
                                    onClick={() => handleNavClick(link.path)}
                                    className={`text-left transition cursor-pointer ${
                                        isDark ? 'hover:text-white' : 'hover:text-red-600'
                                    }`}
                                >
                                    {link.name}
                                </motion.button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* NEWSLETTER */}
                <div>
                    <h4 className={`text-xs font-semibold uppercase tracking-widest mb-6 ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                        Newsletter
                    </h4>

                    <p className={`text-sm mb-4 ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                        Get weekly insights and updates from Ghana's industrial sector.
                    </p>

                    <div className="space-y-3">
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="email"
                            placeholder="Your email address"
                            className={`w-full p-3 text-sm focus:outline-none transition ${
                                isDark 
                                    ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-red-500' 
                                    : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-red-500'
                            }`}
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-red-600 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-red-700 text-white transition cursor-pointer"
                        >
                            Subscribe
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div className={`mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest ${
                isDark 
                    ? 'border-gray-800 text-gray-600' 
                    : 'border-gray-200 text-gray-500'
            }`}>
                <p>© 2026 Association of Ghana Industries</p>

                <div className="flex gap-6 items-center">
                    {footerLinks.legal.map((link) => (
                        <motion.button
                            key={link.name}
                            whileHover={{ color: isDark ? '#fff' : '#dc2626' }}
                            onClick={() => handleNavClick(link.path)}
                            className={`transition cursor-pointer ${
                                isDark ? 'hover:text-white' : 'hover:text-red-600'
                            }`}
                        >
                            {link.name}
                        </motion.button>
                    ))}
                    {/* Admin Panel Entry - More Prominent */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAdminPanel(!showAdminPanel)}
                            className={`transition cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border ${
                                isDark 
                                    ? 'border-gray-700 bg-gray-800/50 hover:border-red-500 hover:bg-red-500/10' 
                                    : 'border-gray-200 bg-white hover:border-red-500 hover:bg-red-50'
                            }`}
                        >
                            <Shield size={16} className={isDark ? 'text-red-400' : 'text-red-600'} />
                            <span className={`text-xs font-semibold uppercase tracking-wider ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                                Admin Panel
                            </span>
                        </motion.button>

                        {/* Admin Dropdown */}
                        <AnimatePresence>
                            {showAdminPanel && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute bottom-full right-0 mb-2 w-64 rounded-xl overflow-hidden shadow-2xl ${
                                        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                                    }`}
                                >
                                    {/* Admin Header */}
                                    <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                                                <Shield size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin Access</p>
                                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Restricted Area</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Links */}
                                    <div className="p-2">
                                        {adminMenuItems.map((item, index) => (
                                            <motion.button
                                                key={item.label}
                                                whileHover={{ x: 4 }}
                                                onClick={() => {
                                                    handleNavClick(item.path);
                                                    setShowAdminPanel(false);
                                                }}
                                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                                    isDark 
                                                        ? 'hover:bg-gray-700 text-gray-300' 
                                                        : 'hover:bg-gray-50 text-gray-700'
                                                }`}
                                            >
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                                                }`}>
                                                    <item.icon size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-sm font-semibold">{item.label}</p>
                                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.description}</p>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className={`p-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                handleNavClick('/admin');
                                                setShowAdminPanel(false);
                                            }}
                                            className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-600"
                                        >
                                            <Lock size={14} />
                                            Enter Admin Panel
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </footer>
    );
}
