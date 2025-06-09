
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { imageOptimizer, ResponsiveImageSet } from '@/services/ImageOptimizer';
import { imageManager } from '@/services/ImageManager';
import { useImageAnalytics } from '@/hooks/useImageAnalytics';
import { toAbsoluteURL } from '@/utils/urlUtils';

interface ProgressiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  maxWidth?: number;
  aspectRatio?: number;
  priority?: boolean;
  showSkeleton?: boolean;
  skeletonClassName?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onLoadStart?: () => void;
  enableAnalytics?: boolean;
}

type LoadingStage = 'skeleton' | 'placeholder' | 'lowQuality' | 'highQuality' | 'complete';

export const ProgressiveImage = forwardRef<HTMLImageElement, ProgressiveImageProps>(({
  src,
  alt,
  maxWidth = 1200,
  aspectRatio,
  priority = false,
  showSkeleton = true,
  skeletonClassName,
  onLoad,
  onError,
  onLoadStart,
  enableAnalytics = true,
  className,
  style,
  ...props
}, ref) => {
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('skeleton');
  const [responsiveSet, setResponsiveSet] = useState<ResponsiveImageSet | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
  const [lowQualityLoaded, setLowQualityLoaded] = useState(false);
  const [highQualityLoaded, setHighQualityLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { trackLoadStart, trackLoadSuccess, trackLoadError } = useImageAnalytics(src, {
    enabled: enableAnalytics
  });

  // Generate responsive image set
  useEffect(() => {
    if (!src) return;

    imageOptimizer.generateResponsiveSet(src, maxWidth, aspectRatio)
      .then(set => {
        setResponsiveSet(set);
        setLoadingStage('placeholder');
      })
      .catch(err => {
        console.error('Failed to generate responsive set:', err);
        setError(err);
        onError?.(err);
      });
  }, [src, maxWidth, aspectRatio, onError]);

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && responsiveSet) {
          startProgressiveLoading();
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
  }, [priority, responsiveSet]);

  // Start loading immediately if priority or when responsive set is ready
  useEffect(() => {
    if (priority && responsiveSet) {
      startProgressiveLoading();
    }
  }, [priority, responsiveSet]);

  const startProgressiveLoading = () => {
    if (!responsiveSet) return;

    // Stage 1: Load placeholder
    loadImageWithAnalytics(responsiveSet.placeholder, true)
      .then(() => {
        setCurrentSrc(responsiveSet.placeholder);
        setLoadingStage('lowQuality');
        
        // Stage 2: Load low quality
        const lowQualityUrl = responsiveSet.lowQuality[0]?.url;
        if (lowQualityUrl) {
          return loadImageWithAnalytics(lowQualityUrl, true);
        }
      })
      .then(() => {
        if (responsiveSet.lowQuality[0]?.url) {
          setCurrentSrc(responsiveSet.lowQuality[0].url);
          setLoadingStage('highQuality');
        }
        
        // Stage 3: Load high quality
        const highQualityUrl = responsiveSet.highQuality[0]?.url;
        if (highQualityUrl) {
          return loadImageWithAnalytics(highQualityUrl, false);
        }
      })
      .then(() => {
        if (responsiveSet.highQuality[0]?.url) {
          setCurrentSrc(responsiveSet.highQuality[0].url);
          setLoadingStage('complete');
          onLoad?.();
        }
      })
      .catch(err => {
        console.error('Progressive loading failed:', err);
        setError(err);
        onError?.(err);
        
        // Fallback to original image
        setCurrentSrc(src);
        setLoadingStage('complete');
      });
  };

  // Enhanced image loading with analytics
  const loadImageWithAnalytics = async (imageUrl: string, isLowQuality: boolean = false) => {
    if (!imageUrl) return null;

    try {
      setIsLoading(true);
      if (enableAnalytics) {
        trackLoadStart();
      }
      onLoadStart?.();

      const startTime = performance.now();
      const optimizedUrl = await imageManager.loadImage(imageUrl, {
        priority: priority ? 'high' : 'medium',
        quality: isLowQuality ? 'low' : 'high'
      });

      const loadTime = performance.now() - startTime;
      
      // Get file size from response headers if available
      let fileSize = 0;
      try {
        const response = await fetch(optimizedUrl, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        fileSize = contentLength ? parseInt(contentLength) : 0;
      } catch (e) {
        // Ignore errors getting file size
      }

      if (enableAnalytics) {
        trackLoadSuccess(
          fileSize,
          imageUrl.includes('.webp') ? 'webp' : 
          imageUrl.includes('.avif') ? 'avif' : 'jpeg',
          optimizedUrl.includes('cache'),
          priority ? 'high' : 'medium'
        );
      }

      return optimizedUrl;
    } catch (error) {
      console.error('Error loading image:', error);
      if (enableAnalytics) {
        trackLoadError(error as Error);
      }
      onError?.(error as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Set up image loading with loadImageWithAnalytics instead of loadImage
  useEffect(() => {
    let isMounted = true;

    const loadImages = async () => {
      if (!responsiveSet || !isMounted) return;

      try {
        // Load placeholder first
        if (responsiveSet.placeholder && !placeholderLoaded) {
          const placeholderUrl = await loadImageWithAnalytics(responsiveSet.placeholder, true);
          if (isMounted && placeholderUrl) {
            setCurrentSrc(placeholderUrl);
            setPlaceholderLoaded(true);
          }
        }

        // Load low quality version
        if (responsiveSet.lowQuality.length > 0 && !lowQualityLoaded) {
          const lowQualityUrl = await loadImageWithAnalytics(responsiveSet.lowQuality[0].url, true);
          if (isMounted && lowQualityUrl) {
            setCurrentSrc(lowQualityUrl);
            setLowQualityLoaded(true);
          }
        }

        // Load high quality version
        if (responsiveSet.highQuality.length > 0) {
          const highQualityUrl = await loadImageWithAnalytics(responsiveSet.highQuality[0].url, false);
          if (isMounted && highQualityUrl) {
            setCurrentSrc(highQualityUrl);
            setHighQualityLoaded(true);
            setIsLoading(false);
            onLoad?.();
          }
        }
      } catch (error) {
        console.error('Error in loadImages:', error);
        if (isMounted) {
          setError(error as Error);
          onError?.(error as Error);
        }
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [responsiveSet, placeholderLoaded, lowQualityLoaded, onLoad, onError]);

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: aspectRatio || 'auto' }}>
      {showSkeleton && isLoading && !currentSrc && (
        <Skeleton className={`absolute inset-0 ${skeletonClassName}`} />
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
      
      {currentSrc && (
        <motion.img
          ref={ref}
          src={currentSrc}
          alt={alt}
          className={className}
          style={style}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          {...(props as any)}
        />
      )}
    </div>
  );
});

ProgressiveImage.displayName = 'ProgressiveImage';
