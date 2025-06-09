
import { useState, useEffect, useCallback } from 'react';
import { imageManager } from '@/services/ImageManager';
import { usePerformanceOptimized } from '@/hooks/usePerformanceOptimized';

interface BatchOptimizationOptions {
  batchSize?: number;
  delay?: number;
  priority?: 'high' | 'medium' | 'low';
  quality?: 'low' | 'medium' | 'high';
}

export const useBatchImageOptimization = (
  imageUrls: string[],
  options: BatchOptimizationOptions = {}
) => {
  const { batchSize = 5, delay = 100, priority = 'medium', quality = 'high' } = options;
  const [optimizedImages, setOptimizedImages] = useState<Map<string, string>>(new Map());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const { scheduleRAF } = usePerformanceOptimized();

  const processBatch = useCallback(async (urls: string[], startIndex: number) => {
    const batch = urls.slice(startIndex, startIndex + batchSize);
    
    if (batch.length === 0) return;

    // Mark images as loading
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      batch.forEach(url => newSet.add(url));
      return newSet;
    });

    try {
      // Process batch in parallel
      const results = await Promise.allSettled(
        batch.map(async (url) => {
          const optimizedUrl = await imageManager.loadImage(url, { priority, quality });
          return { original: url, optimized: optimizedUrl };
        })
      );

      // Update state with successful results
      scheduleRAF(() => {
        setOptimizedImages(prev => {
          const newMap = new Map(prev);
          results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
              newMap.set(result.value.original, result.value.optimized);
            }
          });
          return newMap;
        });

        setLoadingImages(prev => {
          const newSet = new Set(prev);
          batch.forEach(url => newSet.delete(url));
          return newSet;
        });

        setProgress((startIndex + batch.length) / urls.length);
      });

      // Process next batch with delay
      if (startIndex + batchSize < urls.length) {
        setTimeout(() => {
          processBatch(urls, startIndex + batchSize);
        }, delay);
      }
    } catch (error) {
      console.error('Batch processing error:', error);
      
      // Remove from loading set even on error
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        batch.forEach(url => newSet.delete(url));
        return newSet;
      });
    }
  }, [batchSize, delay, priority, quality, scheduleRAF]);

  useEffect(() => {
    if (imageUrls.length === 0) return;

    // Reset state
    setOptimizedImages(new Map());
    setLoadingImages(new Set());
    setProgress(0);

    // Start batch processing
    processBatch(imageUrls, 0);
  }, [imageUrls, processBatch]);

  const getOptimizedUrl = useCallback((originalUrl: string) => {
    return optimizedImages.get(originalUrl) || originalUrl;
  }, [optimizedImages]);

  const isLoading = useCallback((url: string) => {
    return loadingImages.has(url);
  }, [loadingImages]);

  return {
    optimizedImages,
    getOptimizedUrl,
    isLoading,
    progress,
    isComplete: progress === 1 && loadingImages.size === 0
  };
};
