
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
  // Add these missing properties
  currentImages?: string[];
  activeImageIndex?: number;
  setActiveImageIndex?: (index: number) => void;
  getPlaceholder?: (name: string) => string;
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
  
  // Add getPlaceholder functionality
  const getPlaceholder = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('necessaire') || lowerName.includes('bolsa')) {
      return "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop";
    } else if (lowerName.includes('toalha')) {
      return "https://images.unsplash.com/photo-1563293815-7b9673b068a9?q=80&w=500&auto=format&fit=crop";
    } else if (lowerName.includes('camisa') || lowerName.includes('fardamento') || lowerName.includes('avental')) {
      return "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop";
    } else if (lowerName.includes('infantil') || lowerName.includes('fralda') || lowerName.includes('macacão') || lowerName.includes('manta')) {
      return "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop";
    } else if (lowerName.includes('bordado')) {
      return "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=500&auto=format&fit=crop";
    }
    return "https://via.placeholder.com/500x500?text=Sem+Imagem";
  };
  
  return {
    currentImage,
    changeImage,
    imageIndex,
    allImages,
    currentImages: allImages,
    activeImageIndex: imageIndex,
    setActiveImageIndex: changeImage,
    getPlaceholder
  };
};

// Export as default for backward compatibility
export default useProductImageManager;
