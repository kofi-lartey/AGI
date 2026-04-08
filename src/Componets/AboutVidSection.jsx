import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../context/LoadingContext";
import { useNavigate } from "react-router-dom";

const AboutVidSection = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const handleNavigate = (path) => {
    startLoading('Navigating...');
    navigate(path);
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-300 -mt-1 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* LEFT: TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Decorative Quote */}
          <span className="absolute -top-8 -left-4 text-red-500 text-[10rem] opacity-[0.03] font-serif leading-none select-none">
            "
          </span>

          {/* Label - Clean version without icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className={`text-xs tracking-[0.4em] uppercase font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              Who We Are
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl lg:text-[4rem] font-black uppercase leading-[0.95] tracking-tight font-serif ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Shaping the Future <br />
            of <span className="text-red-500">Industry</span> <br />
            in Ghana
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className={`mt-8 text-base md:text-lg leading-relaxed max-w-xl font-light ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            We are the driving force behind industrial growth — empowering businesses
            to scale, innovate, and compete globally through policy advocacy, strategic
            partnerships, and sustainable development.
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, x: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate('/about')}
            className="inline-flex items-center gap-3 mt-10 text-red-500 font-semibold text-[11px] uppercase tracking-[0.3em] group cursor-pointer"
          >
            Discover Our Impact
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </motion.button>
        </motion.div>

        {/* RIGHT: VIDEO CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-lg aspect-square group cursor-pointer">

            {/* IMAGE BACKGROUND */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80"
                alt="Industrial growth in Ghana"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* OVERLAY */}
            <div className={`absolute inset-0 transition-all duration-500 ${
              isDark 
                ? 'bg-black/60 group-hover:bg-black/40' 
                : 'bg-black/50 group-hover:bg-black/30'
            }`} />

            {/* CONTENT */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-[0.4em] uppercase text-white/90 mb-4"
              >
                Watch Story
              </motion.span>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-tight text-white"
              >
                Our Journey <br />
                <span className="text-base font-medium opacity-70 normal-case">
                  A legacy of growth & innovation
                </span>
              </motion.h3>

              {/* PLAY BUTTON */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/30 relative cursor-pointer group/play"
              >
                <Play size={24} fill="white" className="text-white ml-1" />

                {/* Pulse Ring */}
                <motion.span
                  animate={{ scale: [1, 1.5, 2], opacity: [0.6, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-red-400"
                />
                
                {/* Second ring */}
                <motion.span
                  animate={{ scale: [1, 1.3, 1.8], opacity: [0.4, 0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 rounded-full border border-white/50"
                />
              </motion.div>
            </div>

            {/* BORDER FRAME */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
              className="absolute inset-6 border border-white/10 pointer-events-none"
            />

            {/* GLOW */}
            <div className="absolute -z-10 inset-0 translate-x-8 translate-y-8">
              <div className="w-full h-full bg-red-500/20 blur-3xl rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutVidSection;