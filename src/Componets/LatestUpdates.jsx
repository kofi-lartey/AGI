import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const updates = [
  {
    category: "Industry News",
    date: "Mar 14, 2026",
    title: "Digital Transformation in Ghana's Manufacturing Sector",
    excerpt:
      "How local industries are adopting ICT and automation to streamline production and scale efficiently.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
  },
  {
    category: "Advocacy",
    date: "Mar 10, 2026",
    title: "AGI Partners with Government for Tax Reforms",
    excerpt:
      "New policy discussions aimed at reducing import burdens and supporting local manufacturers.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2950d15?auto=format&fit=crop&q=80",
  },
  {
    category: "Events",
    date: "Feb 28, 2026",
    title: "National Industrial Summit 2026: Highlights",
    excerpt:
      "Key insights, partnerships, and outcomes from Ghana's premier industrial gathering.",
    image:
      "https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&q=80",
  },
];

const LatestUpdates = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const navigate = useNavigate();
  const { startLoading } = useLoading();

  const handleNavigate = (path) => {
    startLoading('Navigating...');
    navigate(path);
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative py-28 px-6 md:px-12 lg:px-20 transition-colors duration-300 ${
        isDark ? 'bg-black' : 'bg-gray-50'
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
        <div className="absolute inset-0 bg-dots opacity-20" />
      </div>

      <div className="container mx-auto relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16"
        >
          <div>
            <span className={`text-xs tracking-[0.4em] uppercase font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Insights
            </span>

            <h2 className={`mt-4 text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight ${
              isDark ? 'text-white' : 'text-black'
            }`}>
              Latest <span className="text-red-500">Updates</span>
            </h2>

            <p className={`mt-4 text-base max-w-xl ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Stay informed with industry news, policy updates, and insights shaping Ghana's industrial future.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate('/blog')}
            className={`inline-flex items-center gap-2 border px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${
              isDark 
                  ? 'border-white/20 text-white hover:bg-white hover:text-black' 
                  : 'border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600'
            }`}
          >
            View All Updates
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {updates.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.01 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* HOVER REVEAL CONTENT */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="mt-6">
                {/* META */}
                <div className="flex items-center gap-3 text-[10px] font-semibold mb-3 tracking-wider">
                  <span className="flex items-center gap-1 text-red-500 uppercase">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>•</span>
                  <span className={`flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className={`text-xl font-bold mb-3 leading-snug transition-all duration-300 ${
                    isDark 
                        ? 'text-white group-hover:text-red-400' 
                        : 'text-black group-hover:text-red-600'
                }`}>
                  {post.title}
                </h3>

                {/* TEXT */}
                <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {post.excerpt}
                </p>

                {/* CTA */}
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                    isDark 
                        ? 'text-white group-hover:translate-x-2' 
                        : 'text-gray-700 group-hover:translate-x-2'
                }`}>
                  <span>Read Story</span>
                  <ArrowRight className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
