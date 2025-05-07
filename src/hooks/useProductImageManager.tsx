
import { useState, useMemo, useCallback } from 'react';
import useSafeImages from './useSafeImages';
import { getImagePlaceholder } from '@/utils/imageUtils';

interface ProductImageManagerProps {
  images?: string[];
  category?: string;
}

/**
 * Hook for managing product images safely
 */
const useProductImageManager = ({ images, category = '' }: ProductImageManagerProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Get placeholder based on category
  const defaultPlaceholder = useMemo(() => 
    getImagePlaceholder(category), [category]);
  
  // Use our safe images hook with additional error handling
  const validImages = useSafeImages(images, defaultPlaceholder);
  
  // Get current images using useMemo to prevent unnecessary recalculations
  const currentImages = useMemo(() => {
    try {
      // Ensure we always return a valid array
      return validImages && validImages.length > 0 
        ? validImages 
        : [defaultPlaceholder];
    } catch (error) {
      console.error("Error getting current images:", error);
      return [defaultPlaceholder];
    }
  }, [validImages, defaultPlaceholder]);
  
  // Memoized placeholder getter
  const getPlaceholder = useCallback((categoryName?: string) => {
    try {
      return getImagePlaceholder(categoryName || category);
    } catch (error) {
      console.error("Error getting placeholder for category:", category, error);
      return '/placeholder.svg';
    }
  }, [category]);
  
  // Reset active index if images change
  useMemo(() => {
    setActiveImageIndex(0);
  }, [validImages]);
  
  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getPlaceholder
  };
};

export default useProductImageManager;
