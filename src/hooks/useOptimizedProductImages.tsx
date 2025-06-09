
import { useState, useEffect, useCallback } from 'react';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { imageManager } from '@/services/ImageManager';
import { toAbsoluteURL } from '@/utils/urlUtils';
import { getImagePlaceholder } from '@/utils/imageUtils';

interface UseOptimizedProductImagesProps {
  images: string[] | Record<string, string[]>;
  selectedColor?: string;
  category?: string;
  productId: string | number;
}

export const useOptimizedProductImages = ({
  images,
  selectedColor,
  category = '',
  productId
}: UseOptimizedProductImagesProps) => {
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const processImages = useCallback((rawImages: string[] | Record<string, string[]>) => {
    let processedImages: string[] = [];

    if (Array.isArray(rawImages)) {
      processedImages = rawImages.map(img => toAbsoluteURL(img));
    } else if (typeof rawImages === 'object' && rawImages !== null) {
      if (selectedColor && rawImages[selectedColor]) {
        processedImages = rawImages[selectedColor].map(img => toAbsoluteURL(img));
      } else {
        const firstColorImages = Object.values(rawImages)[0];
        if (Array.isArray(firstColorImages)) {
          processedImages = firstColorImages.map(img => toAbsoluteURL(img));
        }
      }
    }

    if (processedImages.length === 0) {
      processedImages = [getImagePlaceholder(category)];
    }

    return processedImages;
  }, [selectedColor, category]);

  useEffect(() => {
    const processed = processImages(images);
    setCurrentImages(processed);
    setActiveImageIndex(0);
  }, [images, selectedColor, processImages]);

  // Preload current and adjacent images
  const preloadUrls = currentImages.slice(
    Math.max(0, activeImageIndex - 1),
    activeImageIndex + 4
  );

  useImagePreloader(preloadUrls, {
    enabled: currentImages.length > 0,
    priority: 'high'
  });

  // Preload next images when index changes
  useEffect(() => {
    if (currentImages.length > 1) {
      imageManager.preloadNextImages(activeImageIndex, currentImages.length, currentImages);
    }
  }, [activeImageIndex, currentImages]);

  const getImageLoadingState = (index: number) => {
    // This is now handled by the OptimizedImage component
    return {
      loading: false,
      loaded: true,
      error: false,
    };
  };

  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getImageLoadingState,
    hasMultipleImages: currentImages.length > 1,
  };
};
