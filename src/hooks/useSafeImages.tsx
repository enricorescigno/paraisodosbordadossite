
import { useMemo } from 'react';

/**
 * A hook that safely handles and validates image arrays
 * 
 * @param {string[] | undefined} images - Array of image URLs
 * @param {string} fallbackImage - Fallback image URL if needed
 * @returns {string[]} - A clean array of valid image URLs
 */
export const useSafeImages = (images?: string[] | null, fallbackImage?: string): string[] => {
  return useMemo(() => {
    if (!images || !Array.isArray(images)) {
      return fallbackImage ? [fallbackImage] : ['/placeholder.svg'];
    }
    
    // Filter out any falsy values (undefined, null, empty string)
    const validImages = images.filter(Boolean);
    
    // If we have no valid images and a fallback was provided, use it
    if (validImages.length === 0) {
      return fallbackImage ? [fallbackImage] : ['/placeholder.svg'];
    }
    
    return validImages;
  }, [images, fallbackImage]);
};

export default useSafeImages;
