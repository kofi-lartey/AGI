import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const headlines = [
    "Powering Industry Forward",
    "Where Innovation Meets Scale",
    "Building Africa's Industrial Future",
    "Industry. Evolved."
];

const fallbackImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80";

const HeroSection = () => {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [videoError, setVideoError] = useState(false);
    const { scrollY } = useScroll();
    const { isDark } = useTheme();

    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

    // Typing effect
    useEffect(() => {
        let i = 0;
        const text = headlines[index];
        setDisplayText("");

        const typing = setInterval(() => {
            setDisplayText((prev) => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(typing);
        }, 50);

        return () => clearInterval(typing);
    }, [index]);

    // Rotate headlines
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % headlines.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Cursor glow
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e) => {
            setMouse({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <motion.section
            style={{ opacity, scale }}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-900"
        >
            {/* VIDEO BACKGROUND */}
            {!videoError && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={fallbackImage}
                    onError={() => setVideoError(true)}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    src="https://www.pexels.com/download/video/19115722/"
                />
            )}

            {/* FALLBACK IMAGE */}
            {videoError && (
                <img
                    src={fallbackImage}
                    alt="Industrial Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
            )}

            {/* DARK OVERLAY */}
            <div className={`absolute inset-0 bg-gradient-to-r ${isDark 
                ? 'from-gray-900 via-gray-900/70 to-gray-900/40' 
                : 'from-white via-white/50 to-white'
            }`} />

            {/* CURSOR GLOW - Red Accent */}
            <div
                className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-red-600/30 blur-3xl"
                style={{
                    left: mouse.x - 200,
                    top: mouse.y - 200
                }}
            />

            <div className="relative z-10 text-center px-6 max-w-4xl">
                <span className={`text-xs tracking-[0.4em] uppercase ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                    Association of Ghana Industries
                </span>

                <h1 className={`mt-6 text-4xl md:text-7xl font-black uppercase leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {displayText}
                    <span className="text-red-500">|</span>
                </h1>

                <p className={`mt-6 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
                    Empowering businesses to scale, innovate, and compete globally through
                    strategic partnerships, policy advocacy, and industrial excellence.
                </p>

                <div className="flex justify-center gap-4 mt-10 flex-wrap">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-all hover:shadow-xl">
                        Become a Member
                    </button>
                    <button className={`border px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-all ${isDark 
                        ? 'border-white/30 text-white hover:bg-white hover:text-gray-900' 
                        : 'border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600'
                    }`}>
                        Explore Network
                    </button>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-10 right-10 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl"
            >
                <Play className="text-white" />
            </motion.button>

            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest animate-bounce ${isDark ? 'text-red-300' : 'text-red-500'}`}>
                SCROLL
            </div>
        </motion.section>
    );
};

export default HeroSection;
