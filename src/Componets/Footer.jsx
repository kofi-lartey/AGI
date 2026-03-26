import React, { useState, useRef } from 'react';
import { Twitter, Instagram, Linkedin, Facebook, Shield, Lock, Settings, Users, BarChart3, ArrowRight, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../context/LoadingContext";
import { motion, AnimatePresence, useInView } from "framer-motion";

export default function Footer() {
  const { isDark } = useTheme();
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

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

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ];

  return (
    <footer 
      ref={footerRef}
      className={`relative pt-24 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-black border-t border-white/5' 
          : 'bg-white border-t border-gray-100'
      }`}
    >
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-600/5 rounded-full blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* BRAND SECTION */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <Link to="/">
                <img 
                  src="https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png" 
                  alt="AGI ACCRA" 
                  className="h-12 w-auto"
                />
              </Link>
            </motion.div>

            <p className={`text-sm leading-relaxed max-w-xs ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              The leading voice of industry in Ghana, driving growth, policy advocacy,
              and a globally competitive business environment.
            </p>

            {/* Social Links with enhanced styling */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isDark 
                      ? 'bg-white/5 hover:bg-red-600 text-gray-500 hover:text-white' 
                      : 'bg-gray-100 hover:bg-red-600 text-gray-400 hover:text-white'
                  }`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Company
            </motion.h4>
            <ul className={`space-y-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {footerLinks.company.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`flex items-center gap-2 text-left transition-all group ${
                      isDark ? 'hover:text-white' : 'hover:text-red-600'
                    }`}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-500" />
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Resources
            </motion.h4>
            <ul className={`space-y-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {footerLinks.resources.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className={`flex items-center gap-2 text-left transition-all group ${
                      isDark ? 'hover:text-white' : 'hover:text-red-600'
                    }`}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-500" />
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className={`text-xs font-bold uppercase tracking-[0.2em] mb-6 ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Newsletter
            </motion.h4>

            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Get weekly insights and updates from Ghana's industrial sector.
            </p>

            <div className="space-y-3">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                className="relative"
              >
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`w-full pl-12 pr-4 py-3.5 text-sm rounded-xl transition-all focus:outline-none ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-red-500 focus:bg-white/10' 
                      : 'bg-gray-50 border border-gray-200 text-black placeholder-gray-400 focus:border-red-500 focus:bg-white'
                  }`}
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(220, 38, 38, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-widest bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className={`mt-20 pt-8 border-t flex flex-col lg:flex-row justify-between items-center gap-6 ${
            isDark 
              ? 'border-gray-800' 
              : 'border-gray-200'
          }`}
        >
          <div className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2026 Association of Ghana Industries
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            {footerLinks.legal.map((link) => (
              <motion.button
                key={link.name}
                whileHover={{ color: isDark ? '#fff' : '#dc2626' }}
                onClick={() => handleNavClick(link.path)}
                className={`text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {link.name}
              </motion.button>
            ))}

            {/* Admin Panel Entry */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className={`transition cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border ${
                  isDark 
                    ? 'border-gray-700/50 bg-gray-800/30 hover:border-red-500 hover:bg-red-500/10' 
                    : 'border-gray-200 bg-white hover:border-red-500 hover:bg-red-50'
                }`}
              >
                <Shield size={16} className={isDark ? 'text-red-400' : 'text-red-600'} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Admin
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
                    className={`absolute bottom-full right-0 mb-3 w-72 rounded-2xl overflow-hidden shadow-2xl z-50 ${
                      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    {/* Admin Header */}
                    <div className={`p-5 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                          <Shield size={22} className="text-white" />
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
                          whileHover={{ x: 4, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                          onClick={() => {
                            handleNavClick(item.path);
                            setShowAdminPanel(false);
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            isDark ? 'bg-gray-700/50' : 'bg-gray-100'
                          }`}>
                            <item.icon size={18} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
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
                        className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-600 shadow-lg shadow-red-500/20"
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
        </motion.div>
      </div>
    </footer>
  );
}
