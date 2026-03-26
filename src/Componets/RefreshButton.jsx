import React from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLoading } from '../context/LoadingContext';

/**
 * Reusable RefreshButton component that triggers loading overlay when clicked.
 * Shows a spinning animation while refresh is in progress.
 * 
 * @param {Function} onRefresh - The refresh function to call
 * @param {string} label - Optional label to display next to the icon
 * @param {string} className - Additional CSS classes
 * @param {string} size - Size of the button: 'sm', 'md', 'lg'
 * @param {boolean} showLabel - Whether to show the label
 */
const RefreshButton = ({ 
  onRefresh, 
  label = 'Refresh',
  className = '',
  size = 'md',
  showLabel = true
}) => {
  const { isRefreshing } = useLoading();

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      onClick={onRefresh}
      disabled={isRefreshing}
      className={`
        flex items-center gap-2
        bg-red-600 hover:bg-red-700 
        text-white font-bold
        rounded-lg transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={label}
    >
      <motion.div
        animate={{ rotate: isRefreshing ? 360 : 0 }}
        transition={{ 
          duration: 1, 
          repeat: isRefreshing ? Infinity : 0,
          ease: 'linear'
        }}
      >
        <RefreshCw size={iconSizes[size]} />
      </motion.div>
      {showLabel && (
        <span className={size === 'sm' ? 'text-sm' : 'text-base'}>
          {isRefreshing ? 'Refreshing...' : label}
        </span>
      )}
    </button>
  );
};

export default RefreshButton;