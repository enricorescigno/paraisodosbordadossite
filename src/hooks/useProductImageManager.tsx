
import { useState, useEffect, useMemo } from 'react';

interface UseProductImageManagerParams {
  images?: string[];
  mainImage?: string;
  category?: string;
}

interface UseProductImageManagerReturn {
  currentImage: string;
  changeImage: (index: number) => void;
  imageIndex: number;
  allImages: string[];
  currentImages?: string[];
  activeImageIndex?: number;
  setActiveImageIndex?: (index: number) => void;
  getPlaceholder?: (name: string) => string;
}

export const useProductImageManager = ({ 
  images = [], 
  mainImage,
  category = ''
}: UseProductImageManagerParams): UseProductImageManagerReturn => {
  // Debug log the input parameters
  console.log("useProductImageManager - Init with params:", { 
    imagesLength: images?.length || 0, 
    mainImage: mainImage || 'none', 
    category 
  });

  // Ensure images is always a valid array
  const validImages = useMemo(() => {
    // Make sure images is a valid array or default to empty array
    const isValidImagesArray = Array.isArray(images) && images.length > 0;
    console.log("useProductImageManager - Received images:", images);
    console.log("useProductImageManager - Images validity:", isValidImagesArray);
    
    // Filter out any null or empty values
    if (isValidImagesArray) {
      return images.filter(img => img != null && img !== '');
    }
    return [];
  }, [images]);
  
  // Combine mainImage and other images into a single array
  const allImages = useMemo(() => {
    // Ensure we have valid images before proceeding
    if (!mainImage && validImages.length === 0) {
      console.log("No valid images or mainImage, checking if we have category info to generate fallback");
      
      if (category && category !== '') {
        console.log(`Using placeholders based on category: ${category}`);
        return getDefaultPlaceholders(category);
      }
      
      // Last resort fallback - try to extract an ID from the first image path if it exists
      const firstImagePath = images && images.length > 0 ? images[0] : '';
      const idMatch = firstImagePath.match(/\/(\d+)\.png$/);
      const id = idMatch ? idMatch[1] : '';
      
      if (id) {
        console.log(`Extracted ID ${id} from image path, using as fallback`);
        return [`/lovable-uploads/${id}.png`];
      }
      
      console.log("Using generic fallback placeholders");
      return getDefaultPlaceholders(category);
    }
    
    if (!mainImage) {
      console.log("Using only validImages:", validImages);
      return validImages;
    }
    
    // Check if mainImage is already in the images array
    const isMainImageIncluded = validImages.includes(mainImage);
    console.log("Main image already included in images?", isMainImageIncluded);
    return isMainImageIncluded ? validImages : [mainImage, ...validImages];
  }, [mainImage, validImages, category, images]);
  
  const [imageIndex, setImageIndex] = useState(0);
  
  // Reset image index when images change
  useEffect(() => {
    if (allImages && allImages.length > 0) {
      setImageIndex(0);
    }
  }, [allImages]);
  
  // Ensure imageIndex is valid before accessing allImages
  const safeImageIndex = imageIndex >= 0 && imageIndex < allImages.length ? imageIndex : 0;
  
  // Get the current image based on the index
  const currentImage = allImages[safeImageIndex] || getDefaultPlaceholder(category);
  
  // Function to safely change the current image
  const changeImage = (index: number) => {
    if (allImages && index >= 0 && index < allImages.length) {
      setImageIndex(index);
    }
  };
  
  // Add getPlaceholder functionality
  const getPlaceholder = (name: string): string => {
    return getDefaultPlaceholder(name);
  };
  
  // Debug log
  useEffect(() => {
    console.log("useProductImageManager - Final images array:", allImages);
  }, [allImages]);
  
  return {
    currentImage,
    changeImage,
    imageIndex: safeImageIndex,
    allImages: allImages || [],
    currentImages: allImages,
    activeImageIndex: safeImageIndex,
    setActiveImageIndex: changeImage,
    getPlaceholder
  };
};

// Helper functions to get placeholder images
const getDefaultPlaceholder = (category: string): string => {
  const lowerName = category.toLowerCase();
  if (lowerName.includes('necessaire') || lowerName.includes('bolsa')) {
    return "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop";
  } else if (lowerName.includes('toalha')) {
    return "https://images.unsplash.com/photo-1563293815-7b9673b068a9?q=80&w=500&auto=format&fit=crop";
  } else if (lowerName.includes('camisa') || lowerName.includes('fardamento') || lowerName.includes('avental')) {
    return "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop";
  } else if (lowerName.includes('infantil') || lowerName.includes('fralda') || lowerName.includes('macacão') || lowerName.includes('manta')) {
    return "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop";
  } else if (lowerName.includes('bordado') || lowerName.includes('bonés') || lowerName.includes('bones')) {
    return "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=500&auto=format&fit=crop";
  }
  return "https://via.placeholder.com/500x500?text=Sem+Imagem";
};

// Generate a default placeholders array based on category
const getDefaultPlaceholders = (category: string): string[] => {
  const mainPlaceholder = getDefaultPlaceholder(category);
  // Return an array with a placeholder to ensure a minimum gallery
  return [mainPlaceholder];
};

// Export as default for backward compatibility
export default useProductImageManager;
