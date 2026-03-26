import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Image as ImageIcon, Calendar, MapPin,
    ChevronDown, X, ExternalLink, Eye
} from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import RefreshButton from '../Componets/RefreshButton';
import PullToRefresh from '../Componets/PullToRefresh';

const MediaHubPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedMedia, setSelectedMedia] = useState(null);
    const { mediaAssets, loading, error, refreshMedia } = useMedia();

    const filters = ['All', 'Events', 'Industrial Tours', 'Press Conferences', 'Videos'];

    const filteredItems = activeFilter === 'All'
        ? mediaAssets
        : mediaAssets.filter(item => item.category === activeFilter);

    return (
        <PullToRefresh onRefresh={refreshMedia}>
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

                        {/* Refresh Button */}
                        <div className="mt-6">
                            <RefreshButton onRefresh={refreshMedia} label="Refresh Media" size="sm" />
                        </div>

                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <button
                                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 transition-all"
                            >
                                <ImageIcon size={20} /> Explore Gallery
                            </button>
                            <button
                                onClick={() => { setActiveFilter('Videos'); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); }}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-lg font-bold flex items-center gap-3 transition-all"
                            >
                                <Play size={20} fill="currentColor" /> Latest Videos
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* Filter Section */}
                <section className="py-8 px-4 md:px-6 mt-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap justify-center gap-3">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeFilter === filter
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                                        : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Media Grid Section */}
                <section id="gallery" className="px-4 md:px-6 pb-16">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                                <p className="mt-4 text-gray-500">Loading media...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <p className="text-red-500">Error loading media: {error}</p>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No media found. Add some content from the admin dashboard.</p>
                            </div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <AnimatePresence>
                                    {filteredItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                                            onClick={() => setSelectedMedia(item)}
                                        >
                                            <img
                                                src={item.image || item.url}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {item.isVideo && (
                                                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                                                    <Play size={12} fill="currentColor" /> Video
                                                </div>
                                            )}

                                            {/* Click indicator */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-orange-600/90 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                                                    <Eye size={18} /> View Details
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2 block">
                                                    {item.category || item.type}
                                                </span>
                                                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                                                {item.description && (
                                                    <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
                                                )}
                                                <div className="flex items-center gap-4 mt-3 text-gray-400 text-xs">
                                                    {item.date && <span className="flex items-center gap-2"><Calendar size={14} /> {item.date}</span>}
                                                    {item.location && <span className="flex items-center gap-2"><MapPin size={14} /> {item.location}</span>}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {filteredItems.length > 0 && (
                            <div className="mt-16 text-center">
                                <button className="bg-white border border-gray-200 px-10 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-3 mx-auto group">
                                    Load More Content <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Media Detail Modal */}
                <AnimatePresence>
                    {selectedMedia && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedMedia(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedMedia(null)}
                                    className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                {/* Media Content */}
                                <div className="relative">
                                    <img
                                        src={selectedMedia.image || selectedMedia.url}
                                        alt={selectedMedia.title}
                                        className="w-full aspect-video object-cover"
                                    />
                                    {selectedMedia.isVideo && selectedMedia.embedUrl && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                            <a
                                                href={selectedMedia.videoUrl || selectedMedia.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2"
                                            >
                                                <Play size={20} fill="currentColor" /> Watch Video
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="p-8">
                                    <span className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-2 block">
                                        {selectedMedia.category || selectedMedia.mediaType}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                                        {selectedMedia.title}
                                    </h2>

                                    {selectedMedia.description && (
                                        <p className="text-gray-600 text-lg mb-6">
                                            {selectedMedia.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-6 text-gray-500">
                                        {selectedMedia.date && (
                                            <div className="flex items-center gap-2">
                                                <Calendar size={18} />
                                                <span>{selectedMedia.date}</span>
                                            </div>
                                        )}
                                        {selectedMedia.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin size={18} />
                                                <span>{selectedMedia.location}</span>
                                            </div>
                                        )}
                                        {selectedMedia.size && (
                                            <div className="flex items-center gap-2">
                                                <ImageIcon size={18} />
                                                <span>{selectedMedia.size}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* External Link if available */}
                                    {selectedMedia.url && !selectedMedia.isVideo && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <a
                                                href={selectedMedia.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:underline"
                                            >
                                                View Full Image <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
        </PullToRefresh>
    );
};

export default MediaHubPage;