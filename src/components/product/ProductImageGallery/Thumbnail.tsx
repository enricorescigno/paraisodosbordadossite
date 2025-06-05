
import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import { toAbsoluteURL } from '@/utils/urlUtils';

interface ThumbnailProps {
  image: string;
  index: number;
  isActive: boolean;
  isLoaded: boolean;
  productName: string;
  selectedColor: string;
  placeholderImage: string;
  onImageLoaded: (index: number) => void;
  onImageClick: (index: number) => void;
}

const Thumbnail = ({
  image,
  index,
  isActive,
  isLoaded,
  productName,
  selectedColor,
  placeholderImage,
  onImageLoaded,
  onImageClick
}: ThumbnailProps) => {
  return (
    <motion.button
      key={`thumb-${index}`}
      onClick={() => onImageClick(index)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative h-16 w-16 rounded-md overflow-hidden border ${
        isActive ? 'border-[#0071E3] shadow-sm' : 'border-gray-200'
      }`}
      aria-label={`Ver imagem ${index + 1}`}
    >
      {!isLoaded && (
        <Skeleton className="h-full w-full absolute inset-0" />
      )}
      <div className="relative w-full h-full overflow-hidden">
        <img 
          src={toAbsoluteURL(image)}
          alt={`${productName} - ${selectedColor} - Miniatura ${index + 1}`}
          className={`h-full w-full object-cover object-center bg-[#FAFAFA] mix-blend-multiply p-1 ${
            !isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => onImageLoaded(index)}
          onError={(e) => {
            console.log("Thumbnail error loading:", image);
            if (e.currentTarget) {
              e.currentTarget.style.objectFit = 'contain';
              e.currentTarget.src = placeholderImage;
            }
          }}
        />
      </div>
    </motion.button>
  );
};

export default Thumbnail;
