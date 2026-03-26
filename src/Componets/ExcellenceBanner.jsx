import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useLoading } from '../context/LoadingContext';
import { ArrowRight, Building2, Globe, GraduationCap } from 'lucide-react';

// ============================================================================
// CONSTANTS
// ============================================================================
const BENEFITS = [
  { icon: Building2, text: "Industrial advocacy & policy influence" },
  { icon: Globe, text: "B2B networking & global market linkage" },
  { icon: GraduationCap, text: "Technical training & capacity building" },
];

const STATS = [
  { value: "500+", label: "Members" },
  { value: "60+", label: "Years" },
  { value: "12", label: "Sectors" },
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
const BackgroundGlow = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-0 bg-grid opacity-20" />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-white/10 rounded-full blur-3xl"
    />
  </div>
);

const SectionHeading = ({ isInView }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.2 }}
    className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase leading-tight text-white"
  >
    Empowering <span className="text-white/80">Industry Excellence</span>
  </motion.h2>
);

const BenefitsList = ({ isInView }) => (
  <div className="space-y-3">
    {BENEFITS.map((benefit, index) => (
      <motion.div
        key={benefit.text}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3 + index * 0.1 }}
        className="flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <benefit.icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-white/90">{benefit.text}</span>
      </motion.div>
    ))}
  </div>
);

const CTAButton = ({ isInView, onNavigate }) => (
  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.6 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onNavigate('/membership')}
    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-gray-100 transition-all cursor-pointer"
  >
    Apply for Membership
    <ArrowRight className="w-4 h-4" />
  </motion.button>
);

const DecorativeStats = ({ isInView }) => (
  <div className="hidden lg:flex items-center justify-center relative h-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.4 }}
      className="text-[150px] lg:text-[200px] font-black text-white/10 select-none pointer-events-none leading-none"
    >
      AGI
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.7 }}
      className="absolute bottom-0 left-0 flex gap-3"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
          <div className="text-xl font-bold text-white">{stat.value}</div>
          <div className="text-[10px] uppercase tracking-wider text-white/70">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const ExcellenceBanner = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const handleNavigate = (path) => {
    startLoading('Navigating...');
    navigate(path);
  };

  return (
    <section className="px-4 md:px-8 lg:px-12 py-6">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl p-6 md:p-10 lg:p-14 overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800"
      >
        <BackgroundGlow />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <SectionHeading isInView={isInView} />
            <BenefitsList isInView={isInView} />
            <CTAButton isInView={isInView} onNavigate={handleNavigate} />
          </div>

          <DecorativeStats isInView={isInView} />
        </div>

        <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
      </motion.div>
    </section>
  );
};

export default ExcellenceBanner;
