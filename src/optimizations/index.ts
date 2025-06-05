
// Performance optimized exports
export { default as OptimizedImage } from '../components/ui/OptimizedImage';
export { default as OptimizedGallery } from '../components/product/ProductImageGallery/OptimizedGallery';
export { default as LazyRoute } from '../components/LazyRoute';

// Optimized hooks
export { useOptimizedProducts, useOptimizedProduct } from '../hooks/useOptimizedProducts';
export { usePerformanceMonitoring, useWebVitals } from '../hooks/usePerformanceMonitoring';

// Optimized store
export { useAppStore, useProducts, useSelectedProduct, useProductLoading, useProductError, useFilteredProducts, useImageCache } from '../stores/useAppStore';

// Performance utilities
export const preloadRoute = (routeImport: () => Promise<any>) => {
  // Preload route component during idle time
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      routeImport().catch(() => {
        // Silently fail preload attempts
      });
    });
  } else {
    setTimeout(() => {
      routeImport().catch(() => {});
    }, 100);
  }
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
