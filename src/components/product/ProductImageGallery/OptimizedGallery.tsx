
import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import OptimizedImage from '../../ui/OptimizedImage';

interface OptimizedGalleryProps {
  images: string[];
  productName: string;
  currentIndex?: number;
  onImageChange?: (index: number) => void;
  className?: string;
  selectedColor?: string;
  placeholder?: (category?: string) => string;
  category?: string;
}

const OptimizedGallery = memo<OptimizedGalleryProps>(({
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

  // Memoize thumbnail images
  const thumbnailImages = useMemo(() => {
    return validImages.slice(0, 6); // Limit thumbnails for performance
  }, [validImages]);

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
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-4">
        <div className="aspect-square relative">
          <OptimizedImage
            src={currentImage}
            alt={`${productName} - Imagem ${activeIndex + 1}`}
            className="w-full h-full"
            placeholder={placeholderImage}
            priority={activeIndex === 0}
            width={800}
            height={800}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Click to zoom overlay */}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors duration-300 group"
            aria-label="Ampliar imagem"
          >
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-200"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Thumbnail Grid */}
      {thumbnailImages.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {thumbnailImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => handleImageChange(index)}
              className={`
                flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200
                ${index === activeIndex 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              aria-label={`Ver imagem ${index + 1}`}
            >
              <OptimizedImage
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="w-full h-full"
                width={64}
                height={64}
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {validImages.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {activeIndex + 1} / {validImages.length}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={currentImage}
                alt={`${productName} - Visualização ampliada`}
                className="max-w-full max-h-[90vh] rounded-lg"
                priority
                width={1200}
                height={1200}
              />
              
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                aria-label="Fechar visualização"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

OptimizedGallery.displayName = 'OptimizedGallery';

export default OptimizedGallery;
