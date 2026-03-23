import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const AboutVidSection = () => {
    const { isDark } = useTheme();

    return (
        <section className={`relative py-32 px-6 md:px-20 overflow-hidden -mt-1 transition-colors duration-300 ${isDark 
            ? 'bg-gray-900' 
            : 'bg-white'
        }`}>
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* LEFT: TEXT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Decorative Quote */}
                    <span className="absolute -top-16 -left-10 text-red-500 text-[12rem] opacity-[0.05] font-serif leading-none select-none">"</span>

                    {/* Label */}
                    <span className={`text-xs tracking-[0.4em] uppercase ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                        Who We Are
                    </span>

                    {/* Headline */}
                    <h2 className={`mt-6 text-4xl md:text-[3.8rem] font-black uppercase leading-[1] tracking-[-0.02em] font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Shaping the Future <br />
                        of <span className="text-red-500">Industry</span> <br />
                        in Ghana
                    </h2>

                    {/* Description */}
                    <p className={`mt-8 text-sm md:text-base leading-relaxed max-w-xl font-light ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        We are the driving force behind industrial growth — empowering businesses
                        to scale, innovate, and compete globally through policy advocacy, strategic
                        partnerships, and sustainable development.
                    </p>

                    {/* CTA */}
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 mt-10 text-red-500 font-semibold text-[11px] uppercase tracking-[0.3em] group"
                    >
                        Discover Our Impact
                        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </a>
                </motion.div>

                {/* RIGHT: VIDEO CARD */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative w-full max-w-lg aspect-square group cursor-pointer">

                        {/* IMAGE BACKGROUND */}
                        <img
                            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80"
                            alt="Industrial"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* OVERLAY */}
                        <div className={`absolute inset-0 ${isDark ? 'bg-black/60 group-hover:bg-black/40' : 'bg-gray-900/40 group-hover:bg-gray-900/20'} transition-all duration-500`} />

                        {/* CONTENT */}
                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-white/90 mb-4">
                                Watch Story
                            </span>

                            <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                                Our Journey <br />
                                <span className="text-sm font-medium opacity-70 normal-case">
                                    A legacy of growth & innovation
                                </span>
                            </h3>

                            {/* PLAY BUTTON */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl relative"
                            >
                                <Play size={22} fill="white" className="text-white ml-1" />

                                {/* Pulse Ring */}
                                <span className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
                            </motion.div>
                        </div>

                        {/* BORDER FRAME */}
                        <div className="absolute inset-4 border border-white/10 pointer-events-none" />

                        {/* GLOW */}
                        <div className="absolute -z-10 inset-0 translate-x-6 translate-y-6 bg-red-500/10 blur-3xl" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutVidSection;
