
import { useState, useEffect, useMemo } from 'react';

interface UseProductImageManagerParams {
  images: string[];
  mainImage?: string;
}

interface UseProductImageManagerReturn {
  currentImage: string;
  changeImage: (index: number) => void;
  imageIndex: number;
  allImages: string[];
}

export const useProductImageManager = ({ 
  images = [], 
  mainImage 
}: UseProductImageManagerParams): UseProductImageManagerReturn => {
  // Combine mainImage and other images into a single array
  const allImages = useMemo(() => {
    if (!mainImage) return images;
    
    // Check if mainImage is already in the images array
    const isMainImageIncluded = images.includes(mainImage);
    return isMainImageIncluded ? images : [mainImage, ...images];
  }, [mainImage, images]);
  
  const [imageIndex, setImageIndex] = useState(0);
  
  // Reset image index when images change
  useEffect(() => {
    setImageIndex(0);
  }, [allImages]);
  
  // Get the current image based on the index
  const currentImage = allImages[imageIndex] || '';
  
  // Function to change the current image
  const changeImage = (index: number) => {
    if (index >= 0 && index < allImages.length) {
      setImageIndex(index);
    }
  };
  
  return {
    currentImage,
    changeImage,
    imageIndex,
    allImages
  };
};

// Export as default for backward compatibility
export default useProductImageManager;
