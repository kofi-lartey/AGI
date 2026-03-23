import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const startLoading = useCallback((message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
  }, []);

  const value = {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// HOC for adding loading state to navigation links
export function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const { startLoading, stopLoading } = useLoading();
    const { onClick, to, href, ...rest } = props;

    const handleClick = (e) => {
      // Only add loading for navigation links
      if (to || href) {
        startLoading();
        // Small delay to allow loading animation to start
        setTimeout(() => {
          if (onClick) {
            onClick(e);
          }
        }, 100);
      } else if (onClick) {
        onClick(e);
      }
    };

    return <WrappedComponent {...rest} onClick={handleClick} />;
  };
}
