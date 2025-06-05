
import { useState, useEffect, useCallback } from 'react';
import { useImageContext } from '../contexts/ImageContext';
import { ImageService } from '../services/ImageService';

export const useProductImages = (images: string[], selectedColor?: string) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [imageError, setImageError] = useState(false);

  const { state: imageState, actions: imageActions } = useImageContext();
  const imageService = ImageService.getInstance();

  useEffect(() => {
    setImagesLoaded(Array(images.length).fill(false));
    setActiveImageIndex(0);
    setImageError(false);
    
    // Add images to preload queue
    if (images.length > 0) {
      imageActions.addToPreloadQueue(images);
    }
  }, [images.length, selectedColor, imageActions]);

  const handleImageLoaded = useCallback((index: number, url: string) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    
    // Mark image as loaded in context
    imageActions.setImageLoaded(url, url);
  }, [imageActions]);

  const handleImageError = useCallback((url: string) => {
    setImageError(true);
    imageActions.setImageError(url);
  }, [imageActions]);

  const preloadImages = useCallback(async () => {
    try {
      const preloadPromises = images.map(url => {
        imageActions.setImageLoading(url);
        return imageService.preloadImage(url);
      });
      await Promise.all(preloadPromises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [images, imageService, imageActions]);

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

  const isImageCached = useCallback((url: string) => {
    return imageState.cache[url]?.data !== undefined;
  }, [imageState.cache]);

  const isImageLoading = useCallback((url: string) => {
    return imageState.cache[url]?.loading === true;
  }, [imageState.cache]);

  return {
    activeImageIndex,
    imagesLoaded,
    imageError,
    setImageError,
    handleImageLoaded,
    handleImageError,
    preloadImages,
    nextImage,
    prevImage,
    goToImage,
    isImageCached,
    isImageLoading
  };
};
