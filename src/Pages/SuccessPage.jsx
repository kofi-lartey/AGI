import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Home, FileText, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const [countdown, setCountdown] = useState(5);

  // Get data passed from previous page
  const { 
    title = 'Operation Successful!', 
    message = 'Your action has been completed successfully.',
    type = 'success',
    redirectTo = '/',
    redirectText = 'Go Home',
    showActions = true,
    actionButtons = []
  } = location.state || {};

  // Default action buttons based on type
  const defaultButtons = [
    { text: 'Return Home', path: '/', icon: Home },
    { text: 'View Blog', path: '/blog', icon: FileText },
  ];

  const buttons = actionButtons.length > 0 ? actionButtons : defaultButtons;

  // Auto-redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(redirectTo);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, redirectTo]);

  const getIconColor = () => {
    switch (type) {
      case 'error':
        return isDark ? 'text-red-400' : 'text-red-600';
      case 'warning':
        return isDark ? 'text-yellow-400' : 'text-yellow-600';
      case 'info':
        return isDark ? 'text-blue-400' : 'text-blue-600';
      default:
        return isDark ? 'text-green-400' : 'text-green-600';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'error':
        return isDark ? 'bg-red-900/20' : 'bg-red-50';
      case 'warning':
        return isDark ? 'bg-yellow-900/20' : 'bg-yellow-50';
      case 'info':
        return isDark ? 'bg-blue-900/20' : 'bg-blue-50';
      default:
        return isDark ? 'bg-green-900/20' : 'bg-green-50';
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${
      isDark 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-lg w-full ${
          isDark 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        } rounded-3xl shadow-2xl overflow-hidden`}
      >
        {/* Success Animation Section */}
        <div className={`${getBgColor()} py-16 px-8 text-center relative overflow-hidden`}>
          {/* Animated circles */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 150 }}
            >
              <CheckCircle2 
                size={80} 
                className={`mx-auto ${getIconColor()}`}
              />
            </motion.div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className={`w-32 h-32 rounded-full ${isDark ? 'bg-green-500/10' : 'bg-green-500/20'} animate-pulse`} />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-2xl md:text-3xl font-black mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-base md:text-lg mb-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {message}
          </motion.p>

          {/* Auto-redirect indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`flex items-center justify-center gap-2 mb-8 text-sm ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            <Calendar size={16} />
            <span>Redirecting to home in {countdown} seconds...</span>
          </motion.div>

          {/* Action Buttons */}
          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {buttons.map((button, index) => {
                const Icon = button.icon || ArrowRight;
                return (
                  <Link
                    key={index}
                    to={button.path}
                    className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                      index === 0
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
                        : isDark
                          ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
                    }`}
                  >
                    <Icon size={18} />
                    {button.text}
                  </Link>
                );
              })}
            </motion.div>
          )}

          {/* Skip countdown button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={() => navigate(redirectTo)}
            className={`w-full mt-4 py-2 text-sm ${
              isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
            } transition-colors`}
          >
            Skip and go now →
          </motion.button>
        </div>

        {/* Footer decoration */}
        <div className={`h-2 ${
          type === 'error' 
            ? 'bg-red-500' 
            : type === 'warning'
              ? 'bg-yellow-500'
              : type === 'info'
                ? 'bg-blue-500'
                : 'bg-green-500'
        }`} />
      </motion.div>
    </div>
  );
};

export default SuccessPage;

// Helper function to navigate to success page with custom parameters
export const navigateToSuccess = (navigate, options = {}) => {
  navigate('/success', { state: options });
};
