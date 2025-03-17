
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  selectedColor: string;
  placeholder: (category: string) => string;
  category: string;
}

const ProductGallery = ({ 
  images, 
  productName, 
  selectedColor, 
  placeholder,
  category
}: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const isMobile = useIsMobile();
  
  const handleImageError = () => {
    console.log("Image error, using placeholder");
    setImageError(true);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || isMobile) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePosition({ x, y });
  };
  
  const handlePrevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const currentImage = images[activeIndex] || placeholder(category);
  
  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div 
          key={`main-image-${activeIndex}-${selectedColor}`}
          className="relative overflow-hidden rounded-2xl bg-[#f8f8f8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => !isMobile && setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          style={{ 
            aspectRatio: "1/1",
          }}
        >
          <div 
            className={`w-full h-full transition-transform duration-200 ${isZoomed ? 'scale-150' : 'scale-100'}`}
            style={{
              transformOrigin: isZoomed ? `${mousePosition.x}% ${mousePosition.y}%` : 'center center'
            }}
          >
            <img
              src={!imageError ? currentImage : placeholder(category)}
              alt={`${productName} - ${selectedColor}`}
              className="w-full h-full object-contain mix-blend-multiply p-6"
              loading="lazy"
              onError={handleImageError}
            />
          </div>
          
          {!isMobile && !imageError && images.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-gray-200 shadow-sm hover:bg-white transition-colors"
                onClick={handlePrevImage}
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-gray-200 shadow-sm hover:bg-white transition-colors"
                onClick={handleNextImage}
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </>
          )}
          
          {!isMobile && !imageError && (
            <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-gray-200 shadow-sm">
              <Maximize className="h-4 w-4 text-gray-700" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {!imageError && images.length > 1 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {images.map((img, idx) => (
            <button
              key={`thumb-${idx}-${img}`}
              className={`w-16 h-16 md:w-20 md:h-20 border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                idx === activeIndex 
                  ? 'border-brand-red shadow-sm scale-105' 
                  : 'border-gray-200 opacity-70 hover:opacity-100'
              }`}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Ver imagem ${idx + 1}`}
            >
              <img 
                src={img} 
                alt={`${productName} - miniatura ${idx + 1}`}
                className="w-full h-full object-contain p-1 mix-blend-multiply bg-[#f8f8f8]"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
