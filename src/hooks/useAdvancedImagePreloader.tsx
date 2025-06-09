
import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';
import { useViewportPriority } from './useViewportPriority';
import { useSmartPreloader } from './useSmartPreloader';
import { useAdaptiveLoading } from './useAdaptiveLoading';

interface UseAdvancedImagePreloaderOptions {
  images: string[];
  currentIndex?: number;
  enabled?: boolean;
  strategy?: 'viewport' | 'sequential' | 'smart';
}

export const useAdvancedImagePreloader = (options: UseAdvancedImagePreloaderOptions) => {
  const {
    images,
    currentIndex = 0,
    enabled = true,
    strategy = 'smart'
  } = options;

  const { loadingStrategy, getPreloadCount, shouldPreloadImages } = useAdaptiveLoading();
  const [preloadUrls, setPreloadUrls] = useState<string[]>([]);

  // Smart preloader based on current position and connection
  const { loadedUrls, isLoading, progress } = useSmartPreloader({
    urls: preloadUrls,
    enabled: enabled && shouldPreloadImages(),
    priority: currentIndex === 0 ? 'high' : 'medium',
    maxConcurrent: loadingStrategy === 'aggressive' ? 5 : 2
  });

  useEffect(() => {
    if (!enabled || images.length === 0) return;

    const preloadCount = getPreloadCount();
    let urlsToPreload: string[] = [];

    switch (strategy) {
      case 'viewport':
        // Preload images around current position
        const start = Math.max(0, currentIndex - 1);
        const end = Math.min(images.length, currentIndex + preloadCount);
        urlsToPreload = images.slice(start, end);
        break;

      case 'sequential':
        // Preload next images in sequence
        urlsToPreload = images.slice(currentIndex, currentIndex + preloadCount);
        break;

      case 'smart':
      default:
        // Smart strategy: prioritize current and nearby images
        const smartStart = Math.max(0, currentIndex - 1);
        const smartEnd = Math.min(images.length, currentIndex + preloadCount + 1);
        urlsToPreload = images.slice(smartStart, smartEnd);
        
        // Add critical next image if not already included
        if (currentIndex + 1 < images.length && !urlsToPreload.includes(images[currentIndex + 1])) {
          urlsToPreload.unshift(images[currentIndex + 1]);
        }
        break;
    }

    setPreloadUrls(urlsToPreload);
  }, [images, currentIndex, enabled, strategy, loadingStrategy]);

  return {
    loadedUrls,
    isLoading,
    progress,
    preloadedCount: loadedUrls.size,
    strategy: loadingStrategy
  };
};
