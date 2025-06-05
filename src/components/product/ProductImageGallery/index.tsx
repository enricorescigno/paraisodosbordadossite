
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
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  currentIndex = 0,
  onImageChange,
  className = ''
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
        image={currentImage}
        productName={productName}
        isLoading={isLoading}
        onImageLoad={() => handleImageLoad(activeIndex)}
        onImageClick={openLightbox}
        className="mb-4"
      />

      {/* Navigation Controls */}
      {validImages.length > 1 && (
        <NavigationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentIndex={activeIndex}
          totalImages={validImages.length}
          className="absolute top-1/2 transform -translate-y-1/2"
        />
      )}

      {/* Thumbnail Grid */}
      {validImages.length > 1 && (
        <ThumbnailGrid
          images={validImages}
          activeIndex={activeIndex}
          productName={productName}
          onImageClick={handleImageChange}
          onImageLoad={handleImageLoadComplete}
          loadedImages={loadedImages}
        />
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            images={validImages}
            currentIndex={activeIndex}
            productName={productName}
            onClose={closeLightbox}
            onImageChange={handleImageChange}
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
