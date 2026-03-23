import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, ChevronRight, Users } from 'lucide-react';

const executives = [
    { id: 1, name: "Dr. Humphrey Ayim-Darke", role: "PRESIDENT", category: "Executive", tags: ["Executive", "National"] },
    { id: 2, name: "Mrs. Elizabeth Arhin", role: "NATIONAL TREASURER", category: "Finance", tags: ["Finance"] },
    { id: 3, name: "Seth Twum-Akwaboah", role: "CHIEF EXECUTIVE OFFICER", category: "Management", tags: ["Management"] },
    { id: 4, name: "Mr. Tsonam Akpeloo", role: "ACCRA REGIONAL CHAIRMAN", category: "Technology", tags: ["Regional", "Technology"] },
    { id: 5, name: "Nana Akua Asantewaa", role: "VP (LARGE SCALE)", category: "Industry", tags: ["Industry"] },
    { id: 6, name: "Mr. Kwabena Asante-Poku", role: "VICE PRESIDENT (SME)", category: "Advocacy", tags: ["SME Advocacy"] },
    { id: 7, name: "Dr. Nora Bannerman", role: "CHAIRPERSON (GARMENTS)", category: "Sectoral", tags: ["Sectoral"] },
    { id: 8, name: "Mr. J.N.B. Tetteh", role: "REGIONAL CHAIRMAN", category: "Governance", tags: ["Governance"] },
];

const ExecutivesPage = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(executives.map(ex => ex.category))];

    const filteredExecutives = filter === 'All'
        ? executives
        : executives.filter(ex => ex.category === filter);

    return (
        <div className="bg-white text-black min-h-screen font-sans selection:bg-orange-500 selection:text-white">

            {/* Breadcrumb & Header */}
            <header className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <nav className="text-sm text-gray-400 flex items-center gap-2 mb-8">
                    <span className="hover:text-orange-600 cursor-pointer">Home</span>
                    <ChevronRight size={14} />
                    <span className="text-orange-600 font-medium">Our Leadership</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="flex-1">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
                        >
                            Our <span className="text-orange-600">Leadership</span>
                            <div className="w-24 h-2 bg-orange-600 mt-4" />
                        </motion.h1>
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-600 text-lg leading-relaxed border-l-2 border-gray-100 pl-8">
                            The Association of Ghana Industries is guided by a team of visionary leaders dedicated to driving industrial growth, advocacy, and economic innovation across the nation. Our executives bring decades of cross-sector expertise to the forefront of Ghana's industrial revolution.
                        </p>
                    </div>
                </div>
            </header>

            {/* Smart Filter Bar */}
            <section className="sticky top-14 md:top-16 z-20 bg-white/80 backdrop-blur-md border-y border-gray-100 py-3 mb-12">
                <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === cat
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid Section */}
            <section className="px-6 max-w-7xl mx-auto pb-24">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredExecutives.map((exec) => (
                            <ExecutiveCard key={exec.id} exec={exec} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* Call to Action Footer */}
            <section className="px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto bg-orange-600 rounded-3xl p-12 md:p-20 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                        <Users size={300} strokeWidth={1} />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Partner with Ghana's Industrial Leaders
                            </h2>
                            <p className="text-orange-100 text-xl">
                                Connect with our executive team to explore strategic opportunities for industrial growth and partnership.
                            </p>
                        </div>
                        <button className="bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-black hover:text-white transition-all shadow-xl hover:shadow-2xl active:scale-95">
                            Contact the Secretariat
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

const ExecutiveCard = ({ exec }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="group"
    >
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-6 rounded-sm">
            <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${exec.name}`} // Placeholder image logic
                alt={exec.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-center gap-4">
                <button className="bg-white p-2 rounded-full text-black hover:bg-orange-600 hover:text-white transition-colors"><Linkedin size={18} /></button>
                <button className="bg-white p-2 rounded-full text-black hover:bg-orange-600 hover:text-white transition-colors"><Mail size={18} /></button>
            </div>
        </div>

        <div className="space-y-1">
            <h3 className="font-bold text-xl group-hover:text-orange-600 transition-colors">{exec.name}</h3>
            <p className="text-xs font-black text-orange-600 uppercase tracking-widest">{exec.role}</p>

            <div className="flex gap-2 pt-3">
                {exec.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50 px-2 py-0.5 border border-gray-100">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

export default ExecutivesPage;