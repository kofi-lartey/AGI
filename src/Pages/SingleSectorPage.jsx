/**
 * SingleSectorPage Component
 * 
 * Displays detailed information for a single industry sector.
 * Shows sector leader, stats, benefits, and navigation.
 * 
 * @route /sectors/:sectorKey - Dynamic route for each sector
 * @accessibility ARIA landmarks and proper heading hierarchy
 * 
 * Placeholder data from sectorsData.js - replace with API data later
 */

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useLoading } from '../context/LoadingContext';
import { 
  ArrowLeft, CheckCircle2, Users, TrendingUp, BarChart3, 
  Globe, Calendar, Mail, Phone
} from 'lucide-react';
import { sectorsData } from '../data/sectorsData';

const SingleSectorPage = () => {
  // Get sector key from URL parameters
  const { sectorKey } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { startLoading } = useLoading();

  // Get sector data based on URL key
  // Decode URI component to handle spaces in URL
  const decodedKey = decodeURIComponent(sectorKey);
  const sector = sectorsData[decodedKey];

  // Handle invalid sector - redirect to sectors overview
  if (!sector) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sector Not Found</h2>
          <Link 
            to="/sectors" 
            className="text-red-500 hover:text-red-600 underline"
          >
            Return to Sectors Overview
          </Link>
        </div>
      </div>
    );
  }

  // Handle back navigation with loading
  const handleBack = () => {
    startLoading('Loading...');
    navigate('/sectors');
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-red-600 selection:text-white ${
      isDark ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      
      {/* Hero Section with Sector Background */}
      <section className="relative h-[50vh] overflow-hidden">
        {/* Background Image - Placeholder for sector-specific image */}
        <div className={`absolute inset-0 bg-gradient-to-br ${sector.theme}`}>
          <div className="absolute inset-0 bg-black/40" />
          {/* Optional: Add actual sector background image here */}
          {/* <img 
            src={sector.backgroundImage} 
            alt={`${decodedKey} background`}
            className="w-full h-full object-cover"
          /> */}
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12">
          {/* Back Navigation */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className={`flex items-center gap-2 text-sm font-medium mb-8 transition-colors ${
              isDark ? 'text-gray-300 hover:text-white' : 'text-gray-200 hover:text-white'
            }`}
          >
            <ArrowLeft size={18} />
            <span>Back to Overview</span>
          </motion.button>

          {/* Sector Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-2">
              {sector.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium">
              {sector.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Leader Info */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`sticky top-24 space-y-6`}
            >
              {/* Sector Leader Card */}
              <div className={`p-8 rounded-3xl ${
                isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-gray-50 border border-gray-100'
              }`}>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Sector Leader
                </h3>
                
                {/* Leader Photo - Placeholder */}
                <div className="relative mb-6">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img 
                      src={sector.leader.image} 
                      alt={sector.leader.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face";
                      }}
                    />
                  </div>
                  {/* Decorative border */}
                  <div className={`absolute -inset-2 rounded-2xl -z-10 bg-gradient-to-br ${sector.theme} opacity-30 blur-xl`} />
                </div>

                {/* Leader Name & Role */}
                <h4 className={`text-2xl font-bold mb-1 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {sector.leader.name}
                </h4>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-red-500' : 'text-red-600'
                }`}>
                  {sector.leader.role}
                </p>

                {/* Contact Placeholder - Add real contact info later */}
                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-zinc-800' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      leader@agi.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className={`p-8 rounded-3xl ${
                isDark ? 'bg-white text-black' : 'bg-black text-white'
              }`}>
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <span className="w-2 h-8 rounded-full bg-red-600" />
                  Sector Statistics
                </h3>
                <div className="space-y-6">
                  <Stat 
                    icon={<Users size={18} />} 
                    label="Total Members" 
                    value={sector.stats.members} 
                    isDark={isDark} 
                  />
                  <Stat 
                    icon={<BarChart3 size={18} />} 
                    label="GDP Contribution" 
                    value={sector.stats.gdp} 
                    isDark={isDark} 
                  />
                  <Stat 
                    icon={<TrendingUp size={18} />} 
                    label="Export Growth" 
                    value={sector.stats.growth} 
                    isRed 
                    isDark={isDark} 
                  />
                  <Stat 
                    icon={<Globe size={18} />} 
                    label="Active Sub-Sectors" 
                    value={sector.stats.active} 
                    isDark={isDark} 
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-12"
            >
              {/* About Section */}
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  About This Sector
                </h2>
                <p className={`text-lg leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {sector.description}
                </p>
              </div>

              {/* Benefits Section */}
              <div className={`p-8 rounded-3xl border ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800' 
                  : 'bg-gray-50 border-gray-100'
              }`}>
                <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  <CheckCircle2 className={isDark ? 'text-red-500' : 'text-red-600'} size={28} />
                  Member Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sector.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`flex items-start gap-3 p-4 rounded-xl ${
                        isDark ? 'bg-black/30' : 'bg-white'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        isDark ? 'bg-red-500' : 'bg-red-600'
                      }`} />
                      <span className={`font-medium ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-4 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${
                    isDark 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  <Users size={20} />
                  Join This Sector
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    isDark 
                      ? 'bg-transparent border-2 border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white' 
                      : 'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black'
                  }`}
                >
                  <ArrowLeft size={20} />
                  View All Sectors
                </motion.button>
              </div>

              {/* Additional Info Placeholder */}
              <div className={`p-6 rounded-2xl ${
                isDark ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-gray-50 border border-gray-100'
              }`}>
                <h4 className={`font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Upcoming Events
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  No upcoming events at this time. Check back soon for sector-specific workshops and seminars.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Stat component for displaying statistics
const Stat = ({ icon, label, value, isRed, isDark }) => (
  <div className={`flex justify-between items-center ${
    isDark ? 'border-white/10' : 'border-black/10'
  } border-b pb-4`}>
    <div className="flex items-center gap-3">
      <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
        {icon}
      </span>
      <span className={`text-sm font-bold uppercase tracking-widest ${
        isDark ? 'text-zinc-500' : 'text-zinc-500'
      }`}>
        {label}
      </span>
    </div>
    <span className={`text-2xl font-black ${
      isRed 
        ? (isDark ? 'text-red-500' : 'text-red-600') 
        : (isDark ? 'text-white' : 'text-black')
    }`}>
      {value}
    </span>
  </div>
);

export default SingleSectorPage;