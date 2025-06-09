
import { useEffect, useRef, useState } from 'react';
import { imageManager } from '@/services/ImageManager';

interface UseSmartPreloaderOptions {
  urls: string[];
  enabled?: boolean;
  priority?: 'high' | 'medium' | 'low';
  maxConcurrent?: number;
  delay?: number;
}

export const useSmartPreloader = (options: UseSmartPreloaderOptions) => {
  const {
    urls,
    enabled = true,
    priority = 'medium',
    maxConcurrent = 3,
    delay = 100
  } = options;

  const [loadedUrls, setLoadedUrls] = useState<Set<string>>(new Set());
  const [loadingUrls, setLoadingUrls] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Map<string, Error>>(new Map());
  const queueRef = useRef<string[]>([]);
  const activeLoadsRef = useRef<Set<string>>(new Set());

  const processQueue = async () => {
    if (activeLoadsRef.current.size >= maxConcurrent || queueRef.current.length === 0) {
      return;
    }

    const url = queueRef.current.shift();
    if (!url || loadedUrls.has(url) || activeLoadsRef.current.has(url)) {
      processQueue(); // Try next item
      return;
    }

    activeLoadsRef.current.add(url);
    setLoadingUrls(prev => new Set(prev).add(url));

    try {
      await imageManager.loadImage(url, { priority });
      
      setLoadedUrls(prev => new Set(prev).add(url));
      setErrors(prev => {
        const newErrors = new Map(prev);
        newErrors.delete(url);
        return newErrors;
      });
    } catch (error) {
      setErrors(prev => new Map(prev).set(url, error as Error));
    } finally {
      activeLoadsRef.current.delete(url);
      setLoadingUrls(prev => {
        const newLoading = new Set(prev);
        newLoading.delete(url);
        return newLoading;
      });
      
      // Process next item in queue
      setTimeout(processQueue, 50);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    // Add new URLs to queue
    const newUrls = urls.filter(url => 
      !loadedUrls.has(url) && 
      !loadingUrls.has(url) && 
      !queueRef.current.includes(url)
    );

    queueRef.current.push(...newUrls);

    // Start processing with delay
    const timeoutId = setTimeout(processQueue, delay);

    return () => clearTimeout(timeoutId);
  }, [urls, enabled, priority, delay]);

  return {
    loadedUrls,
    loadingUrls,
    errors,
    progress: urls.length > 0 ? loadedUrls.size / urls.length : 0,
    isLoading: loadingUrls.size > 0 || queueRef.current.length > 0
  };
};
