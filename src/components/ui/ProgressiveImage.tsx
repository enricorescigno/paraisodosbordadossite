
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { imageOptimizer, type ResponsiveImageSet } from '@/services/ImageOptimizer';
import { Skeleton } from '@/components/ui/skeleton';

interface ProgressiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> {
  src: string;
  alt: string;
  maxWidth?: number;
  aspectRatio?: number;
  priority?: boolean;
  showSkeleton?: boolean;
  skeletonClassName?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

type LoadingStage = 'skeleton' | 'placeholder' | 'lowQuality' | 'highQuality' | 'complete';

export const ProgressiveImage = React.forwardRef<HTMLImageElement, ProgressiveImageProps>(({
  src,
  alt,
  maxWidth = 1200,
  aspectRatio,
  priority = false,
  showSkeleton = true,
  skeletonClassName,
  onLoad,
  onError,
  className,
  style,
  ...props
}, ref) => {
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('skeleton');
  const [responsiveSet, setResponsiveSet] = useState<ResponsiveImageSet | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [error, setError] = useState<Error | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
    loadImage(responsiveSet.placeholder)
      .then(() => {
        setCurrentImageUrl(responsiveSet.placeholder);
        setLoadingStage('lowQuality');
        
        // Stage 2: Load low quality
        const lowQualityUrl = responsiveSet.lowQuality[0]?.url;
        if (lowQualityUrl) {
          return loadImage(lowQualityUrl);
        }
      })
      .then(() => {
        if (responsiveSet.lowQuality[0]?.url) {
          setCurrentImageUrl(responsiveSet.lowQuality[0].url);
          setLoadingStage('highQuality');
        }
        
        // Stage 3: Load high quality
        const highQualityUrl = responsiveSet.highQuality[0]?.url;
        if (highQualityUrl) {
          return loadImage(highQualityUrl);
        }
      })
      .then(() => {
        if (responsiveSet.highQuality[0]?.url) {
          setCurrentImageUrl(responsiveSet.highQuality[0].url);
          setLoadingStage('complete');
          onLoad?.();
        }
      })
      .catch(err => {
        console.error('Progressive loading failed:', err);
        setError(err);
        onError?.(err);
        
        // Fallback to original image
        setCurrentImageUrl(src);
        setLoadingStage('complete');
      });
  };

  const loadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load: ${url}`));
      img.src = url;
    });
  };

  const getImageOpacity = () => {
    switch (loadingStage) {
      case 'skeleton':
      case 'placeholder':
        return 0.6;
      case 'lowQuality':
        return 0.8;
      case 'highQuality':
      case 'complete':
        return 1;
      default:
        return 0;
    }
  };

  const getImageFilter = () => {
    switch (loadingStage) {
      case 'placeholder':
        return 'blur(8px)';
      case 'lowQuality':
        return 'blur(2px)';
      default:
        return 'none';
    }
  };

  return (
    <div className="relative overflow-hidden" style={style}>
      <AnimatePresence>
        {showSkeleton && loadingStage === 'skeleton' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Skeleton className={`w-full h-full ${skeletonClassName || ''}`} />
          </motion.div>
        )}
      </AnimatePresence>

      {currentImageUrl && (
        <img
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            if (imgRef) {
              imgRef.current = node;
            }
          }}
          src={currentImageUrl}
          srcSet={loadingStage === 'complete' ? responsiveSet?.srcSet : undefined}
          sizes={loadingStage === 'complete' ? responsiveSet?.sizes : undefined}
          alt={alt}
          className={className}
          style={{
            opacity: getImageOpacity(),
            filter: getImageFilter(),
            transition: 'opacity 0.3s ease, filter 0.3s ease'
          }}
          {...props}
        />
      )}

      {error && !currentImageUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Erro ao carregar imagem
        </div>
      )}
    </div>
  );
});

ProgressiveImage.displayName = 'ProgressiveImage';
