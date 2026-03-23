import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';
import { useTheme } from '../context/ThemeContext';

const LoadingOverlay = () => {
  const { isLoading, loadingMessage } = useLoading();
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 ${
              isDark 
                ? 'bg-gray-900/95' 
                : 'bg-white/95'
            }`}
          />

          {/* Loading Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Animated Logo */}
            <div className="relative">
              <motion.div
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotateY: { duration: 1.5, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <img 
                  src="https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png" 
                  alt="AGI ACCRA" 
                  className={`h-20 w-auto ${isDark ? '' : 'brightness-0 invert'}`}
                />
              </motion.div>
              
              {/* Pulsing ring effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5],
                  opacity: [0.5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut'
                }}
                className={`absolute inset-0 rounded-full ${
                  isDark 
                    ? 'bg-red-500/30' 
                    : 'bg-red-500/20'
                }`}
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mt-8 text-sm font-medium tracking-wider ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {loadingMessage}
            </motion.p>

            {/* Loading bar */}
            <div className={`mt-4 w-48 h-1 rounded-full overflow-hidden ${
              isDark ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
              <motion.div
                className="h-full bg-red-600 rounded-full"
                animate={{ 
                  x: ['-100%', '100%']
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              />
            </div>

            {/* Dots animation */}
            <div className="flex gap-2 mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-red-600"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
