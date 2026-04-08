/**
 * SectorsPage Component
 * 
 * Displays all 24 industry sectors with their leaders.
 * Users can filter and search for sectors, then click to view details.
 * 
 * @route /sectors - Overview of all sectors
 * @accessibility ARIA landmarks, keyboard navigation, proper headings
 * 
 * Data source: src/data/sectorsData.jsx
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { sectorsData } from '../data/sectorsData';
import { Search, ArrowRight } from 'lucide-react';

const SectorsPage = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const { startLoading } = useLoading();
    
    const [searchQuery, setSearchQuery] = useState('');

    // Filter sectors based on search query
    const filteredSectors = useMemo(() => {
        return Object.keys(sectorsData).filter(key =>
            key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sectorsData[key].description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sectorsData[key].leader.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Navigate to individual sector page
    const handleSectorClick = (sectorKey) => {
        startLoading('Loading sector...');
        navigate(`/sectors/${encodeURIComponent(sectorKey)}`);
    };

    return (
        <div className={`min-h-screen font-sans selection:bg-red-600 selection:text-white ${
            isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}>
            {/* Header Section */}
            <section className={`py-16 px-6 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div>
                            <span className={`font-bold uppercase tracking-widest text-xs block ${isDark ? 'text-red-500' : 'text-red-600'}`}>Industry Innovation</span>
                            <h1 className="text-5xl md:text-6xl font-black leading-tight text-white">Our Industrial <br /><span className={isDark ? 'text-red-500' : 'text-red-600'}>Sectors</span></h1>
                            <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-300'}`}>
                                Explore {Object.keys(sectorsData).length} industry sectors driving Ghana's economy
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search sectors, leaders..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border backdrop-blur-md rounded-full py-3 pl-12 pr-4 transition-all outline-none bg-white/10 border-white/20 text-white placeholder-gray-500 focus:bg-white focus:text-black"
                                aria-label="Search sectors"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sectors Grid with Filter */}
            <section className={`py-12 px-6 ${isDark ? 'bg-black' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto">
                    {/* Results count */}
                    <div className="mb-8">
                        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            Showing {filteredSectors.length} of {Object.keys(sectorsData).length} sectors
                            {searchQuery && ` for "${searchQuery}"`}
                        </p>
                    </div>

                    {/* Sectors Grid */}
                    {filteredSectors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredSectors.map((key, index) => (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    onClick={() => handleSectorClick(key)}
                                    className={`p-6 rounded-2xl border transition-all cursor-pointer group shadow-sm hover:shadow-xl ${
                                        isDark 
                                            ? 'bg-zinc-900/50 border-zinc-800 hover:border-red-500' 
                                            : 'bg-gray-50 border-gray-200 hover:border-red-600'
                                    }`}
                                >
                                    {/* Sector Icon */}
                                    <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${sectorsData[key].theme} text-white`}>
                                        {sectorsData[key].icon}
                                    </div>
                                    
                                    {/* Sector Name */}
                                    <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {key}
                                    </h3>
                                    
                                    {/* Leader Info */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <img 
                                            src={sectorsData[key].leader.image} 
                                            alt={sectorsData[key].leader.name}
                                            className="w-9 h-9 rounded-full object-cover border-2 border-transparent group-hover:border-red-500"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
                                            }}
                                        />
                                        <div>
                                            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {sectorsData[key].leader.name}
                                            </p>
                                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                                {sectorsData[key].leader.role}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Brief description */}
                                    <p className={`text-sm line-clamp-2 mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {sectorsData[key].description}
                                    </p>

                                    {/* Stats */}
                                    <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                        <span>{sectorsData[key].stats.members} members</span>
                                        <span className={isDark ? 'text-red-500' : 'text-red-600'}>{sectorsData[key].stats.gdp} GDP</span>
                                    </div>
                                    
                                    {/* View indicator */}
                                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-zinc-800' : 'border-gray-200'} flex items-center justify-between`}>
                                        <span className={`text-xs font-medium ${isDark ? 'text-gray-500 group-hover:text-red-500' : 'text-gray-400 group-hover:text-red-600'}`}>
                                            View details
                                        </span>
                                        <ArrowRight size={14} className={`${isDark ? 'text-gray-600 group-hover:text-red-500' : 'text-gray-400 group-hover:text-red-600'} group-hover:translate-x-1 transition-transform`} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        /* No results */
                        <div className="text-center py-20">
                            <p className={`text-xl font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                No sectors found for "{searchQuery}"
                            </p>
                            <button 
                                onClick={() => setSearchQuery('')}
                                className={`mt-4 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                    isDark ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'
                                }`}
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SectorsPage;