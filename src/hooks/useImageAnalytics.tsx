
import { useEffect, useRef, useCallback } from 'react';
import { imageAnalytics } from '@/services/ImageAnalytics';

interface UseImageAnalyticsOptions {
  enabled?: boolean;
  trackViewport?: boolean;
  trackPerformance?: boolean;
}

export const useImageAnalytics = (
  url: string,
  options: UseImageAnalyticsOptions = {}
) => {
  const { enabled = true, trackViewport = true, trackPerformance = true } = options;
  const startTimeRef = useRef<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  // Track image load start
  const trackLoadStart = useCallback(() => {
    if (enabled) {
      startTimeRef.current = performance.now();
    }
  }, [enabled]);

  // Track successful image load
  const trackLoadSuccess = useCallback((
    fileSize: number,
    format: string,
    cacheHit: boolean = false,
    priority: 'high' | 'medium' | 'low' = 'medium'
  ) => {
    if (enabled && startTimeRef.current > 0) {
      const loadTime = performance.now() - startTimeRef.current;
      
      imageAnalytics.trackImageLoad(url, {
        fileSize,
        format,
        cacheHit,
        viewport: elementRef.current ? isInViewport(elementRef.current) : false,
        priority,
        loadTime
      });
    }
  }, [enabled, url]);

  // Track image load error
  const trackLoadError = useCallback((error: Error) => {
    if (enabled) {
      imageAnalytics.trackImageError(url, error);
    }
  }, [enabled, url]);

  // Track image retry
  const trackRetry = useCallback(() => {
    if (enabled) {
      imageAnalytics.trackImageRetry(url);
    }
  }, [enabled, url]);

  // Set up viewport tracking
  useEffect(() => {
    if (!enabled || !trackViewport) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(`Image entered viewport: ${url}`);
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [enabled, trackViewport, url]);

  // Attach element ref for viewport tracking
  const attachRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  return {
    trackLoadStart,
    trackLoadSuccess,
    trackLoadError,
    trackRetry,
    attachRef
  };
};

// Helper function to check if element is in viewport
function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
