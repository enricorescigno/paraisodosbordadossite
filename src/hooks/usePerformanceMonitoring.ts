
import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

export const usePerformanceMonitoring = (componentName: string, enabled = process.env.NODE_ENV === 'development') => {
  const renderStartTime = useRef<number>(performance.now());
  const renderCount = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    renderCount.current += 1;
    const renderTime = performance.now() - renderStartTime.current;

    // Log slow renders (> 16ms for 60fps)
    if (renderTime > 16) {
      console.warn(`⚠️ Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
    }

    // Log render metrics
    const metrics: PerformanceMetrics = {
      renderTime,
      componentName,
      timestamp: Date.now(),
    };

    // Store metrics for potential analysis
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${componentName}-render-${renderCount.current}`);
    }

    // Reset for next render
    renderStartTime.current = performance.now();
  });

  const measureAction = (actionName: string) => {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      if (enabled && duration > 5) {
        console.log(`⏱️ ${componentName}.${actionName}: ${duration.toFixed(2)}ms`);
      }
      return duration;
    };
  };

  return { measureAction };
};

// Web Vitals monitoring hook
export const useWebVitals = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const { name, startTime } = entry;
        
        switch (name) {
          case 'largest-contentful-paint':
            console.log(`🎯 LCP: ${startTime.toFixed(0)}ms`);
            break;
          case 'first-input-delay':
            console.log(`⚡ FID: ${(entry as any).processingStart - startTime}ms`);
            break;
          case 'cumulative-layout-shift':
            if (!(entry as any).hadRecentInput) {
              console.log(`📐 CLS: ${(entry as any).value}`);
            }
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      // Some browsers might not support all entry types
    }

    return () => observer.disconnect();
  }, []);
};
