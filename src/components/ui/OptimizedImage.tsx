
import React, { forwardRef } from 'react';
import { ProgressiveImage } from '@/components/ui/ProgressiveImage';
import { useImageAnalytics } from '@/hooks/useImageAnalytics';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'loading'> {
  src: string;
  alt: string;
  priority?: 'high' | 'medium' | 'low';
  eager?: boolean;
  placeholder?: string;
  showSkeleton?: boolean;
  skeletonClassName?: string;
  maxWidth?: number;
  aspectRatio?: number;
  onImageLoad?: () => void;
  onImageError?: (error: Error) => void;
  enableAnalytics?: boolean;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(({
  src,
  alt,
  priority = 'medium',
  eager = false,
  placeholder,
  showSkeleton = true,
  skeletonClassName,
  maxWidth = 1200,
  aspectRatio,
  onImageLoad,
  onImageError,
  enableAnalytics = true,
  className,
  style,
  ...props
}, forwardedRef) => {
  const isPriority = priority === 'high' || eager;
  
  const { trackLoadStart, trackLoadSuccess, trackLoadError, attachRef } = useImageAnalytics(src, {
    enabled: enableAnalytics,
    trackViewport: true,
    trackPerformance: true
  });

  const handleLoad = () => {
    trackLoadSuccess(0, 'unknown', false, priority); // File size would be detected in ProgressiveImage
    onImageLoad?.();
  };

  const handleError = () => {
    const error = new Error(`Failed to load image: ${src}`);
    trackLoadError(error);
    onImageError?.(error);
  };

  const handleLoadStart = () => {
    trackLoadStart();
  };

  return (
    <ProgressiveImage
      ref={(element) => {
        if (typeof forwardedRef === 'function') {
          forwardedRef(element);
        } else if (forwardedRef) {
          forwardedRef.current = element;
        }
        attachRef(element);
      }}
      src={src}
      alt={alt}
      maxWidth={maxWidth}
      aspectRatio={aspectRatio}
      priority={isPriority}
      showSkeleton={showSkeleton}
      skeletonClassName={skeletonClassName}
      onLoad={handleLoad}
      onError={handleError}
      onLoadStart={handleLoadStart}
      className={className}
      style={style}
      enableAnalytics={enableAnalytics}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';
