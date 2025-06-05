
import { ComponentType, LazyExoticComponent, lazy } from 'react';

interface LazyLoadOptions {
  fallback?: ComponentType;
  preload?: boolean;
  retries?: number;
  delay?: number;
}

/**
 * Enhanced lazy loading with preloading and retry mechanisms
 */
export const createLazyComponent = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): LazyExoticComponent<T> => {
  const { retries = 3, delay = 1000 } = options;
  
  const enhancedFactory = async (): Promise<{ default: T }> => {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await factory();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retries) {
          console.warn(`Failed to load component (attempt ${attempt + 1}/${retries + 1}):`, error);
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
        }
      }
    }
    
    throw lastError!;
  };
  
  const LazyComponent = lazy(enhancedFactory);
  
  // Preload if requested
  if (options.preload) {
    setTimeout(() => {
      enhancedFactory().catch(() => {
        // Silently fail preload attempts
      });
    }, 100);
  }
  
  return LazyComponent;
};

/**
 * Preload multiple components
 */
export const preloadComponents = (factories: Array<() => Promise<any>>): void => {
  factories.forEach(factory => {
    setTimeout(() => {
      factory().catch(() => {
        // Silently fail preload attempts
      });
    }, Math.random() * 1000);
  });
};

/**
 * Smart preloading based on user interaction
 */
export const createSmartPreloader = () => {
  const preloadedRoutes = new Set<string>();
  
  return {
    preloadRoute: (routePath: string, factory: () => Promise<any>) => {
      if (preloadedRoutes.has(routePath)) return;
      
      preloadedRoutes.add(routePath);
      factory().catch(() => {
        preloadedRoutes.delete(routePath);
      });
    },
    
    onRouteHover: (routePath: string, factory: () => Promise<any>) => {
      setTimeout(() => {
        if (!preloadedRoutes.has(routePath)) {
          factory().catch(() => {});
        }
      }, 100);
    }
  };
};
