
import { useState, useEffect, useCallback } from 'react';
import { ImageService } from '../services/ImageService';

export const useProductImages = (images: string[], selectedColor?: string) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [imageError, setImageError] = useState(false);

  const imageService = ImageService.getInstance();

  useEffect(() => {
    setImagesLoaded(Array(images.length).fill(false));
    setActiveImageIndex(0);
    setImageError(false);
  }, [images.length, selectedColor]);

  const handleImageLoaded = useCallback((index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  }, []);

  const preloadImages = useCallback(async () => {
    try {
      const preloadPromises = images.map(url => imageService.preloadImage(url));
      await Promise.all(preloadPromises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [images, imageService]);

  const nextImage = useCallback(() => {
    setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setActiveImageIndex(index);
    }
  }, [images.length]);

  return {
    activeImageIndex,
    imagesLoaded,
    imageError,
    setImageError,
    handleImageLoaded,
    preloadImages,
    nextImage,
    prevImage,
    goToImage
  };
};
