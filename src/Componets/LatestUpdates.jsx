import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

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

  return (
    <section className={`relative py-28 px-6 md:px-20 transition-colors duration-300 ${isDark 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <div className="container mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div>
            <span className={`text-xs tracking-[0.4em] uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Insights
            </span>

            <h2 className={`mt-4 text-4xl md:text-6xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Latest <span className="text-red-500">Updates</span>
            </h2>

            <p className={`mt-4 text-sm max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Stay informed with industry news, policy updates, and insights shaping Ghana's industrial future.
            </p>
          </div>

          <button className={`border px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${isDark 
              ? 'border-white/20 text-white hover:bg-white hover:text-black' 
              : 'border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600'
          }`}>
            View All Updates
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {updates.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition" />
              </div>

              {/* CONTENT */}
              <div className="mt-6">
                {/* META */}
                <div className="flex gap-3 text-[10px] font-semibold mb-3 tracking-wider">
                  <span className="text-red-500 uppercase">{post.category}</span>
                  <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>•</span>
                  <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>{post.date}</span>
                </div>

                {/* TITLE */}
                <h3 className={`text-xl font-bold mb-3 leading-snug transition ${isDark 
                    ? 'text-white group-hover:text-red-500' 
                    : 'text-gray-900 group-hover:text-red-600'
                }`}>
                  {post.title}
                </h3>

                {/* TEXT */}
                <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {post.excerpt}
                </p>

                {/* CTA */}
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition ${isDark 
                    ? 'text-white group-hover:translate-x-2' 
                    : 'text-gray-700 group-hover:translate-x-2'
                }`}>
                  Read Story <span className="text-red-500">→</span>
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
