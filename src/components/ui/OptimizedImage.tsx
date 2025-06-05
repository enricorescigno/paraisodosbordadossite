
import React, { useState, useEffect, useRef, memo } from 'react';
import { useAppStore } from '../../stores/useAppStore';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
}

const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder,
  onLoad,
  onError,
  sizes = '100vw',
}) => {
  const [isInView, setIsInView] = useState(priority);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const { isImageLoaded, setImageLoaded, setImageError: setStoreImageError } = useAppStore();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Handle image load
  const handleLoad = () => {
    setImageLoaded(true);
    setImageLoaded(src, src);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setImageError(true);
    setStoreImageError(src);
    onError?.();
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc || baseSrc.includes('unsplash.com')) {
      return baseSrc;
    }
    
    const sizes = [320, 640, 960, 1280];
    return sizes
      .map(size => `${baseSrc}?w=${size} ${size}w`)
      .join(', ');
  };

  // Get optimized src with width parameter
  const getOptimizedSrc = (baseSrc: string, targetWidth?: number) => {
    if (!baseSrc || baseSrc.includes('unsplash.com') || baseSrc.startsWith('data:')) {
      return baseSrc;
    }
    
    if (targetWidth) {
      const separator = baseSrc.includes('?') ? '&' : '?';
      return `${baseSrc}${separator}w=${targetWidth}&q=80&f=webp`;
    }
    
    return baseSrc;
  };

  const optimizedSrc = getOptimizedSrc(src, width);
  const srcSet = generateSrcSet(src);
  const isLoaded = isImageLoaded(src) || imageLoaded;

  // Show placeholder until image is in view
  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height, aspectRatio: width && height ? `${width}/${height}` : undefined }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${imageError ? 'bg-gray-200' : ''}
        `}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Error fallback */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
