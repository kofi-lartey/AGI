import React from 'react';
import { motion } from 'framer-motion';
import { Bolt, Eye, ShieldCheck, Calendar, Briefcase, FileText, Cpu, Quote } from 'lucide-react';

// Animation variants for reusability
const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

const AboutPage = () => {
    return (
        <div className="bg-[#0a0a0a] text-white font-sans selection:bg-red-600">

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
                        alt="Industrial Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
                </div>

                <motion.div
                    className="relative z-10 text-center max-w-4xl px-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Our Story & <span className="text-red-600">Mission</span>
                    </h1>
                    <div className="w-16 h-1 bg-red-600 mx-auto mb-8" />
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                        Empowering Ghanaian industries since 1958. We are the proactive business
                        support organization for small, medium, and large-scale manufacturing and
                        service industries in Ghana.
                    </p>
                </motion.div>
            </section>

            {/* Mission/Vision/Values Cards */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card
                        icon={<Bolt className="text-red-600" size={32} />}
                        title="Our Mission"
                        desc="To carry out proactive advocacy services that create a conducive business environment and provide world-class business support services for our members."
                    />
                    <Card
                        icon={<Eye className="text-red-600" size={32} />}
                        title="Our Vision"
                        desc="To be the leading business support organization in West Africa, fostering the growth and development of competitive industries in Ghana."
                    />
                    <Card
                        icon={<ShieldCheck className="text-red-600" size={32} />}
                        title="Our Values"
                        list={["Integrity", "Innovation", "Professionalism", "Results-Oriented"]}
                    />
                </div>
            </section>

            {/* Journey / Timeline */}
            <section className="py-24 bg-[#0f0f0f] px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
                        <p className="text-gray-400">Key milestones in the development of Ghanaian industry.</p>
                    </div>

                    <div className="space-y-12">
                        <TimelineItem
                            year="1958"
                            title="Foundation"
                            desc="AGI was established as a voluntary business association of manufacturers to represent the interests of Ghanaian industries."
                        />
                        <TimelineItem
                            year="1980s"
                            title="Economic Expansion"
                            desc="Expanded reach to include service sectors and small-scale enterprises, becoming the dominant voice for private sector growth."
                        />
                        <TimelineItem
                            year="2012"
                            title="Policy Influence"
                            desc="Instrumental in the drafting of Ghana's Industrial Policy, securing better protection for local manufacturers."
                        />
                        <TimelineItem
                            year="Present Day"
                            title="Digital Transformation"
                            desc="Leading the charge for Industry 4.0 in Ghana, supporting members in adopting green and digital manufacturing technologies."
                            isLast
                        />
                    </div>
                </div>
            </section>

            {/* Leadership Quote Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <motion.div
                    className="flex-1 relative"
                    {...fadeIn}
                >
                    <div className="aspect-square bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 relative group">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                            alt="Leadership"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-2xl font-bold tracking-widest uppercase">AG Leadership</h3>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex-1 space-y-8"
                    {...fadeIn}
                >
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        The Voice of <span className="text-red-600">Industry</span>
                    </h2>
                    <div className="border-l-4 border-red-600 pl-6 italic">
                        <Quote className="text-red-600 mb-4 opacity-50" size={40} />
                        <p className="text-xl md:text-2xl text-gray-200">
                            "Our goal remains steadfast: to ensure that the Ghanaian industry is not just a consumer of global goods, but a formidable producer and competitor on the international stage."
                        </p>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                        Under the guidance of our leadership team, AGI continues to bridge the gap between policy makers and the private sector, ensuring that every industrial voice is heard.
                    </p>
                    <div>
                        <h4 className="text-xl font-bold text-red-600">Dr. Humphrey Ayim-Darke</h4>
                        <p className="text-gray-500">President, AGI</p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

// Helper Components
const Card = ({ icon, title, desc, list }) => (
    <motion.div
        className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl hover:bg-zinc-800/80 transition-all cursor-default"
        whileHover={{ y: -10 }}
        {...fadeIn}
    >
        <div className="mb-6">{icon}</div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {desc && <p className="text-gray-400 leading-relaxed">{desc}</p>}
        {list && (
            <ul className="space-y-2">
                {list.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-400">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full" /> {item}
                    </li>
                ))}
            </ul>
        )}
    </motion.div>
);

const TimelineItem = ({ year, title, desc, isLast }) => (
    <motion.div
        className="flex gap-6 md:gap-12"
        {...fadeIn}
    >
        <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-red-600 mt-1 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
            {!isLast && <div className="w-px h-full bg-zinc-800 my-2" />}
        </div>
        <div className="pb-12">
            <span className="text-red-600 font-bold text-lg">{year}</span>
            <h3 className="text-xl font-bold mt-1 mb-3">{title}</h3>
            <p className="text-gray-400 max-w-2xl">{desc}</p>
        </div>
    </motion.div>
);

export default AboutPage;