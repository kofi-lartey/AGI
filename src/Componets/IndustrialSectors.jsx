import { motion } from "framer-motion";
import { Leaf, Zap, Factory, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const sectors = [
  {
    title: "Agri-Business",
    description:
      "Transforming agriculture through processing, innovation, and value chain expansion.",
    icon: <Leaf size={26} />,
  },
  {
    title: "Energy",
    description:
      "Enabling sustainable power solutions for industrial and economic growth.",
    icon: <Zap size={26} />,
  },
  {
    title: "Manufacturing",
    description:
      "Driving production, job creation, and industrial backbone development.",
    icon: <Factory size={26} />,
  },
  {
    title: "IT & Digital",
    description:
      "Accelerating digital transformation and Industry 4.0 adoption.",
    icon: <Monitor size={26} />,
  },
];

const IndustrialSectors = () => {
  const { isDark } = useTheme();

  return (
    <section className={`relative py-28 px-6 md:px-20 overflow-hidden transition-colors duration-300 ${isDark 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="container mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className={`text-xs tracking-[0.4em] uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            What We Do
          </span>

          <h2 className={`mt-6 text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Our Industrial <span className="text-red-500">Ecosystem</span>
          </h2>

          <p className={`mt-6 text-sm md:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            We support and represent key sectors driving Ghana's economy —
            enabling growth, innovation, and global competitiveness across industries.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 group rounded-xl backdrop-blur-xl overflow-hidden cursor-pointer transition-colors duration-300 ${isDark 
                  ? 'bg-white/[0.02] border border-white/5' 
                  : 'bg-white border border-gray-100'
              }`}
            >
              {/* HOVER GLOW */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-red-500/10 to-transparent`} />

              {/* ICON */}
              <div className={`mb-6 w-14 h-14 flex items-center justify-center rounded-lg transition ${isDark 
                  ? 'bg-black border border-white/10 group-hover:border-red-500' 
                  : 'bg-gray-100 border border-gray-200 group-hover:border-red-500'
              }`}>
                <div className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                  {sector.icon}
                </div>
              </div>

              {/* TITLE */}
              <h3 className={`text-xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {sector.title}
              </h3>

              {/* DESCRIPTION */}
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {sector.description}
              </p>

              {/* BOTTOM LINE ANIMATION */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrialSectors;
