import { useEffect, useRef, useCallback } from 'react';
import { useLoading } from '../context/LoadingContext';

/**
 * Custom hook for automatic background refresh functionality.
 * Triggers the loading overlay when auto-refresh occurs.
 * 
 * @param {Function} refreshFunction - The async function to call for refresh
 * @param {number} intervalMs - Interval in milliseconds between refreshes (default: 300000 = 5 min)
 * @param {boolean} enabled - Whether auto-refresh is enabled (default: true)
 */
const useAutoRefresh = (refreshFunction, intervalMs = 300000, enabled = true) => {
  const { startRefreshing, stopRefreshing, isRefreshing } = useLoading();
  const intervalRef = useRef(null);
  const refreshFunctionRef = useRef(refreshFunction);

  // Update ref when refreshFunction changes
  useEffect(() => {
    refreshFunctionRef.current = refreshFunction;
  }, [refreshFunction]);

  const triggerRefresh = useCallback(async () => {
    if (refreshFunctionRef.current && !isRefreshing) {
      startRefreshing('Refreshing data...');
      try {
        await refreshFunctionRef.current();
      } catch (error) {
        console.error('Auto-refresh error:', error);
      } finally {
        stopRefreshing();
      }
    }
  }, [startRefreshing, stopRefreshing, isRefreshing]);

  const startAutoRefresh = useCallback(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval
    if (enabled && intervalMs > 0) {
      intervalRef.current = setInterval(triggerRefresh, intervalMs);
    }
  }, [enabled, intervalMs, triggerRefresh]);

  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start auto-refresh on mount if enabled
  useEffect(() => {
    if (enabled) {
      startAutoRefresh();
    }

    // Cleanup on unmount or when disabled
    return () => {
      stopAutoRefresh();
    };
  }, [enabled, startAutoRefresh, stopAutoRefresh]);

  // Also allow manual trigger
  const refreshNow = useCallback(async () => {
    await triggerRefresh();
  }, [triggerRefresh]);

  return {
    refreshNow,
    startAutoRefresh,
    stopAutoRefresh
  };
};

export default useAutoRefresh;