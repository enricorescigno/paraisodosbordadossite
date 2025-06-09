
import { useState, useEffect, useCallback } from 'react';
import { imageAnalytics } from '@/services/ImageAnalytics';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  loadTime: number;
  cacheEfficiency: number;
  errorRate: number;
  bandwidthUsage: number;
}

interface UsePerformanceMonitorOptions {
  enabled?: boolean;
  interval?: number;
  alertThresholds?: {
    fps?: number;
    memory?: number;
    errorRate?: number;
  };
}

export const usePerformanceMonitor = (options: UsePerformanceMonitorOptions = {}) => {
  const { 
    enabled = true, 
    interval = 5000,
    alertThresholds = { fps: 30, memory: 50, errorRate: 5 }
  } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: 0,
    loadTime: 0,
    cacheEfficiency: 0,
    errorRate: 0,
    bandwidthUsage: 0
  });

  const [alerts, setAlerts] = useState<string[]>([]);

  // FPS monitoring
  const measureFPS = useCallback(() => {
    let frames = 0;
    let lastTime = performance.now();
    
    const countFrame = () => {
      frames++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        
        if (fps < alertThresholds.fps!) {
          setAlerts(prev => [...prev, `Low FPS detected: ${fps}`]);
        }
        
        frames = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(countFrame);
    };
    
    requestAnimationFrame(countFrame);
  }, [alertThresholds.fps]);

  // Memory monitoring
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory;
      const memoryUsage = (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100;
      
      setMetrics(prev => ({ ...prev, memory: memoryUsage }));
      
      if (memoryUsage > alertThresholds.memory!) {
        setAlerts(prev => [...prev, `High memory usage: ${memoryUsage.toFixed(1)}%`]);
      }
    }
  }, [alertThresholds.memory]);

  // Update image performance metrics
  const updateImageMetrics = useCallback(() => {
    const report = imageAnalytics.generateReport();
    
    setMetrics(prev => ({
      ...prev,
      loadTime: report.averageLoadTime,
      cacheEfficiency: report.cacheHitRate,
      errorRate: report.errorRate,
      bandwidthUsage: report.bandwidthSaved
    }));

    if (report.errorRate > alertThresholds.errorRate!) {
      setAlerts(prev => [...prev, `High error rate: ${report.errorRate.toFixed(1)}%`]);
    }
  }, [alertThresholds.errorRate]);

  // Performance optimization suggestions
  const getOptimizationSuggestions = useCallback(() => {
    const suggestions: string[] = [];
    
    if (metrics.fps < 30) {
      suggestions.push('Consider reducing animation complexity or using CSS transforms');
    }
    
    if (metrics.memory > 50) {
      suggestions.push('Consider implementing image cleanup or reducing cache size');
    }
    
    if (metrics.loadTime > 1000) {
      suggestions.push('Consider implementing progressive loading or reducing image sizes');
    }
    
    if (metrics.cacheEfficiency < 70) {
      suggestions.push('Consider improving cache strategy or preloading critical images');
    }
    
    if (metrics.errorRate > 5) {
      suggestions.push('Consider implementing better error handling and retry mechanisms');
    }
    
    return suggestions;
  }, [metrics]);

  // Clear alerts
  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  // Export performance report
  const exportReport = useCallback(() => {
    const report = {
      timestamp: new Date().toISOString(),
      metrics,
      alerts,
      suggestions: getOptimizationSuggestions(),
      imageAnalytics: imageAnalytics.generateReport()
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [metrics, alerts, getOptimizationSuggestions]);

  useEffect(() => {
    if (!enabled) return;

    measureFPS();
    
    const memoryInterval = setInterval(measureMemory, interval);
    const imageInterval = setInterval(updateImageMetrics, interval);

    return () => {
      clearInterval(memoryInterval);
      clearInterval(imageInterval);
    };
  }, [enabled, interval, measureFPS, measureMemory, updateImageMetrics]);

  return {
    metrics,
    alerts,
    suggestions: getOptimizationSuggestions(),
    clearAlerts,
    exportReport
  };
};
