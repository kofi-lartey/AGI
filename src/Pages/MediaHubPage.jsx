import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Image as ImageIcon, Calendar, MapPin,
    ChevronDown, Search, ArrowRight, ExternalLink
} from 'lucide-react';

const MediaHubPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Events', 'Industrial Tours', 'Press Conferences', 'Videos'];

    const mediaItems = [
        {
            id: 1,
            type: 'Featured',
            title: 'AGI Annual General Meeting 2024',
            description: 'Strategic discussions on the future of Ghana\'s industrial sector and policy advocacy.',
            date: 'Oct 12, 2024',
            location: 'Accra, Ghana',
            category: 'Events',
            size: 'large',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80'
        },
        {
            id: 2,
            type: 'Video',
            title: 'The Rise of Local Manufacturing',
            category: 'Videos',
            size: 'small',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80'
        },
        {
            id: 3,
            type: 'Gallery',
            title: 'Factory Inspection Tour',
            category: 'Industrial Tours',
            size: 'medium',
            image: 'https://images.unsplash.com/photo-1565608411388-4bb304df2487?auto=format&fit=crop&q=80'
        },
        {
            id: 4,
            type: 'Gallery',
            title: 'Industrial Awards Highlights',
            category: 'Events',
            size: 'small',
            isVideo: true,
            image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80'
        },
        {
            id: 5,
            type: 'Gallery',
            title: 'New Infrastructure Blueprint',
            category: 'Press Conferences',
            size: 'medium',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80'
        }
    ];

    const filteredItems = activeFilter === 'All'
        ? mediaItems
        : mediaItems.filter(item => item.category === activeFilter);

    return (
        <div className="bg-[#fcf9f6] min-h-screen font-sans selection:bg-orange-600 selection:text-white">

            {/* Hero Section */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"
                        className="w-full h-full object-cover opacity-50"
                        alt="Media Hub Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#fcf9f6]" />
                </div>

                <motion.div
                    className="relative z-10 text-center px-6 max-w-4xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="bg-orange-600/20 text-orange-500 border border-orange-500/30 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 mt-12 inline-block">
                        Our Archives
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Media <span className="text-orange-600">Hub</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Chronicling the progress and evolution of Ghana's industrial landscape with excellence,
                        documented through high-impact visual storytelling.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 transition-all">
                            <ImageIcon size={20} /> Explore Gallery
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold flex items-center gap-3 transition-all">
                            <Play size={20} fill="currentColor" /> Latest Videos
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Filter & Sort Bar */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-6 md:-mt-8 relative z-20 scroll-mt-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeFilter === filter
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                        <span>Sort by:</span>
                        <button className="flex items-center gap-2 text-black group">
                            Newest First <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Media Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 scroll-mt-16">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-12 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className={`relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 ${item.size === 'large' ? 'md:col-span-8 md:row-span-2 aspect-video md:aspect-auto' :
                                        item.size === 'medium' ? 'md:col-span-4 aspect-square' : 'md:col-span-4 aspect-[4/3]'
                                    }`}
                            >
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    {item.type === 'Featured' && (
                                        <span className="bg-orange-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded w-fit mb-4">
                                            Featured Event
                                        </span>
                                    )}
                                    {item.type === 'Video' && (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
                                            <Play size={24} fill="currentColor" />
                                        </div>
                                    )}
                                    {item.isVideo && (
                                        <div className="mb-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                                            <Play size={16} fill="currentColor" />
                                        </div>
                                    )}

                                    <h3 className={`font-bold text-white group-hover:text-orange-400 transition-colors ${item.size === 'large' ? 'text-3xl mb-4' : 'text-xl mb-1'}`}>
                                        {item.title}
                                    </h3>

                                    {item.description && <p className="text-gray-300 text-sm max-w-lg mb-6 line-clamp-2">{item.description}</p>}

                                    {(item.date || item.location) && (
                                        <div className="flex gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            {item.date && <span className="flex items-center gap-2"><Calendar size={14} /> {item.date}</span>}
                                            {item.location && <span className="flex items-center gap-2"><MapPin size={14} /> {item.location}</span>}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-16 text-center">
                    <button className="bg-white border border-gray-200 px-10 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-3 mx-auto group">
                        Load More Content <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-[#f5e6d3] py-16 md:py-24 px-4 md:px-6 mt-8 md:mt-12 scroll-mt-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Stay Industrialized</h2>
                    <p className="text-gray-600 mb-10">Get the latest industry news, media updates, and policy alerts delivered directly to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white border border-gray-200 p-5 rounded-xl outline-none focus:ring-2 focus:ring-orange-600 transition-all shadow-sm"
                        />
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-xl font-bold shadow-lg shadow-orange-600/30 transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MediaHubPage;