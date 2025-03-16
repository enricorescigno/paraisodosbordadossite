
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion, AnimatePresence } from 'framer-motion';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  selectedColor: string;
  placeholder: (categoryId: number) => string;
  category: number;
}

const ProductImageGallery = ({ 
  images, 
  productName, 
  selectedColor, 
  placeholder,
  category
}: ProductImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when color changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedColor]);

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedColor} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel className="w-full">
            <CarouselContent>
              {images.length > 0 ? (
                images.map((img, index) => (
                  <CarouselItem key={`${selectedColor}-${index}`}>
                    <AspectRatio ratio={1/1} className="bg-[#f8f8f8]">
                      <img 
                        src={img} 
                        alt={`${productName} - ${selectedColor} - Imagem ${index + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply p-4"
                        onError={(e) => {
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

            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
            
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                      index === activeImageIndex ? 'bg-brand-red' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  ></div>
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
