
import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '../stores/useAppStore';

interface UseImageOptimizationOptions {
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const useImageOptimization = (src: string, options: UseImageOptimizationOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(options.priority || false);
  
  const { isImageLoaded, setImageCached, setImageError } = useAppStore();

  // Check if image is already cached
  const isCached = isImageLoaded(src);

  // Optimize image URL - remove WebP conversion that was causing issues
  const getOptimizedUrl = useCallback((url: string) => {
    if (!url || url.startsWith('data:') || url.includes('unsplash.com')) {
      return url;
    }
    
    // Just return the original URL without WebP conversion
    return url.startsWith('/') ? url : `/${url}`;
  }, []);

  const optimizedSrc = getOptimizedUrl(src);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    setImageCached(src);
    options.onLoad?.();
  }, [src, setImageCached, options.onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setHasError(true);
    setImageError(src);
    options.onError?.();
  }, [src, setImageError, options.onError]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (options.priority || isInView) return;

    let observer: IntersectionObserver;
    let currentElement: Element | null = null;

    const setupObserver = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: '50px', threshold: 0.1 }
      );
    };

    // Find image element in DOM
    const findImageElement = () => {
      const elements = document.querySelectorAll(`img[data-src="${src}"]`);
      return elements[0] || null;
    };

    const startObserving = () => {
      currentElement = findImageElement();
      if (currentElement) {
        setupObserver();
        observer.observe(currentElement);
      }
    };

    // Retry finding element
    const timer = setTimeout(startObserving, 100);

    return () => {
      clearTimeout(timer);
      if (observer && currentElement) {
        observer.unobserve(currentElement);
        observer.disconnect();
      }
    };
  }, [src, options.priority, isInView]);

  return {
    src: optimizedSrc,
    isLoaded: isCached || isLoaded,
    hasError,
    isInView: isInView || options.priority || false,
    handleLoad,
    handleError
  };
};
