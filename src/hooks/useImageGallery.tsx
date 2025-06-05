
import { useState, useEffect, useCallback } from 'react';
import { toAbsoluteURL } from '@/utils/urlUtils';

interface UseImageGalleryProps {
  images: string[];
  selectedColor: string;
  placeholder: (category: string) => string;
  category: string;
}

export const useImageGallery = ({ images, selectedColor, placeholder, category }: UseImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [thumbnailsVisible, setThumbnailsVisible] = useState(false);
  const [useContainFallback, setUseContainFallback] = useState(false);

  // Ensure we have a valid images array
  const validImages = Array.isArray(images) && images.length > 0 
    ? images 
    : [placeholder(category || '')];

  // Initialize images loaded state array
  useEffect(() => {
    setImagesLoaded(Array(validImages.length).fill(false));
    setImageError(false);
    setUseContainFallback(false);
    
    // Show thumbnails after slight delay for better perceived loading
    const timer = setTimeout(() => {
      setThumbnailsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [validImages.length]);

  // Reset active image index when color or images change
  useEffect(() => {
    setActiveImageIndex(0);
    setImageError(false);
    setUseContainFallback(false);
  }, [selectedColor, validImages]);

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

  const nextImage = () => {
    setActiveImageIndex(prev => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  return {
    activeImageIndex,
    imageError,
    isZoomed,
    setIsZoomed,
    mousePosition,
    isLightboxOpen,
    imagesLoaded,
    thumbnailsVisible,
    useContainFallback,
    setUseContainFallback,
    validImages,
    handleImageLoaded,
    handleMouseMove,
    handleImageClick,
    closeLightbox,
    nextImage,
    prevImage
  };
};
