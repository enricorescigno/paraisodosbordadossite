
import { useMemo } from 'react';

/**
 * A hook that safely handles and validates image arrays
 * 
 * @param {string[] | undefined} images - Array of image URLs
 * @param {string} fallbackImage - Fallback image URL if needed
 * @returns {string[]} - A clean array of valid image URLs
 */
export const useSafeImages = (images?: string[] | null, fallbackImage: string = '/placeholder.svg'): string[] => {
  return useMemo(() => {
    try {
      // If images is null or undefined, or not an array
      if (!images || !Array.isArray(images)) {
        return [fallbackImage];
      }
      
      // Filter out any falsy values (undefined, null, empty string)
      const validImages = images.filter(Boolean);
      
      // If we have no valid images and a fallback was provided, use it
      if (validImages.length === 0) {
        return [fallbackImage];
      }
      
      // Make sure all elements are strings
      const safeImages = validImages.map(img => 
        typeof img === 'string' ? img : fallbackImage
      );
      
      return safeImages;
    } catch (error) {
      console.error("Error in useSafeImages:", error);
      return [fallbackImage];
    }
  }, [images, fallbackImage]);
};

export default useSafeImages;
