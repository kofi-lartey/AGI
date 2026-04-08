/**
 * SectorsPage Component
 * 
 * Displays all 24 industry sectors with their leaders.
 * Each sector can be clicked to view detailed Single Sector page.
 * 
 * @route /sectors - Overview of all sectors
 * @accessibility ARIA landmarks, keyboard navigation, proper headings
 * 
 * Data source: src/data/sectorsData.js
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import { sectorsData } from '../data/sectorsData';
import {
    CheckCircle2, Search, ArrowRight, FileText
} from 'lucide-react';

// Create lookup for key to display name (Manufacturing stays as is, others formatted)
const getSectorKey = (name) => name;

// SectorsPage Component
const SectorsPage = () => {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const { startLoading } = useLoading();
    
    // Default to first sector (Manufacturing) when no selection
    const [activeSector, setActiveSector] = useState('Manufacturing');
    const [searchQuery, setSearchQuery] = useState('');

    // Get active sector data
    const data = sectorsData[activeSector];

    // Filter sectors based on search
    const filteredSectorKeys = useMemo(() =>
        Object.keys(sectorsData).filter(key =>
            key.toLowerCase().includes(searchQuery.toLowerCase())
        ), [searchQuery]
    );

    // Navigate to individual sector page
    const handleSectorClick = (sectorKey) => {
        startLoading('Loading sector...');
        // Navigate to the single sector page
        navigate(`/sectors/${encodeURIComponent(sectorKey)}`);
    };

    // Handle clicking on sector from the grid to make it active
    const handleSectorSelect = (key) => {
        setActiveSector(key);
        window.scrollTo({ top: 450, behavior: 'smooth' });
    };

    return (
        <div className={`min-h-screen font-sans selection:bg-red-600 selection:text-white ${
            isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}>

            {/* Search & Header Section */}
            <section className={`relative h-[45vh] flex items-center overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]'}`}>
                {/* <div className="absolute inset-0 opacity-40">
                    <img src="https://images.unsplash.com/photo-1541888941259-7b9d9ef990ed?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Industrial" />
                </div> */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-xl">
                        <span className={`font-bold uppercase tracking-widest text-xs   block ${isDark ? 'text-red-500' : 'text-red-600'}`}>Industry Innovation</span>
                        <h1 className={`text-6xl font-black leading-tight ${isDark ? 'text-white' : 'text-white'}`}>Our Industrial <br /><span className={isDark ? 'text-red-500' : 'text-red-600'}>Sectors</span></h1>
                    </div>

                    {/* Smart Search Bar */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search sectors..."
                            className={`w-full border backdrop-blur-md rounded-full py-3 pl-12 pr-4 transition-all outline-none ${
                                isDark 
                                    ? 'bg-white/10 border-white/20 text-white focus:bg-white focus:text-black' 
                                    : 'bg-white/10 border-white/20 text-white focus:bg-white focus:text-black'
                            }`}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Dynamic Tab Navigation */}
            <nav className={`sticky top-14 md:top-16 z-30 shadow-sm ${
                isDark ? 'bg-black border-b border-gray-800' : 'bg-white border-b border-gray-100'
            }`}>
                <div className="max-w-7xl mx-auto px-6 py-1 flex gap-8 overflow-x-auto no-scrollbar">
                    {filteredSectorKeys.map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveSector(key)}
                            className={`py-5 text-sm font-bold transition-all whitespace-nowrap relative ${activeSector === key 
                                ? isDark ? 'text-red-500' : 'text-red-600' 
                                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-black'
                                }`}
                        >
                            {key}
                            {activeSector === key && (
                                <motion.div layoutId="tabLine" className={`absolute bottom-0 left-0 right-0 h-1 ${isDark ? 'bg-red-500' : 'bg-red-600'}`} />
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Sector Content */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSector}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-12"
                            >
                                <div className={`aspect-video rounded-3xl bg-gradient-to-br ${data.theme} flex items-center justify-center text-white shadow-2xl relative overflow-hidden group`}>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    <div className="text-center relative z-10">
                                        <div className="mb-4 flex justify-center opacity-80">{data.icon}</div>
                                        <h2 className="text-4xl md:text-5xl font-black">{data.title}</h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{data.subtitle}</h3>
                                        <p className={`leading-relaxed text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{data.description}</p>
                                        <div className="flex gap-4">
                                            <button className={`px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 group ${
                                                isDark 
                                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                                    : 'bg-red-600 text-white hover:bg-black'
                                            }`}>
                                                Join This Sector <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className={`p-8 rounded-3xl border ${
                                        isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-100'
                                    }`}>
                                        <h4 className={`font-bold mb-6 flex items-center gap-2 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            <CheckCircle2 className={isDark ? 'text-red-500' : 'text-red-600'} size={20} /> Member Benefits
                                        </h4>
                                        <ul className="space-y-4">
                                            {data.benefits.map((b, i) => (
                                                <li key={i} className={`flex gap-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${isDark ? 'bg-red-500' : 'bg-red-600'}`} />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            <div className={`p-10 rounded-[2rem] shadow-xl ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                <h3 className={`text-xl font-bold mb-10 flex items-center gap-2 ${isDark ? 'text-black' : 'text-white'}`}>
                                    <span className={`w-2 h-8 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-600'}`} /> Sector Statistics
                                </h3>
                                <div className="space-y-10">
                                    <Stat label="Total Members" val={data.stats.members} isDark={isDark} />
                                    <Stat label="Contribution to GDP" val={data.stats.gdp} isDark={isDark} />
                                    <Stat label="Export Growth" val={data.stats.growth} isRed isDark={isDark} />
                                    <Stat label="Active Sub-Sectors" val={data.stats.active} isDark={isDark} />
                                </div>
                            </div>

                            <button className={`w-full border-2 p-6 rounded-[2rem] flex items-center justify-between group transition-colors ${
                                isDark 
                                    ? 'border-gray-800 hover:border-red-500' 
                                    : 'border-zinc-100 hover:border-red-600'
                            }`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl transition-colors ${isDark ? 'bg-gray-800 text-gray-400 group-hover:bg-red-900 group-hover:text-red-500' : 'bg-zinc-100 text-zinc-500 group-hover:bg-red-50 group-hover:text-red-600'}`}><FileText /></div>
                                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Sector Report 2026</span>
                                </div>
                                <ArrowRight className={`transition-colors ${isDark ? 'text-gray-600 group-hover:text-red-500' : 'text-zinc-300 group-hover:text-red-600'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid of Other Sectors - Now shows ALL 24 sectors with leaders */}
            <section className={`py-24 px-6 ${isDark ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>All Industry Sectors</h2>
                            <p className={`mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Click any sector to view details and leader information</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Object.keys(sectorsData).map(key => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                onClick={() => handleSectorClick(key)}
                                className={`p-6 rounded-2xl border transition-all cursor-pointer group shadow-sm hover:shadow-xl ${
                                    isDark 
                                        ? 'bg-black border-transparent hover:border-red-500' 
                                        : 'bg-white border-transparent hover:border-red-600'
                                }`}
                            >
                                {/* Sector Icon */}
                                <div className={`mb-4 group-hover:scale-110 transition-transform ${isDark ? 'text-red-500' : 'text-red-600'}`}>
                                    {sectorsData[key].icon}
                                </div>
                                
                                {/* Sector Name */}
                                <h4 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {key}
                                </h4>
                                
                                {/* Leader Info - Show leader name and photo */}
                                <div className="flex items-center gap-3 mb-3">
                                    <img 
                                        src={sectorsData[key].leader.image} 
                                        alt={sectorsData[key].leader.name}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-red-500"
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
                                <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                    {sectorsData[key].description}
                                </p>
                                
                                {/* View Details indicator */}
                                <div className={`mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                                    isDark ? 'text-red-500' : 'text-red-600'
                                }`}>
                                    <span>Click to view</span>
                                    <ArrowRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const Stat = ({ label, val, isRed, isDark }) => (
    <div className={`flex justify-between items-center border-b pb-4 ${isDark ? 'border-white/10' : 'border-white/10'}`}>
        <span className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{label}</span>
        <span className={`text-2xl font-black ${isRed ? (isDark ? 'text-red-500' : 'text-red-600') : (isDark ? 'text-white' : 'text-white')}`}>{val}</span>
    </div>
);

export default SectorsPage;