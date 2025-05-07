
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
    // Even if validImages is empty, this will be an empty array
    return validImages;
  }, [validImages]);
  
  // Memoized placeholder getter
  const getPlaceholder = useCallback(() => {
    return getImagePlaceholder(category);
  }, [category]);
  
  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getPlaceholder
  };
};

export default useProductImageManager;
