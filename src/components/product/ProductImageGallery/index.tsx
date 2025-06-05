
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import ImageContainer from './ImageContainer';
import ThumbnailGrid from './ThumbnailGrid';
import NavigationControls from './NavigationControls';
import Lightbox from './Lightbox';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  currentIndex?: number;
  onImageChange?: (index: number) => void;
  className?: string;
  selectedColor?: string;
  placeholder?: (category?: string) => string;
  category?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  currentIndex = 0,
  onImageChange,
  className = '',
  selectedColor = '',
  placeholder,
  category = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Memoize filtered images to avoid recalculation
  const validImages = useMemo(() => {
    return images.filter(img => img && img.trim() !== '');
  }, [images]);

  const currentImage = validImages[activeIndex] || validImages[0] || '';
  const placeholderImage = placeholder ? placeholder(category) : '/placeholder.svg';

  const handleImageChange = useCallback((index: number) => {
    if (index >= 0 && index < validImages.length) {
      setActiveIndex(index);
      onImageChange?.(index);
    }
  }, [validImages.length, onImageChange]);

  const handlePrevious = useCallback(() => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : validImages.length - 1;
    handleImageChange(newIndex);
  }, [activeIndex, validImages.length, handleImageChange]);

  const handleNext = useCallback(() => {
    const newIndex = activeIndex < validImages.length - 1 ? activeIndex + 1 : 0;
    handleImageChange(newIndex);
  }, [activeIndex, validImages.length, handleImageChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrevious();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsLightboxOpen(true);
    } else if (event.key === 'Escape') {
      setIsLightboxOpen(false);
    }
  }, [handlePrevious, handleNext]);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      
      // If this is the first image loaded, stop the loading state
      if (newSet.size === 1) {
        setIsLoading(false);
      }
      
      return newSet;
    });
  }, []);

  const handleImageLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  // Early return for empty images
  if (!validImages.length) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg h-96 ${className}`}>
        <div className="text-center text-gray-500">
          <ZoomIn size={48} className="mx-auto mb-2 opacity-50" />
          <p>Nenhuma imagem disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Image Container */}
      <ImageContainer
        currentImage={currentImage}
        placeholderImage={placeholderImage}
        productName={productName}
        selectedColor={selectedColor}
        activeImageIndex={activeIndex}
        imageLoaded={!isLoading}
        useContainFallback={false}
        isZoomed={false}
        mousePosition={{ x: 0, y: 0 }}
        onImageLoad={() => handleImageLoad(activeIndex)}
        onImageError={() => setIsLoading(false)}
        onMouseMove={() => {}}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      />

      {/* Navigation Controls */}
      {validImages.length > 1 && (
        <NavigationControls
          onPrevImage={handlePrevious}
          onNextImage={handleNext}
        />
      )}

      {/* Thumbnail Grid */}
      {validImages.length > 1 && (
        <ThumbnailGrid
          images={validImages}
          activeImageIndex={activeIndex}
          imagesLoaded={Array.from({ length: validImages.length }, (_, i) => loadedImages.has(i))}
          productName={productName}
          selectedColor={selectedColor}
          placeholderImage={placeholderImage}
          onImageClick={handleImageChange}
          onImageLoad={handleImageLoadComplete}
        />
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            isOpen={isLightboxOpen}
            currentImage={currentImage}
            placeholderImage={placeholderImage}
            productName={productName}
            hasMultipleImages={validImages.length > 1}
            onClose={closeLightbox}
            onPrevImage={handlePrevious}
            onNextImage={handleNext}
          />
        )}
      </AnimatePresence>

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {activeIndex + 1} / {validImages.length}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
