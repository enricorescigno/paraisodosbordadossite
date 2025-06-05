
import React from 'react';
import { motion } from 'framer-motion';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { ZoomIn } from 'lucide-react';
import { getImageLoading } from '@/utils/imageUtils';
import { toAbsoluteURL } from '@/utils/urlUtils';

interface ImageContainerProps {
  currentImage: string;
  placeholderImage: string;
  productName: string;
  selectedColor: string;
  activeImageIndex: number;
  imageLoaded: boolean;
  useContainFallback: boolean;
  isZoomed: boolean;
  mousePosition: { x: number; y: number };
  onImageLoad: () => void;
  onImageError: () => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const ImageContainer = ({
  currentImage,
  placeholderImage,
  productName,
  selectedColor,
  activeImageIndex,
  imageLoaded,
  useContainFallback,
  isZoomed,
  mousePosition,
  onImageLoad,
  onImageError,
  onMouseMove,
  onMouseEnter,
  onMouseLeave
}: ImageContainerProps) => {
  const imageStyle = isZoomed ? {
    transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
    transform: 'scale(1.7)',
    cursor: 'zoom-out'
  } : {
    cursor: 'zoom-in'
  };

  return (
    <div 
      className="relative overflow-hidden bg-[#FAFAFA] rounded-lg"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}
    >
      <AspectRatio ratio={1/1}>
        <div className="relative w-full h-full overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
              <Skeleton className="h-full w-full" />
            </div>
          )}
          
          <img 
            src={currentImage || placeholderImage}
            alt={`${productName} - ${selectedColor} - Imagem ${activeImageIndex + 1}`}
            className={`w-full h-full ${useContainFallback ? 'object-contain' : 'object-cover'} object-center mix-blend-multiply p-4 transition-transform duration-200 ${
              !imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={imageStyle}
            loading={getImageLoading(activeImageIndex === 0 ? true : false)}
            onLoad={onImageLoad}
            onError={onImageError}
            decoding={activeImageIndex === 0 ? "sync" : "async"}
          />
        </div>
      </AspectRatio>
      
      {/* Zoom indicator for desktop */}
      <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hidden md:flex items-center justify-center">
        <ZoomIn className="h-4 w-4 text-gray-600" />
      </div>
    </div>
  );
};

export default ImageContainer;
