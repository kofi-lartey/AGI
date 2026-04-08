import { motion, useInView } from "framer-motion";
import { Leaf, Zap, Factory, Monitor, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { useRef } from "react";

// Key sectors to display on homepage - maps to sectorsData keys
const sectors = [
  {
    title: "Agri-Business",
    description:
      "Transforming agriculture through processing, innovation, and value chain expansion.",
    icon: <Leaf size={28} />,
    stats: "40% Growth",
    sectorKey: "Agri-Business", // Maps to sectorsData key
  },
  {
    title: "Energy & Oil",
    description:
      "Enabling sustainable power solutions for industrial and economic growth.",
    icon: <Zap size={28} />,
    stats: "500+ MW",
    sectorKey: "Energy & Oil",
  },
  {
    title: "Manufacturing",
    description:
      "Driving production, job creation, and industrial backbone development.",
    icon: <Factory size={28} />,
    stats: "12K Jobs",
    sectorKey: "Manufacturing",
  },
  {
    title: "IT & Digital",
    description:
      "Accelerating digital transformation and Industry 4.0 adoption.",
    icon: <Monitor size={28} />,
    stats: "100+ Firms",
    sectorKey: "IT & Digital",
  },
];

const IndustrialSectors = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const handleNavigate = (path) => {
    startLoading('Navigating...');
    navigate(path);
  };

  // Navigate to individual sector page when clicked
  const handleSectorClick = (sectorKey) => {
    startLoading('Loading sector...');
    navigate(`/sectors/${encodeURIComponent(sectorKey)}`);
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-gray-50'
      }`}
    >
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/3 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-dots opacity-30" />
      </div>

      <div className="container mx-auto relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className={`text-xs tracking-[0.4em] uppercase font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            What We Do
          </span>

          <h2 className={`mt-6 text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Our Industrial <span className="text-red-500">Ecosystem</span>
          </h2>

          <p className={`mt-6 text-base md:text-lg leading-relaxed ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            We support and represent key sectors driving Ghana's economy —
            enabling growth, innovation, and global competitiveness across industries.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleSectorClick(sector.sectorKey)}
              className={`relative p-8 group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                isDark 
                  ? 'bg-white/[0.02] border border-white/5 hover:border-red-500/50 hover:bg-white/[0.05]' 
                  : 'bg-white border border-gray-100 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10'
              }`}
            >
              {/* HOVER GLOW */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent`} />

              {/* FLOATING PARTICLES */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute top-4 right-4 w-20 h-20 bg-red-500/10 rounded-full blur-xl"
              />

              {/* ICON */}
              <div className={`relative mb-6 w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-black border border-white/10 group-hover:border-red-500 group-hover:bg-red-600/10' 
                  : 'bg-gray-100 border border-gray-200 group-hover:border-red-500 group-hover:bg-red-50'
              }`}>
                <div className={`text-red-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {sector.icon}
                </div>
              </div>

              {/* STATS BADGE */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="absolute top-8 right-8 px-3 py-1 bg-red-600/10 rounded-full"
              >
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                  {sector.stats}
                </span>
              </motion.div>

              {/* TITLE */}
              <h3 className={`text-xl font-bold mb-3 tracking-tight ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                {sector.title}
              </h3>

              {/* DESCRIPTION */}
              <p className={`text-sm leading-relaxed mb-6 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {sector.description}
              </p>

              {/* CTA LINK */}
              <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${
                isDark ? 'text-gray-500 group-hover:text-red-500' : 'text-gray-400 group-hover:text-red-600'
              }`}>
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* BOTTOM LINE ANIMATION */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-red-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrialSectors;
