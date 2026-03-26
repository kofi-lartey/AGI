import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    Factory, Sprout, Zap, Monitor, HardHat, Landmark,
    Palmtree, CheckCircle2, TrendingUp, Globe, FileText,
    ArrowRight, Search, Info
} from 'lucide-react';

const sectorsData = {
    Manufacturing: {
        title: "The Manufacturing Engine",
        subtitle: "Empowering Industrial Growth",
        icon: <Factory size={48} />,
        theme: "from-teal-600 to-emerald-800",
        description: "The Manufacturing sector is a cornerstone of AGI. We represent a diverse range of industries from food processing to heavy industrial machinery, advocating for energy efficiency and competitive trade practices.",
        stats: { members: "1,200+", gdp: "11.5%", growth: "+8.4%", active: "14" },
        benefits: ["Quarterly industrial surveys", "Trade delegation invitations", "ISO certification support", "Regulatory advocacy"]
    },
    "Agri-Business": {
        title: "Feeding the Nation",
        subtitle: "Modernizing Agriculture",
        icon: <Sprout size={48} />,
        theme: "from-orange-500 to-red-700",
        description: "Modernizing agriculture through processing and value addition. We support members in scaling from primary production to global export-ready industrial processing.",
        stats: { members: "950+", gdp: "18.2%", growth: "+5.1%", active: "8" },
        benefits: ["Market linkage programs", "Land tenure advocacy", "Value-chain optimization", "Export financing info"]
    },
    "Energy & Oil": {
        title: "Powering Industry",
        subtitle: "Sustainable Energy Solutions",
        icon: <Zap size={48} />,
        theme: "from-yellow-500 to-orange-600",
        description: "Focused on ensuring stable and affordable power for industrial growth while leading the transition to sustainable and renewable energy sources for Ghanaian factories.",
        stats: { members: "300+", gdp: "7.4%", growth: "+12.1%", active: "5" },
        benefits: ["Utility pricing negotiation", "Renewable energy grants", "Technical policy workshops", "Efficiency auditing"]
    },
    "IT & Digital": {
        title: "Digital Transformation",
        subtitle: "The Tech Revolution",
        icon: <Monitor size={48} />,
        theme: "from-blue-600 to-indigo-800",
        description: "Leading Ghana's digital industrial revolution. We support tech startups and established firms in software development, AI integration, and digital infrastructure.",
        stats: { members: "450+", gdp: "4.8%", growth: "+15.6%", active: "10" },
        benefits: ["Tech hub networking", "Software export support", "Cybersecurity frameworks", "Innovation grants access"]
    },
    "Construction": {
        title: "Building the Future",
        subtitle: "Sustainable Infrastructure",
        icon: <HardHat size={48} />,
        theme: "from-zinc-600 to-black",
        description: "Representing the builders of Ghana. From residential developers to industrial infrastructure specialists, we advocate for local content and quality standards.",
        stats: { members: "500+", gdp: "9.1%", growth: "+6.8%", active: "7" },
        benefits: ["Local content advocacy", "Standardized procurement", "Safety certification training", "Project bidding alerts"]
    },
    "Financial Services": {
        title: "Capital for Growth",
        subtitle: "Fiscal Advisory & Support",
        icon: <Landmark size={48} />,
        theme: "from-red-800 to-black",
        description: "Bridging the gap between industry and finance. We work with banks and fintechs to create tailored financial products for Ghanaian manufacturers.",
        stats: { members: "150+", gdp: "5.2%", growth: "+4.2%", active: "4" },
        benefits: ["SME loan facilitation", "Investment matchmaking", "Tax policy advocacy", "Financial literacy programs"]
    },
    "Hospitality": {
        title: "Premium Service",
        subtitle: "Tourism & Leisure Industry",
        icon: <Palmtree size={48} />,
        theme: "from-orange-400 to-orange-700",
        description: "Promoting excellence in Ghana's service sector. We represent hotels, resorts, and tourism service providers in creating a world-class hospitality environment.",
        stats: { members: "400+", gdp: "6.5%", growth: "+9.2%", active: "6" },
        benefits: ["Tourism policy advocacy", "Service quality training", "International marketing", "Regulatory compliance support"]
    }
};

const SectorsPage = () => {
    const { isDark } = useTheme();
    const [activeSector, setActiveSector] = useState('Manufacturing');
    const [searchQuery, setSearchQuery] = useState('');

    const data = sectorsData[activeSector];

    const filteredSectorKeys = useMemo(() =>
        Object.keys(sectorsData).filter(key =>
            key.toLowerCase().includes(searchQuery.toLowerCase())
        ), [searchQuery]
    );

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

            {/* Grid of Other Sectors */}
            <section className={`py-24 px-6 ${isDark ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Other Strategic Sectors</h2>
                            <p className={`mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Discover more industries we represent</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.keys(sectorsData).map(key => (
                            <div
                                key={key}
                                onClick={() => { setActiveSector(key); window.scrollTo({ top: 450, behavior: 'smooth' }); }}
                                className={`p-8 rounded-2xl border transition-all cursor-pointer group shadow-sm hover:shadow-xl ${
                                    isDark 
                                        ? 'bg-black border-transparent hover:border-red-500' 
                                        : 'bg-white border-transparent hover:border-red-600'
                                }`}
                            >
                                <div className={`mb-6 group-hover:scale-110 transition-transform ${isDark ? 'text-red-500' : 'text-red-600'}`}>{sectorsData[key].icon}</div>
                                <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{key}</h4>
                                <p className={`text-sm line-clamp-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{sectorsData[key].description}</p>
                            </div>
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