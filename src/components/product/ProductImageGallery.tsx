
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

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

  // Reset active image index when color or images change
  useEffect(() => {
    setActiveImageIndex(0);
    setImageError(false);
  }, [selectedColor, images]);

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
    transform: 'scale(1.5)',
    cursor: 'zoom-out'
  } : {
    cursor: 'zoom-in'
  };

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
            className="relative overflow-hidden bg-[#f8f8f8] rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {images.length > 0 && !imageError ? (
              <AspectRatio ratio={1/1}>
                <motion.img 
                  src={images[activeImageIndex]} 
                  alt={`${productName} - ${selectedColor} - Imagem ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply p-4 transition-transform duration-200"
                  style={imageStyle}
                  loading="lazy"
                  onError={(e) => {
                    console.log("Image error for:", images[activeImageIndex]);
                    setImageError(true);
                    e.currentTarget.src = placeholder(category);
                  }}
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
                  onClick={() => setActiveImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button 
                  onClick={() => setActiveImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && !imageError && (
            <div className="flex justify-center gap-3 mt-4 overflow-x-auto py-2 hide-scrollbar">
              {images.map((img, index) => (
                <motion.button
                  key={`thumb-${index}`}
                  onClick={() => handleImageClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative h-16 w-16 rounded-md overflow-hidden border ${
                    index === activeImageIndex ? 'border-[#C32E2E] shadow-sm' : 'border-gray-200'
                  }`}
                  aria-label={`Ver imagem ${index + 1}`}
                >
                  <img 
                    src={img} 
                    alt={`${productName} - ${selectedColor} - Miniatura ${index + 1}`}
                    className="h-full w-full object-contain bg-[#f8f8f8] mix-blend-multiply p-1"
                  />
                </motion.button>
              ))}
            </div>
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
                src={images[activeImageIndex]}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductImageGallery;
