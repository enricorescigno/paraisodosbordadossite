
import { useState, useMemo, useCallback } from 'react';
import { getImagePlaceholder } from '@/utils/imageUtils';
import useSafeImages from './useSafeImages';

interface ProductImageManagerProps {
  images?: string[];
  category?: string;
}

/**
 * Hook for managing product images safely
 */
const useProductImageManager = ({ images, category = '' }: ProductImageManagerProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Use our safe images hook to prevent issues with invalid image arrays
  const validImages = useSafeImages(images, `/placeholder.svg`);
  
  // Get current images using useMemo to prevent unnecessary recalculations
  const currentImages = useMemo(() => {
    // Ensure we always return a valid array
    return validImages && validImages.length > 0 ? validImages : ['/placeholder.svg'];
  }, [validImages]);
  
  // Memoized placeholder getter
  const getPlaceholder = useCallback((categoryName?: string) => {
    const fallbackCategory = categoryName || category;
    try {
      return getImagePlaceholder(fallbackCategory);
    } catch (error) {
      console.error("Error getting placeholder for category:", fallbackCategory, error);
      return '/placeholder.svg';
    }
  }, [category]);
  
  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getPlaceholder
  };
};

export default useProductImageManager;
