import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useLoading } from '../context/LoadingContext';

/**
 * PullToRefresh component that detects pull-down gesture on mobile devices
 * and triggers a refresh action with loading overlay.
 * 
 * @param {React.ReactNode} children - The content to wrap
 * @param {Function} onRefresh - The refresh function to call
 * @param {number} threshold - Distance in pixels to trigger refresh (default: 80)
 */
const PullToRefresh = ({ 
  children, 
  onRefresh, 
  threshold = 80 
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const startY = useRef(0);
  const { isRefreshing } = useLoading();
  
  const handleTouchStart = useCallback((e) => {
    // Only enable pull-to-refresh when at the top of the page
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isPulling || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    // Only allow pulling down (positive diff)
    if (diff > 0) {
      // Apply resistance for smoother feel
      const resistance = 0.5;
      const distance = Math.min(diff * resistance, threshold * 1.5);
      setPullDistance(distance);
    }
  }, [isPulling, isRefreshing, threshold]);

  const handleTouchEnd = useCallback(() => {
    if (pullDistance >= threshold && !isRefreshing) {
      // Trigger refresh
      onRefresh();
    }
    
    setPullDistance(0);
    setIsPulling(false);
  }, [pullDistance, threshold, isRefreshing, onRefresh]);

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <AnimatePresence>
        {isPulling && pullDistance > 10 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: pullDistance >= threshold ? 1 : 0.7,
              y: 0
            }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
            style={{ 
              transform: `translateY(${Math.min(pullDistance, 60)}px)` 
            }}
          >
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: isRefreshing ? 360 : 0,
                  scale: pullDistance >= threshold ? 1.2 : 1
                }}
                transition={{ 
                  duration: 1, 
                  repeat: isRefreshing ? Infinity : 0,
                  ease: 'linear'
                }}
              >
                <RefreshCw 
                  size={20} 
                  className={pullDistance >= threshold ? 'text-red-600' : 'text-gray-500'}
                />
              </motion.div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pull indicator background */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-24 -z-10 pointer-events-none"
        style={{
          background: pullDistance > 0 
            ? `linear-gradient(to bottom, rgba(220, 38, 38, ${Math.min(pullDistance / 200, 0.1)}) 0%, transparent 100%)`
            : 'transparent'
        }}
      />

      {/* Main content */}
      {children}
    </div>
  );
};

export default PullToRefresh;