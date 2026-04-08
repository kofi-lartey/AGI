import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, ChevronRight, Users, MapPin, Facebook, Twitter, Globe, ChevronDown, Phone, Instagram } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const socialLinks = {
    facebook: "https://facebook.com/aghig",
    linkedin: "https://linkedin.com/company/association-of-ghana-industries",
    twitter: "https://twitter.com/AGI_Ghana",
    instagram: "https://instagram.com/aghig",
    website: "https://agi.org.gh",
    email: "info@agi.org.gh"
};

const allRegionsData = {
    "Accra": [
        { id: 1, name: "Mr. Tsonam Akpeloo", role: "Regional Chair", image: "https://res.cloudinary.com/djjgkezui/image/upload/q_auto/f_auto/v1775676037/Mr-Tsoname_guig13.jpg", facebook: "#", linkedin: "#", twitter: "#", website: "#", phone: "", email: "" },
        { id: 2, name: "Maureen Erekua Odoi", role: "Executive Vice-Chair", image: "https://res.cloudinary.com/djjgkezui/image/upload/q_auto/f_auto/v1775676037/Maureen_hhrkqg.jpg", facebook: "#", linkedin: "#", twitter: "#", website: "#", phone: "", email: "" },
        { id: 3, name: "Mr. Francis Yawson", role: "Executive Member", image: "https://res.cloudinary.com/djjgkezui/image/upload/q_auto/f_auto/v1775676037/Francis_pbkjir.png", facebook: "#", linkedin: "#", twitter: "#", website: "#", phone: "", email: "" },
        { id: 4, name: "Sally Torpey", role: "Treasurer", image: "https://res.cloudinary.com/djjgkezui/image/upload/q_auto/f_auto/v1775676037/sally_vcflyz.jpg", facebook: "#", linkedin: "#", twitter: "#", website: "#", phone: "", email: "" },
        { id: 5, name: "Philomena Asante", role: "Executive Member", image: "https://res.cloudinary.com/djjgkezui/image/upload/q_auto/f_auto/v1775676037/Philomina_yhxev6.jpg", facebook: "#", linkedin: "#", twitter: "#", website: "#", phone: "", email: "" },
    ],
    "Ashanti": [
        { id: 11, name: "Dr. Kwame Asante", role: "Regional Chair", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame", facebook: "#", linkedin: "#", twitter: "#", website: "#" },
        { id: 12, name: "Mrs. Abena Mensah", role: "Vice Chair", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abena", facebook: "#", linkedin: "#", twitter: "#", website: "#" },
        { id: 13, name: "Mr. Kofi Osei", role: "Treasurer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=KofiO", facebook: "#", linkedin: "#", twitter: "#", website: "#" },
    ],
    "Western": [
        { id: 21, name: "Mr. Emmanuel Nana", role: "Regional Chair", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel", facebook: "#", linkedin: "#", twitter: "#", website: "#" },
        { id: 22, name: "Mrs. Comfort Akoto", role: "Vice Chair", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Comfort", facebook: "#", linkedin: "#", twitter: "#", website: "#" },
    ],
    "Volta": [
        { id: 31, name: "Mr. Hornam Dogbatse", role: "Regional Chair", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hornam", facebook: "#", linkedin: "#", twitter: "#", website: "#" },
    ]
};

const nationalLeaders = [
    { id: 101, name: "Dr. Humphrey Ayim-Darke", role: "PRESIDENT", category: "Executive", tags: ["Executive", "National"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Humphrey" },
    { id: 102, name: "Mrs. Elizabeth Arhin", role: "NATIONAL TREASURER", category: "Finance", tags: ["Finance"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth" },
    { id: 103, name: "Seth Twum-Akwaboah", role: "CHIEF EXECUTIVE OFFICER", category: "Management", tags: ["Management"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Seth" },
    { id: 104, name: "Nana Akua Asantewaa", role: "VP (LARGE SCALE)", category: "Industry", tags: ["Industry"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Asantewaa" },
    { id: 105, name: "Mr. Kwabena Asante-Poku", role: "VICE PRESIDENT (SME)", category: "Advocacy", tags: ["SME Advocacy"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwabena" },
    { id: 106, name: "Dr. Nora Bannerman", role: "CHAIRPERSON (GARMENTS)", category: "Sectoral", tags: ["Sectoral"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nora" },
    { id: 107, name: "Mr. J.N.B. Tetteh", role: "REGIONAL CHAIRMAN", category: "Governance", tags: ["Governance"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tetteh" },
];

const regionOptions = ["Accra", "Ashanti", "Western", "Volta"];

const ExecutivesPage = () => {
    const { isDark } = useTheme();
    const [selectedRegion, setSelectedRegion] = useState('Accra');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filter, setFilter] = useState('All');
    const categories = ['All', ...new Set(nationalLeaders.map(ex => ex.category))];

    const filteredNationalLeaders = filter === 'All'
        ? nationalLeaders
        : nationalLeaders.filter(ex => ex.category === filter);

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
        setIsDropdownOpen(false);
    };

    return (
        <div className={`min-h-screen font-sans selection:bg-red-500 selection:text-white ${
            isDark ? 'bg-black text-white' : 'bg-white text-black'
        }`}>

            {/* Breadcrumb & Banner Combined */}
            <section className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=800&fit=crop" 
                        alt="AGI Leadership Team" 
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
                </div>

                {/* Banner Content with Breadcrumb */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl"
                    >
                        {/* Breadcrumb */}
                        <nav className={`text-sm flex items-center gap-2 mb-6 ${
                            isDark ? 'text-gray-400' : 'text-gray-300'
                        }`}>
                            <span className={`cursor-pointer hover:text-white transition-colors ${isDark ? 'hover:text-red-500' : 'hover:text-red-400'}`}>Home</span>
                            <ChevronRight size={14} />
                            <span className="font-medium text-white">Our Leadership</span>
                        </nav>

                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight mb-4">
                            Meet Our <span className="text-red-500">Leaders</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                            The Association of Ghana Industries is guided by visionary leaders dedicated to driving industrial growth, advocacy, and economic innovation across the nation.
                        </p>
                        
                        {/* Social Media Icons */}
                        <div className="flex flex-wrap gap-4">
                            <span className="text-gray-400 text-sm font-medium self-center mr-2">Connect with us:</span>
                            <a 
                                href={socialLinks.facebook} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300"
                                aria-label="Facebook"
                            >
                                <Facebook size={22} />
                            </a>
                            <a 
                                href={socialLinks.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={22} />
                            </a>
                            <a 
                                href={socialLinks.twitter} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter size={22} />
                            </a>
                            <a 
                                href={socialLinks.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram size={22} />
                            </a>
                            <a 
                                href={socialLinks.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300"
                                aria-label="Website"
                            >
                                <Globe size={22} />
                            </a>
                            <a 
                                href={`mailto:${socialLinks.email}`}
                                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail size={22} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Accent Line */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" /> */}
            </section>

            {/* Region Dropdown Selector */}
            <section className={`sticky top-14 md:top-16 z-20 py-4 backdrop-blur-md border-y ${
                isDark ? 'bg-black/80 border-gray-800' : 'bg-white/80 border-gray-100'
            }`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`w-full sm:w-auto min-w-[200px] px-5 py-3 rounded-xl font-bold flex items-center justify-between gap-3 transition-all ${
                                isDark 
                                    ? 'bg-gray-800 text-white border border-gray-700 hover:border-red-500' 
                                    : 'bg-gray-100 text-gray-900 border border-gray-200 hover:border-red-600'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <MapPin size={18} className="text-red-600" />
                                {selectedRegion === 'National' ? 'National Leadership' : `${selectedRegion} Leadership`}
                            </span>
                            <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`absolute top-full left-0 mt-2 w-full sm:w-56 rounded-xl overflow-hidden shadow-xl z-50 ${
                                        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                                    }`}
                                >
                                    <button
                                        key="National"
                                        onClick={() => handleRegionChange('National')}
                                        className={`w-full px-5 py-3 text-left font-medium flex items-center gap-2 transition-colors ${
                                            selectedRegion === 'National'
                                                ? 'bg-red-600 text-white'
                                                : isDark 
                                                    ? 'hover:bg-gray-700 text-gray-300'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        <Users size={16} className={selectedRegion === 'National' ? 'text-white' : 'text-red-600'} />
                                        National Leadership
                                    </button>
                                    {regionOptions.map((region) => (
                                        <button
                                            key={region}
                                            onClick={() => handleRegionChange(region)}
                                            className={`w-full px-5 py-3 text-left font-medium flex items-center gap-2 transition-colors ${
                                                selectedRegion === region
                                                    ? 'bg-red-600 text-white'
                                                    : isDark 
                                                        ? 'hover:bg-gray-700 text-gray-300'
                                                        : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            <MapPin size={16} className={selectedRegion === region ? 'text-white' : 'text-red-600'} />
                                            {region} Leadership
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="px-6 max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <h2 className={`text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 ${
                        isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                        {selectedRegion === 'National' ? (
                            <Users className="text-red-600" />
                        ) : (
                            <MapPin className="text-red-600" />
                        )}
                        {selectedRegion === 'National' ? 'National Leadership' : `${selectedRegion} Regional Leadership`}
                    </h2>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                        {selectedRegion === 'National' 
                            ? 'The national executive team of AGI'
                            : `The ${selectedRegion} regional executive team`}
                    </p>
                </motion.div>
                
                {selectedRegion === 'National' ? (
                    <>
                        <div className="flex gap-3 mb-10 overflow-x-auto no-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === cat
                                            ? 'bg-red-600 text-white'
                                            : isDark 
                                                ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            <AnimatePresence mode='popLayout'>
                                {filteredNationalLeaders.map((exec) => (
                                    <ExecutiveCard key={exec.id} exec={exec} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {(allRegionsData[selectedRegion] || []).map((leader) => (
                                <RegionalLeaderCard key={leader.id} leader={leader} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>

            {/* Call to Action Footer */}
            <section className="px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto rounded-3xl p-12 md:p-20 relative overflow-hidden group bg-red-600"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                        <Users size={300} strokeWidth={1} />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Partner with Ghana's Industrial Leaders
                            </h2>
                            <p className="text-xl text-red-100">
                                Connect with our executive team to explore strategic opportunities for industrial growth and partnership.
                            </p>
                        </div>
                        <button className="px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl active:scale-95 bg-white text-red-600 hover:bg-black hover:text-white">
                            Contact the Secretariat
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

const ExecutiveCard = ({ exec }) => {
    const { isDark } = useTheme();
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <div className={`relative aspect-[3/4] overflow-hidden mb-5 rounded-2xl ${
                isDark ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
                {exec.image ? (
                    <img
                        src={exec.image}
                        alt={exec.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                ) : (
                    <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <Users size={64} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                        <a className="p-3 rounded-full bg-white/90 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a className="p-3 rounded-full bg-white/90 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center px-2">
                <h3 className={`font-bold text-xl md:text-2xl mb-2 group-hover:text-red-600 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                }`}>{exec.name}</h3>
                <p className={`text-sm font-black uppercase tracking-widest ${
                    isDark ? 'text-red-500' : 'text-red-600'
                }`}>{exec.role}</p>

                <div className="flex gap-2 pt-4 justify-center flex-wrap">
                    {exec.tags.map(tag => (
                        <span key={tag} className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                            isDark 
                                ? 'text-gray-400 bg-gray-800 border border-gray-700' 
                                : 'text-gray-500 bg-gray-50 border border-gray-100'
                        }`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const RegionalLeaderCard = ({ leader }) => {
    const { isDark } = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <div className={`relative aspect-[4/3] overflow-hidden mb-5 rounded-2xl ${
                isDark ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
                {leader.image ? (
                    <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                ) : (
                    <div className={`w-full h-full flex flex-col items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <Users size={64} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
                        <span className={`mt-3 text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            Image coming soon
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                        <a href={leader.facebook} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/90 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                            <Facebook size={20} />
                        </a>
                        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/90 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href={leader.twitter} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/90 text-black hover:bg-black hover:text-white transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href={leader.website} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/90 text-green-600 hover:bg-green-600 hover:text-white transition-colors">
                            <Globe size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center px-2">
                <h3 className={`font-bold text-xl md:text-2xl mb-2 group-hover:text-red-600 transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                }`}>{leader.name}</h3>
                <p className={`text-sm font-black uppercase tracking-widest ${
                    isDark ? 'text-red-400' : 'text-red-600'
                }`}>{leader.role}</p>
            </div>
        </motion.div>
    );
};

export default ExecutivesPage;