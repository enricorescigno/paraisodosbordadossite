
import React, { forwardRef } from 'react';
import { useOptimizedImage } from '@/hooks/useOptimizedImage';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'loading'> {
  src: string;
  alt: string;
  priority?: 'high' | 'medium' | 'low';
  eager?: boolean;
  placeholder?: string;
  showSkeleton?: boolean;
  skeletonClassName?: string;
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
  onImageLoad,
  onImageError,
  className,
  style,
  ...props
}, forwardedRef) => {
  const { src: optimizedSrc, isLoading, error, ref } = useOptimizedImage(src, {
    priority,
    eager,
    placeholder,
    onLoad: onImageLoad,
    onError: onImageError
  });

  return (
    <div className="relative" style={style}>
      {isLoading && showSkeleton && (
        <Skeleton className={`absolute inset-0 ${skeletonClassName || ''}`} />
      )}
      
      <img
        ref={(node) => {
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
          if (ref) {
            (ref as React.MutableRefObject<HTMLImageElement | null>).current = node;
          }
        }}
        src={optimizedSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{
          ...style,
          ...(isLoading ? { visibility: 'hidden' } : {})
        }}
        {...props}
      />
      
      {error && !optimizedSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Erro ao carregar imagem
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';
