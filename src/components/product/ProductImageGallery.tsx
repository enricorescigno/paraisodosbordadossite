
import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { getImageLoading } from '../../utils/imageUtils';

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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [thumbnailsVisible, setThumbnailsVisible] = useState(false);

  // Initialize images loaded state array
  useEffect(() => {
    setImagesLoaded(Array(images.length).fill(false));
    setImageError(false);
    
    // Show thumbnails after slight delay for better perceived loading
    const timer = setTimeout(() => {
      setThumbnailsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [images.length]);

  // Reset active image index when color or images change
  useEffect(() => {
    setActiveImageIndex(0);
    setImageError(false);
  }, [selectedColor, images]);

  // Handle image loading complete
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
    setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Get current image
  const currentImage = images[activeImageIndex];

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
          >
            {images.length > 0 && !imageError ? (
              <AspectRatio ratio={1/1}>
                {!imagesLoaded[activeImageIndex] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                    <Skeleton className="h-full w-full" />
                  </div>
                )}
                <motion.img 
                  src={currentImage} 
                  alt={`${productName} - ${selectedColor} - Imagem ${activeImageIndex + 1}`}
                  className={`w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-200 ${
                    !imagesLoaded[activeImageIndex] ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={imageStyle}
                  loading={getImageLoading(activeImageIndex === 0 ? true : false)}
                  onLoad={() => handleImageLoaded(activeImageIndex)}
                  onError={(e) => {
                    console.log("Image error for:", currentImage);
                    setImageError(true);
                    if (e.currentTarget) {
                      e.currentTarget.src = placeholder(category);
                    }
                  }}
                  // Changed fetchpriority to fetchPriority (camelCase)
                  fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
                  decoding={activeImageIndex === 0 ? "sync" : "async"}
                />
              </AspectRatio>
            ) : (
              <AspectRatio ratio={1/1}>
                <img 
                  src={placeholder(category)}
                  alt={productName}
                  className="w-full h-full object-contain mix-blend-multiply p-4"
                />
              </AspectRatio>
            )}
            
            {/* Zoom indicator for desktop */}
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hidden md:flex items-center justify-center">
              <ZoomIn className="h-4 w-4 text-gray-600" />
            </div>
            
            {/* Navigation Arrows */}
            {images.length > 1 && !imageError && (
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
          
          {/* Thumbnails - only show when ready */}
          {images.length > 1 && !imageError && thumbnailsVisible && (
            <motion.div 
              className="flex justify-center gap-3 mt-4 overflow-x-auto py-2 hide-scrollbar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {images.map((img, index) => (
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
                  {/* Thumbnail skeleton */}
                  {!imagesLoaded[index] && (
                    <Skeleton className="h-full w-full absolute inset-0" />
                  )}
                  <img 
                    src={img} 
                    alt={`${productName} - ${selectedColor} - Miniatura ${index + 1}`}
                    className={`h-full w-full object-contain bg-[#FAFAFA] mix-blend-multiply p-1 ${
                      !imagesLoaded[index] ? 'opacity-0' : 'opacity-100'
                    }`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => handleImageLoaded(index)}
                    onError={() => console.log("Thumbnail error loading:", img)}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Lightbox for zoomed view */}
      <AnimatePresence>
        {isLightboxOpen && images.length > 0 && (
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
                src={currentImage}
                alt={`${productName} - Vista ampliada`}
                className="max-w-full max-h-[90vh] object-contain"
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                aria-label="Fechar visualização ampliada"
              >
                <span className="text-white text-2xl">&times;</span>
              </button>
              
              {/* Navigation buttons in lightbox */}
              {images.length > 1 && (
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

// Use memo to prevent unnecessary re-renders
export default memo(ProductImageGallery);
