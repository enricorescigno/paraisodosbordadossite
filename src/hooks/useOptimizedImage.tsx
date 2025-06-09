
import { useState, useEffect, useRef } from 'react';
import { imageManager } from '@/services/ImageManager';

interface UseOptimizedImageOptions {
  priority?: 'high' | 'medium' | 'low';
  eager?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const useOptimizedImage = (url: string, options: UseOptimizedImageOptions = {}) => {
  const [src, setSrc] = useState<string>(options.placeholder || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isInView, setIsInView] = useState(options.eager || false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (options.eager || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [options.eager]);

  // Load image when in view
  useEffect(() => {
    if (!url || !isInView) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    imageManager.loadImage(url, {
      priority: options.priority,
      eager: options.eager
    })
      .then((optimizedSrc) => {
        if (!cancelled) {
          setSrc(optimizedSrc);
          setIsLoading(false);
          options.onLoad?.();
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
          options.onError?.(err);
          
          // Fallback to original URL
          setSrc(url);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url, isInView, options.priority, options.eager]);

  return {
    src,
    isLoading,
    error,
    ref: imgRef
  };
};
