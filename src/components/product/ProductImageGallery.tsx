
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion, AnimatePresence } from 'framer-motion';

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

  // Reset active image index when color or images change
  useEffect(() => {
    setActiveImageIndex(0);
    setImageError(false);
  }, [selectedColor, images]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedColor}-${images.join(',')}`} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel className="w-full">
            <CarouselContent>
              {images.length > 0 && !imageError ? (
                images.map((img, index) => (
                  <CarouselItem key={`${selectedColor}-${index}-${img}`}>
                    <AspectRatio ratio={1/1} className="bg-[#f8f8f8]">
                      <motion.img 
                        src={img} 
                        alt={`${productName} - ${selectedColor} - Imagem ${index + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply p-4"
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        onError={(e) => {
                          console.log("Image error for:", img);
                          setImageError(true);
                          e.currentTarget.src = placeholder(category);
                        }}
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <AspectRatio ratio={1/1} className="bg-[#f8f8f8]">
                    <img 
                      src={placeholder(category)}
                      alt={productName}
                      className="w-full h-full object-contain mix-blend-multiply p-4"
                    />
                  </AspectRatio>
                </CarouselItem>
              )}
            </CarouselContent>

            {images.length > 1 && !imageError && (
              <>
                <CarouselPrevious className="left-2 h-11 w-11 md:h-10 md:w-10 bg-white/80 backdrop-blur-sm border border-gray-200" />
                <CarouselNext className="right-2 h-11 w-11 md:h-10 md:w-10 bg-white/80 backdrop-blur-sm border border-gray-200" />
              </>
            )}
            
            {images.length > 1 && !imageError && (
              <div className="flex justify-center gap-2 mt-4 pb-4">
                {images.map((_, index) => (
                  <motion.div 
                    key={index} 
                    className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                      index === activeImageIndex ? 'bg-brand-red' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            )}
          </Carousel>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductImageGallery;
