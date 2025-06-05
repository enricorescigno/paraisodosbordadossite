
import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toAbsoluteURL } from '@/utils/urlUtils';
import { useProductImages } from '@/hooks/useProductImages';
import ImageContainer from './ImageContainer';
import NavigationControls from './NavigationControls';
import ThumbnailGrid from './ThumbnailGrid';
import Lightbox from './Lightbox';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  selectedColor: string;
  placeholder: (category: string) => string;
  category: string;
}

const ProductImageGallery = ({ 
  images, 
  productName, 
  selectedColor, 
  placeholder,
  category
}: ProductImageGalleryProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [thumbnailsVisible, setThumbnailsVisible] = useState(false);
  const [useContainFallback, setUseContainFallback] = useState(false);

  // Use the custom hook for image management
  const {
    activeImageIndex,
    imagesLoaded,
    imageError,
    setImageError,
    handleImageLoaded,
    nextImage,
    prevImage,
    goToImage
  } = useProductImages(images, selectedColor);

  // Ensure we have a valid images array
  const validImages = Array.isArray(images) && images.length > 0 
    ? images 
    : [placeholder(category || '')];

  // Reset state when images change
  useEffect(() => {
    setImageError(false);
    setUseContainFallback(false);
    
    // Show thumbnails after slight delay for better perceived loading
    const timer = setTimeout(() => {
      setThumbnailsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [validImages.length, setImageError]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  const handleImageClick = (index: number) => {
    if (index === activeImageIndex && !isLightboxOpen) {
      setIsLightboxOpen(true);
    } else {
      goToImage(index);
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleImageLoadComplete = (index: number) => {
    handleImageLoaded(index, validImages[index]);
  };

  const handleImageError = () => {
    console.log("Image error for:", currentImage);
    setUseContainFallback(true);
    setImageError(true);
  };
  
  const currentImage = validImages[activeImageIndex] ? toAbsoluteURL(validImages[activeImageIndex]) : '';
  const placeholderImage = placeholder(category || '');

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedColor}-${activeImageIndex}`} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Main Image */}
          <div className="relative">
            <ImageContainer
              currentImage={currentImage}
              placeholderImage={placeholderImage}
              productName={productName}
              selectedColor={selectedColor}
              activeImageIndex={activeImageIndex}
              imageLoaded={imagesLoaded[activeImageIndex]}
              useContainFallback={useContainFallback}
              isZoomed={isZoomed}
              mousePosition={mousePosition}
              onImageLoad={handleImageLoadComplete}
              onImageError={handleImageError}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            />
            
            {/* Navigation Arrows */}
            {validImages.length > 1 && !imageError && (
              <NavigationControls
                onPrevImage={prevImage}
                onNextImage={nextImage}
              />
            )}
          </div>
          
          {/* Thumbnails */}
          {validImages.length > 1 && !imageError && thumbnailsVisible && (
            <ThumbnailGrid
              images={validImages}
              activeImageIndex={activeImageIndex}
              imagesLoaded={imagesLoaded}
              productName={productName}
              selectedColor={selectedColor}
              placeholderImage={placeholderImage}
              onImageClick={handleImageClick}
              onImageLoad={(index: number) => handleImageLoaded(index, validImages[index])}
            />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Lightbox */}
      <Lightbox
        isOpen={isLightboxOpen}
        currentImage={currentImage}
        placeholderImage={placeholderImage}
        productName={productName}
        hasMultipleImages={validImages.length > 1}
        onClose={closeLightbox}
        onPrevImage={prevImage}
        onNextImage={nextImage}
      />
    </div>
  );
};

export default memo(ProductImageGallery);
