
import { useEffect, useRef } from 'react';
import { useSmartPreloader } from '@/hooks/useSmartPreloader';
import { useAdaptiveLoading } from '@/hooks/useAdaptiveLoading';

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
  const { shouldPreloadImages, getPreloadCount } = useAdaptiveLoading();

  // Limit URLs based on connection quality
  const maxUrls = getPreloadCount();
  const limitedUrls = urls.slice(0, maxUrls);

  const { loadedUrls, isLoading, progress } = useSmartPreloader({
    urls: limitedUrls,
    enabled: enabled && shouldPreloadImages(),
    priority,
    delay,
    maxConcurrent: 2
  });

  return {
    preloadedCount: loadedUrls.size,
    isPreloading: isLoading,
    progress,
    totalUrls: limitedUrls.length
  };
};
