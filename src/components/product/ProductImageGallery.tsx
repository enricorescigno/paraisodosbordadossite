
import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useOptimizedProductImages } from '@/hooks/useOptimizedProductImages';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { toAbsoluteURL } from '@/utils/urlUtils';

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

  const {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    hasMultipleImages
  } = useOptimizedProductImages({
    images,
    selectedColor,
    category,
    productId: productName
  });

  // Preload all gallery images with lower priority
  useImagePreloader(currentImages, {
    enabled: currentImages.length > 0,
    priority: 'low',
    delay: 500
  });

  // Show thumbnails after slight delay for better perceived loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setThumbnailsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentImages]);

  // Reset states when color or images change
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedColor, currentImages]);

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
      setActiveImageIndex(index);
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const imageStyle = isZoomed ? {
    transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
    transform: 'scale(1.7)',
    cursor: 'zoom-out'
  } : {
    cursor: 'zoom-in'
  };

  const nextImage = () => {
    setActiveImageIndex(prev => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };
  
  const currentImage = currentImages[activeImageIndex];
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
          <div 
            className="relative overflow-hidden bg-[#FAFAFA] rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            style={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}
          >
            <AspectRatio ratio={1/1}>
              <div className="relative w-full h-full overflow-hidden">
                <OptimizedImage
                  src={currentImage || placeholderImage}
                  alt={`${productName} - ${selectedColor} - Imagem ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover object-center mix-blend-multiply p-4 transition-transform duration-200"
                  style={imageStyle}
                  priority={activeImageIndex === 0 ? 'high' : 'medium'}
                  eager={activeImageIndex === 0}
                  showSkeleton={true}
                />
              </div>
            </AspectRatio>
            
            {/* Zoom indicator for desktop */}
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hidden md:flex items-center justify-center">
              <ZoomIn className="h-4 w-4 text-gray-600" />
            </div>
            
            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnails - optimized with lazy loading */}
          {hasMultipleImages && thumbnailsVisible && (
            <motion.div 
              className="flex justify-center gap-3 mt-4 overflow-x-auto py-2 hide-scrollbar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {currentImages.map((img, index) => (
                <motion.button
                  key={`thumb-${index}`}
                  onClick={() => handleImageClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-16 w-16 rounded-md overflow-hidden border ${
                    index === activeImageIndex ? 'border-[#0071E3] shadow-sm' : 'border-gray-200'
                  }`}
                  aria-label={`Ver imagem ${index + 1}`}
                >
                  <OptimizedImage
                    src={img}
                    alt={`${productName} - ${selectedColor} - Miniatura ${index + 1}`}
                    className="h-full w-full object-cover object-center bg-[#FAFAFA] mix-blend-multiply p-1"
                    priority="low"
                    eager={false}
                    showSkeleton={true}
                    skeletonClassName="h-16 w-16"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Lightbox for zoomed view */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full overflow-hidden">
                <OptimizedImage
                  src={currentImage || placeholderImage}
                  alt={`${productName} - Vista ampliada`}
                  className="max-w-full max-h-[90vh] object-contain"
                  priority="high"
                  eager={true}
                />
              </div>
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                aria-label="Fechar visualização ampliada"
              >
                <span className="text-white text-2xl">&times;</span>
              </button>
              
              {/* Navigation buttons in lightbox */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ProductImageGallery);
