
import React, { forwardRef } from 'react';
import { ProgressiveImage } from '@/components/ui/ProgressiveImage';

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
  className,
  style,
  ...props
}, forwardedRef) => {
  const isPriority = priority === 'high' || eager;

  const handleLoad = () => {
    onImageLoad?.();
  };

  const handleError = () => {
    const error = new Error(`Failed to load image: ${src}`);
    onImageError?.(error);
  };

  return (
    <ProgressiveImage
      ref={forwardedRef}
      src={src}
      alt={alt}
      maxWidth={maxWidth}
      aspectRatio={aspectRatio}
      priority={isPriority}
      showSkeleton={showSkeleton}
      skeletonClassName={skeletonClassName}
      onLoad={handleLoad}
      onError={handleError}
      className={className}
      style={style}
      {...props}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';
