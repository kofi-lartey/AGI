import React from 'react';
import { useTheme } from "../context/ThemeContext";

const ExcellenceBanner = () => {
  const { isDark } = useTheme();

  return (
    <section className="px-10 py-10">
      <div className={`container mx-auto rounded-2xl p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between ${isDark 
          ? 'bg-gradient-to-br from-red-600 to-red-800' 
          : 'bg-gradient-to-br from-red-500 to-red-700'
      }`}>
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold leading-tight uppercase text-white">
            Empowering Industry <br /> Excellence
          </h2>
          <ul className="space-y-3 text-sm font-medium text-white/90">
            <li className="flex items-center gap-2">✓ Access to Industrial advocacy and policy influence</li>
            <li className="flex items-center gap-2">✓ B2B networking and global market linkage</li>
            <li className="flex items-center gap-2">✓ Technical training and capacity building</li>
          </ul>
          <button className={`px-8 py-3 rounded-md font-bold text-xs uppercase transition-transform hover:scale-105 cursor-pointer ${isDark 
              ? 'bg-white text-red-700' 
              : 'bg-white text-red-600'
          }`}>
            Apply for Membership
          </button>
        </div>
        
        {/* Decorative AGI Text */}
        <div className="absolute right-[-20px] bottom-[-20px] text-[200px] font-black opacity-10 select-none pointer-events-none text-white">
          AGI
        </div>
      </div>
    </section>
  );
};

export default ExcellenceBanner;
