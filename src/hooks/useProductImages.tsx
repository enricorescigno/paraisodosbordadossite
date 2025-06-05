
import { useState, useEffect, useCallback } from 'react';
import { useImageContext } from '@/contexts/ImageContext';
import { toAbsoluteURL } from '@/utils/urlUtils';
import { getImagePlaceholder } from '@/utils/imageUtils';

interface UseProductImagesProps {
  images: string[] | Record<string, string[]>;
  selectedColor?: string;
  category?: string;
  productId: string | number;
}

export const useProductImages = ({
  images,
  selectedColor,
  category = '',
  productId
}: UseProductImagesProps) => {
  const { state: imageState, dispatch: imageDispatch } = useImageContext();
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

  const preloadImages = useCallback((imageUrls: string[]) => {
    imageUrls.forEach((url, index) => {
      const cacheKey = `${productId}-${index}`;
      
      if (!imageState.cache[cacheKey]) {
        imageDispatch({ type: 'CACHE_IMAGE', payload: { key: cacheKey, url } });
        imageDispatch({ type: 'START_LOADING', payload: cacheKey });

        const img = new Image();
        img.onload = () => {
          imageDispatch({ type: 'IMAGE_LOADED', payload: cacheKey });
        };
        img.onerror = () => {
          imageDispatch({ type: 'IMAGE_ERROR', payload: cacheKey });
        };
        img.src = url;
      }
    });
  }, [productId, imageState.cache, imageDispatch]);

  useEffect(() => {
    const processed = processImages(images);
    setCurrentImages(processed);
    setActiveImageIndex(0);
    preloadImages(processed);
  }, [images, selectedColor, processImages, preloadImages]);

  const getImageLoadingState = (index: number) => {
    const cacheKey = `${productId}-${index}`;
    const cached = imageState.cache[cacheKey];
    return {
      loading: imageState.loading.has(cacheKey),
      loaded: cached?.loaded || false,
      error: cached?.error || false,
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
