
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
  // Validar as imagens recebidas
  const validImages = useMemo(() => {
    // Verifica se images é um array válido e não vazio
    const isValidImagesArray = Array.isArray(images) && images.length > 0;
    console.log("useProductImageManager - Received images:", images);
    console.log("useProductImageManager - Images validity:", isValidImagesArray);
    return isValidImagesArray ? images : [];
  }, [images]);
  
  // Combine mainImage and other images into a single array
  const allImages = useMemo(() => {
    if (!mainImage && validImages.length === 0) {
      console.log("No valid images or mainImage, using fallback placeholders");
      // Se não temos imagens válidas, usamos placeholders baseados na categoria
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
  }, [mainImage, validImages, category]);
  
  const [imageIndex, setImageIndex] = useState(0);
  
  // Reset image index when images change
  useEffect(() => {
    setImageIndex(0);
  }, [allImages]);
  
  // Get the current image based on the index
  const currentImage = allImages[imageIndex] || getDefaultPlaceholder(category);
  
  // Function to change the current image
  const changeImage = (index: number) => {
    if (index >= 0 && index < allImages.length) {
      setImageIndex(index);
    }
  };
  
  // Add getPlaceholder functionality
  const getPlaceholder = (name: string): string => {
    return getDefaultPlaceholder(name);
  };
  
  // Log para debug
  useEffect(() => {
    console.log("useProductImageManager - Final images array:", allImages);
  }, [allImages]);
  
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
  } else if (lowerName.includes('bordado')) {
    return "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=500&auto=format&fit=crop";
  }
  return "https://via.placeholder.com/500x500?text=Sem+Imagem";
};

// Gera um array de placeholders default baseado na categoria
const getDefaultPlaceholders = (category: string): string[] => {
  const mainPlaceholder = getDefaultPlaceholder(category);
  // Retorna um array com 2 imagens placeholder para garantir uma galeria mínima
  return [mainPlaceholder];
};

// Export as default for backward compatibility
export default useProductImageManager;
