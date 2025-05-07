
import { useState, useEffect, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageLoading, fixImageExtension } from '@/utils/imageUtils';
import { useInView } from 'react-intersection-observer';

console.log("DEBUG - getImageLoading:", getImageLoading);
console.log("DEBUG - fixImageExtension:", fixImageExtension);

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
  // Safe validation for images array
  const validImages = Array.isArray(images) && images.length > 0 ? images.filter(Boolean) : [];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [thumbnailsVisible, setThumbnailsVisible] = useState(false);
  
  // Generate fallback if there are no valid images
  const fallbackImage = validImages.length > 0 ? validImages[0] : placeholder(category);
                        
  // Make sure displayImages is always a valid array
  const displayImages = validImages.length > 0 ? validImages : [fallbackImage];
  
  // Use InView hook with proper initialization
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Touch handling for swipe gestures
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reset loaded state when images change
  useEffect(() => {
    setImagesLoaded(Array(displayImages.length).fill(false));
    setImageError(false);
    
    const timer = setTimeout(() => {
      setThumbnailsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [displayImages.length]);

  // Reset active index when images or color changes
  useEffect(() => {
    setActiveImageIndex(0);
    setImageError(false);
  }, [selectedColor, images]);

  // Key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    if (!isLightboxOpen) { // Only add listeners when not in lightbox mode
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImageIndex, displayImages.length, isLightboxOpen]);

  const handleImageLoaded = useCallback((index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

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
    setActiveImageIndex(prev => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum distance to be considered as swipe
    
    if (diff > threshold) {
      // Swiped left, go to next image
      nextImage();
    } else if (diff < -threshold) {
      // Swiped right, go to previous image
      prevImage();
    }
    
    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Ensure we have a valid image
  const safeActiveIndex = activeImageIndex >= 0 && activeImageIndex < displayImages.length 
    ? activeImageIndex 
    : 0;
    
  const currentImage = displayImages[safeActiveIndex] || fallbackImage;
  
  // Pre-load next and previous images
  useEffect(() => {
    if (displayImages.length <= 1) return;
    
    const nextIdx = safeActiveIndex === displayImages.length - 1 ? 0 : safeActiveIndex + 1;
    const prevIdx = safeActiveIndex === 0 ? displayImages.length - 1 : safeActiveIndex - 1;
    
    const preloadImages = [nextIdx, prevIdx].map(idx => {
      if (displayImages[idx]) {
        const img = new Image();
        img.src = displayImages[idx];
        return img;
      }
      return null;
    });
    
    return () => {
      preloadImages.forEach(img => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [safeActiveIndex, displayImages]);

  // Generate dynamic alt text
  const getImageAlt = (index: number) => {
    return `${productName || 'Produto'} - ${selectedColor || 'Padrão'} - ${index === 0 ? 'Principal' : `Detalhe ${index}`}`
  };

  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      // Save ref locally
      if (galleryRef) {
        galleryRef.current = node;
      }
      
      // Forward to inView
      if (typeof inViewRef === 'function') {
        inViewRef(node);
      }
    },
    [inViewRef]
  );

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden"
      ref={setRefs}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedColor || 'default'}-${safeActiveIndex}`} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div 
            className="relative overflow-hidden bg-[#FAFAFA] rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {displayImages.length > 0 && !imageError ? (
              <AspectRatio ratio={1/1}>
                {!imagesLoaded[safeActiveIndex] && (
                  <div className="absolute inset-0 animate-pulse">
                    <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 background-animate" />
                  </div>
                )}
                <motion.img 
                  src={currentImage} 
                  alt={getImageAlt(safeActiveIndex)}
                  className={`w-full h-full object-cover object-center absolute inset-0 mix-blend-multiply p-4 transition-transform duration-200 ${
                    !imagesLoaded[safeActiveIndex] ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={imageStyle}
                  loading={getImageLoading(safeActiveIndex === 0 ? true : false)}
                  onLoad={() => handleImageLoaded(safeActiveIndex)}
                  onError={(e) => {
                    console.log("Image error for:", currentImage);
                    setImageError(true);
                    if (e.currentTarget) {
                      e.currentTarget.src = fallbackImage;
                      handleImageLoaded(safeActiveIndex);
                    }
                  }}
                  decoding={safeActiveIndex === 0 ? "sync" : "async"}
                  aria-label={`Visualizar ${productName || 'produto'} na cor ${selectedColor || 'padrão'}`}
                  fetchpriority={safeActiveIndex === 0 ? "high" : "low"}
                />
              </AspectRatio>
            ) : (
              <AspectRatio ratio={1/1}>
                <img 
                  src={fallbackImage}
                  alt={productName || "Produto"}
                  className="w-full h-full object-cover object-center absolute inset-0 mix-blend-multiply p-4"
                />
              </AspectRatio>
            )}
            
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hidden md:flex items-center justify-center">
              <ZoomIn className="h-4 w-4 text-gray-600" />
            </div>
            
            {displayImages.length > 1 && !imageError && (
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
          
          {displayImages.length > 1 && !imageError && thumbnailsVisible && (
            <motion.div 
              className="flex justify-center gap-3 mt-4 overflow-x-auto py-2 hide-scrollbar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {displayImages.map((img, index) => (
                <motion.button
                  key={`thumb-${index}`}
                  onClick={() => handleImageClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-16 w-16 rounded-md overflow-hidden border ${
                    index === safeActiveIndex ? 'border-[#0071E3] shadow-sm' : 'border-gray-200'
                  }`}
                  aria-label={`Ver imagem ${index + 1} de ${displayImages.length}`}
                >
                  {!imagesLoaded[index] && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 background-animate" />
                  )}
                  <img 
                    src={img}
                    alt={`${productName || 'Produto'} - ${selectedColor || 'Padrão'} - Miniatura ${index + 1}`}
                    className={`h-full w-full object-cover object-center absolute inset-0 mix-blend-multiply p-1 ${
                      !imagesLoaded[index] ? 'opacity-0' : 'opacity-100'
                    }`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => handleImageLoaded(index)}
                    onError={() => {
                      setImagesLoaded(prev => {
                        const newState = [...prev];
                        newState[index] = true;
                        return newState;
                      });
                    }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Lightbox implementation */}
      <AnimatePresence>
        {isLightboxOpen && displayImages.length > 0 && (
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
              <img 
                src={displayImages[safeActiveIndex]}
                alt={`${productName || 'Produto'} - Vista ampliada`}
                className="max-w-full max-h-[90vh] object-contain"
                onError={(e) => {
                  if (e.currentTarget) {
                    e.currentTarget.src = fallbackImage;
                  }
                }}
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                aria-label="Fechar visualização ampliada"
              >
                <span className="text-white text-2xl">&times;</span>
              </button>
              
              {displayImages.length > 1 && (
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

      <style>
        {`
        .background-animate {
          background-size: 200% 200%;
          animation: shimmer 1.5s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </div>
  );
};

export default memo(ProductImageGallery);
