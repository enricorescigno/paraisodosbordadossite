
import { useEffect, useRef, useCallback, useMemo } from 'react';

interface UsePerformanceOptimizedOptions {
  enableRAF?: boolean;
  debounceMs?: number;
  throttleMs?: number;
}

export const usePerformanceOptimized = (options: UsePerformanceOptimizedOptions = {}) => {
  const { enableRAF = true, debounceMs = 300, throttleMs = 16 } = options;
  const rafIdRef = useRef<number | null>(null);
  const lastCallRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Request Animation Frame optimization
  const scheduleRAF = useCallback((callback: () => void) => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    
    if (enableRAF) {
      rafIdRef.current = requestAnimationFrame(callback);
    } else {
      callback();
    }
  }, [enableRAF]);

  // Throttle function
  const throttle = useCallback((callback: () => void) => {
    const now = Date.now();
    if (now - lastCallRef.current >= throttleMs) {
      lastCallRef.current = now;
      scheduleRAF(callback);
    }
  }, [throttleMs, scheduleRAF]);

  // Debounce function
  const debounce = useCallback((callback: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      scheduleRAF(callback);
    }, debounceMs);
  }, [debounceMs, scheduleRAF]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Memory optimization for large arrays
  const memoizeArray = useCallback(<T,>(array: T[], keyFn?: (item: T) => string | number) => {
    return useMemo(() => {
      if (keyFn) {
        return array.map((item, index) => ({ ...item, _key: keyFn(item) || index }));
      }
      return array;
    }, [array, keyFn]);
  }, []);

  return {
    scheduleRAF,
    throttle,
    debounce,
    memoizeArray
  };
};
