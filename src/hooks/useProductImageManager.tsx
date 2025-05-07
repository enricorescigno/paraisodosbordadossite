
import { useState, useMemo, useCallback } from 'react';
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
    try {
      const fallbackCategory = categoryName || category || '';
      const categoryPlaceholders: Record<string, string> = {
        'Cama': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=250',
        'Banho': 'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?q=80&w=250',
        'Mesa e Cozinha': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=250',
        'Vestuário': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=250',
        'Infantil': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=250',
        'Bordados Infantis': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=250',
        'Tapete e Cortinas': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=250'
      };
      
      return categoryPlaceholders[fallbackCategory] || '/placeholder.svg';
    } catch (error) {
      console.error("Error getting placeholder for category:", category, error);
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
