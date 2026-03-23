import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Globe, Handshake, Newspaper, Users, Briefcase,
    CheckCircle2, ArrowRight
} from 'lucide-react';

const MembershipPage = () => {
    const navigate = useNavigate();

    // Animation variants
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true }
    };

    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-red-600">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        Join the Leading <span className="text-red-600">Industry Network</span>
                    </motion.h1>
                    <motion.p
                        className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Empowering Ghanaian businesses through advocacy, professional development, and exclusive networking opportunities for over 60 years.
                    </motion.p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => navigate('/apply')}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-md font-bold transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2"
                        >
                            Start Application
                            <ArrowRight size={20} />
                        </button>
                        <button 
                            onClick={() => document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' })}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-4 rounded-md font-bold transition-all border border-zinc-700"
                        >
                            Explore Benefits
                        </button>
                    </div>
                </div>
            </section>

            {/* Membership Benefits Section */}
            <section id="benefits" className="py-24 px-6 scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold inline-block relative">
                            Membership Benefits
                            <div className="w-1/2 h-1 bg-red-600 mx-auto mt-4" />
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                            As a member of the Association of Ghana Industries, you gain access to a range of exclusive benefits designed to help your business grow and thrive.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <BenefitCard
                            icon={<Globe className="text-red-600" size={28} />}
                            title="International Connections"
                            description="Expand your business reach through connections with international business organizations including Danish Industries (DI), German Federation of Industries (BDI), Confederation of Indian Industry (CII), and World Economic Forum (WEF)."
                            features={[
                                "Access to global business networks",
                                "International trade opportunities",
                                "Cross-border collaboration"
                            ]}
                        />
                        <BenefitCard
                            icon={<Handshake className="text-red-600" size={28} />}
                            title="Government Cooperation"
                            description="Benefit from cooperation promotion with government boards and public institutions to advocate for better business policies and regulatory frameworks."
                            features={[
                                "Direct engagement with policymakers",
                                "Participation in public-private dialogues",
                                "Policy advocacy initiatives"
                            ]}
                        />
                        <BenefitCard
                            icon={<Newspaper className="text-red-600" size={28} />}
                            title="Business Information"
                            description="Stay informed with regular business information updates through our newsletters and publications, keeping you ahead of market trends and opportunities."
                            features={[
                                "Monthly industry newsletters",
                                "Market research reports",
                                "Policy update alerts"
                            ]}
                        />
                        <BenefitCard
                            icon={<Users className="text-red-600" size={28} />}
                            title="Networking Opportunities"
                            description="Connect with industry leaders through exclusive seminars, events, and meetings designed to foster business relationships and partnerships."
                            features={[
                                "Annual industry conferences",
                                "Business matchmaking events",
                                "Sector-specific networking sessions"
                            ]}
                        />
                        <BenefitCard
                            icon={<Briefcase className="text-red-600" size={28} />}
                            title="Business Advocacy"
                            description="We advocate for improving the corporate environment, reducing business costs, and fostering international competitiveness for Ghanaian industries."
                            features={[
                                "Tax and regulatory advocacy",
                                "Infrastructure improvement campaigns",
                                "Trade policy representation"
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Requirements & Categories */}
            <section className="py-24 px-6 bg-[#0f0f0f]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div {...fadeIn}>
                        <h2 className="text-3xl font-bold mb-8">Membership Requirements</h2>
                        <p className="text-gray-400 mb-8">
                            AGI membership is open to all manufacturing and service provider companies operating within Ghana. We welcome SMEs and large-scale enterprises alike.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Valid Certificate of Incorporation from Registrar General's Department.",
                                "Certificate to Commence Business.",
                                "Detailed company profile including products or services rendered.",
                                "Commitment to abide by the AGI Code of Ethics."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 text-gray-300">
                                    <CheckCircle2 className="text-red-600 shrink-0" size={20} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div {...fadeIn} className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-zinc-500">Membership Categories</h3>
                        <CategoryCard label="Micro / Small" range="1-29 Employees" cat="Category A" />
                        <CategoryCard label="Medium Enterprise" range="30-100 Employees" cat="Category B" />
                        <CategoryCard label="Large Scale" range="100+ Employees" cat="Category C" />
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        {...fadeIn}
                        className="bg-gradient-to-br from-red-900/30 to-zinc-900 border border-red-900/30 rounded-2xl p-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join AGI?</h2>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Take the first step towards growing your business with the support of Ghana's leading industrial association.
                        </p>
                        <button
                            onClick={() => navigate('/apply')}
                            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-md font-bold transition-all transform hover:scale-105 cursor-pointer inline-flex items-center gap-2"
                        >
                            Start Application
                            <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="py-16 px-6 bg-[#0f0f0f]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-400 mb-4">Need assistance? Contact us:</p>
                    <div className="flex flex-wrap justify-center gap-8 text-sm">
                        <div>
                            <span className="text-gray-500">Address:</span>
                            <span className="text-white ml-2">42 Dr. Isert Street, North Ridge, Accra</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Phone:</span>
                            <span className="text-white ml-2">(0302) 251266, 986730</span>
                        </div>
                        <div>
                            <span className="text-gray-500">Email:</span>
                            <span className="text-white ml-2">agi@agighana.org</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Sub-components
const BenefitCard = ({ icon, title, description, features }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-lg hover:border-red-900/50 transition-all group"
    >
        <div className="mb-4 bg-zinc-800 w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="font-bold text-xl mb-3">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{description}</p>
        <ul className="space-y-2">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-zinc-500 text-sm">
                    <CheckCircle2 className="text-red-600 shrink-0" size={14} />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </motion.div>
);

const CategoryCard = ({ label, range, cat }) => (
    <div className="flex items-center justify-between p-5 bg-zinc-900/30 border border-zinc-800 rounded-lg group hover:bg-zinc-800/50 transition-all cursor-default">
        <div>
            <h4 className="font-bold">{label}</h4>
            <p className="text-zinc-500 text-sm">{range}</p>
        </div>
        <span className="text-xs font-bold text-red-600 uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">
            {cat}
        </span>
    </div>
);

export default MembershipPage;
