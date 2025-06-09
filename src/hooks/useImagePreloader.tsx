
import { useEffect, useRef } from 'react';
import { imageManager } from '@/services/ImageManager';

interface UseImagePreloaderOptions {
  enabled?: boolean;
  priority?: 'high' | 'medium' | 'low';
  delay?: number;
}

export const useImagePreloader = (
  urls: string[],
  options: UseImagePreloaderOptions = {}
) => {
  const { enabled = true, priority = 'low', delay = 100 } = options;
  const preloadedRef = useRef(new Set<string>());

  useEffect(() => {
    if (!enabled || urls.length === 0) return;

    const newUrls = urls.filter(url => !preloadedRef.current.has(url));
    if (newUrls.length === 0) return;

    const timeoutId = setTimeout(() => {
      imageManager.preloadImages(newUrls, { priority })
        .then(() => {
          newUrls.forEach(url => preloadedRef.current.add(url));
        })
        .catch(console.error);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [urls, enabled, priority, delay]);

  return {
    preloadedCount: preloadedRef.current.size,
    isPreloading: urls.some(url => !preloadedRef.current.has(url))
  };
};
