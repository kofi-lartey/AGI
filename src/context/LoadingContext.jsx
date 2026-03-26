import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState('');

  // General loading (for page navigation, etc.)
  const startLoading = useCallback((message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
    setIsRefreshing(false);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
    setIsRefreshing(false);
  }, []);

  // Refresh-specific loading (for data refresh operations)
  const startRefreshing = useCallback((message = 'Refreshing...') => {
    setRefreshMessage(message);
    setIsRefreshing(true);
    setIsLoading(false);
  }, []);

  const stopRefreshing = useCallback(() => {
    setIsRefreshing(false);
    setRefreshMessage('');
  }, []);

  // Combined loading state check
  const isAnyLoading = isLoading || isRefreshing;
  const currentMessage = isRefreshing ? refreshMessage : loadingMessage;

  const value = {
    isLoading: isAnyLoading,
    loadingMessage: currentMessage,
    isRefreshing,
    refreshMessage,
    startLoading,
    stopLoading,
    startRefreshing,
    stopRefreshing
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
