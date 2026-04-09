import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, ArrowRight, Sparkles } from "lucide-react";

// ============================================================================
// CONSTANTS
// ============================================================================
const HEADLINES = [
  "Powering Industry Forward",
  "Where Innovation Meets Scale",
  "Building Africa's Future",
  "Industry. Evolved."
];

const STATS = [
  { value: "500+", label: "Members" },
  { value: "60+", label: "Years" },
  { value: "24", label: "Sectors" },
];

const VIDEO_SRC = "https://www.pexels.com/download/video/19115722/";
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80";

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const HeroSection = () => {
  const containerRef = useRef(null);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [videoError, setVideoError] = useState(false);
  const isInView = useInView(containerRef, { once: true });

  // Typing Effect - Runs whenever headline index changes
  useEffect(() => {
    const text = HEADLINES[currentHeadlineIndex];
    setDisplayText(""); // Clear before typing
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [currentHeadlineIndex]);

  // Headline Rotation - Rotate to next headline after 5 seconds
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 5000);

    return () => clearInterval(rotateInterval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#2c2222] overflow-hidden flex flex-col items-center justify-center text-white"
    >
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-40 transition-opacity duration-1000"
            onError={() => setVideoError(true)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <img src={FALLBACK_IMAGE} className="w-full h-full object-cover opacity-30" alt="Industrial" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-6">

        {/* Badge - Smaller */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 mb-6"
        >
          <Sparkles className="w-3 h-3 text-red-500" />
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-400">
            Association of Ghana Industries
          </span>
        </motion.div>

        {/* Dynamic Headline - Smaller with typing effect */}
        <div className="h-[80px] md:h-[100px] flex items-center justify-center text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95]">
            <span className="text-white">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="text-red-500 ml-1"
            >
              _
            </motion.span>
          </h1>
        </div>

        {/* Sub-text - Smaller */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-300 text-sm md:text-base max-w-xl text-center font-light leading-relaxed"
        >
          Empowering businesses to scale and innovate through strategic partnerships
          and policy advocacy since 1957.
        </motion.p>

        {/* CTAs - Smaller spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <button className="group relative px-6 py-3 bg-red-600 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-red-700 transition-all rounded-sm cursor-pointer">
            Become a Member
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button className="flex items-center gap-2 text-gray-300px-6 px-2 py-3 border bg-black/10 border-white/10 hover:bg-black/20 transition-all text-xs font-bold uppercase tracking-widest rounded-sm cursor-pointer">
            <Play className="w-4 h-4 fill-white" />
            Watch Showreel
          </button>
        </motion.div>

        {/* Stats Section - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 w-full max-w-2xl py-4 border-t border-white/10"
        >
          <div className="grid grid-cols-3 gap-4 cursor-pointer">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center group">
                <span className="block text-xl md:text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                  {stat.value}
                </span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-gray-300 px-6 py-2 border border-white/10 bg-black/10 hover:hover:bg-black/20  transition-all font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modernized Scroll Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[8px] uppercase tracking-[0.4em] text-gray-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-red-600 to-transparent"
        />
      </div>
    </section>
  );
};

export default HeroSection;