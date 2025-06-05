
import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import { toAbsoluteURL } from '@/utils/urlUtils';

interface ThumbnailGridProps {
  images: string[];
  activeImageIndex: number;
  imagesLoaded: boolean[];
  productName: string;
  selectedColor: string;
  placeholderImage: string;
  onImageClick: (index: number) => void;
  onImageLoad: (index: number) => void;
}

const ThumbnailGrid = ({
  images,
  activeImageIndex,
  imagesLoaded,
  productName,
  selectedColor,
  placeholderImage,
  onImageClick,
  onImageLoad
}: ThumbnailGridProps) => {
  return (
    <motion.div 
      className="flex justify-center gap-3 mt-4 overflow-x-auto py-2 hide-scrollbar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      {images.map((img, index) => (
        <motion.button
          key={`thumb-${index}`}
          onClick={() => onImageClick(index)}
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
          <div className="relative w-full h-full overflow-hidden">
            <img 
              src={toAbsoluteURL(img)}
              alt={`${productName} - ${selectedColor} - Miniatura ${index + 1}`}
              className={`h-full w-full object-cover object-center bg-[#FAFAFA] mix-blend-multiply p-1 ${
                !imagesLoaded[index] ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              decoding="async"
              onLoad={() => onImageLoad(index)}
              onError={(e) => {
                console.log("Thumbnail error loading:", img);
                if (e.currentTarget) {
                  e.currentTarget.style.objectFit = 'contain';
                  e.currentTarget.src = placeholderImage;
                }
              }}
            />
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ThumbnailGrid;
