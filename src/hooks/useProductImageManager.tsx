
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getImagePlaceholder } from '@/utils/imageUtils';
import { toAbsoluteURL } from '@/utils/urlUtils';

export const useProductImageManager = (product: Product | null, selectedColor: string) => {
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Provide a placeholder function that's safe to call even with no category
  const getPlaceholder = (category: string = '') => {
    return getImagePlaceholder(category);
  };

  // Helper function to process images with proper URL handling
  const processImages = (images: string[]) => {
    return images.map(img => toAbsoluteURL(img));
  };

  // Update images when product or selectedColor changes
  useEffect(() => {
    if (!product) {
      setCurrentImages(['/placeholder.svg']);
      return;
    }

    // Reset the active image index
    setActiveImageIndex(0);
    
    let images: string[] = [];

    // Special case handling for product with ID 204
    if (product.id === 204) {
      // For this product, we have images organized by color
      const colorImages = {
        "Branco": [
          "/lovable-uploads/77ef9243-1485-4e45-b51d-6e05b692b7e7.png",
          "/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png"
        ],
        "Dourado": [
          "/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png"
        ],
        "Bege": [
          "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png"
        ],
        "Marrom": [
          "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png"
        ],
        "Rosa": [
          "/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png"
        ],
        "Verde": [
          "/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png"
        ],
        "Vinho": [
          "/lovable-uploads/6406277c-f290-4a94-abb0-24f098dd74c6.png"
        ]
      };
      
      // Use the images for the selected color, or the first available color if no selection
      if (selectedColor && colorImages[selectedColor]) {
        images = processImages(colorImages[selectedColor]);
      } else {
        const firstColor = Object.keys(colorImages)[0];
        images = processImages(colorImages[firstColor]);
      }
    } 
    // Special case handling for "Jogo de Cama Solteiro 3 peças 180 Fios Supercal Flower Rosa"
    else if (product.id === "C002") {
      // Make sure we always get these specific images
      images = processImages([
        "/lovable-uploads/845b8ccc-939c-45c4-9d91-42cf5e89698c.png",
        "/lovable-uploads/0ee3c72e-4e7c-42df-ae4b-0cf74e20a54c.png",
        "/lovable-uploads/3499147c-700f-4062-a450-98a221bde195.png"
      ]);
    }
    // Special case handling for "Jogo de Cama Solteiro 3 peças 180 Fios Supercal Spot Grid"
    else if (product.id === "C003") {
      // Make sure we always get these specific images
      images = processImages([
        "/lovable-uploads/1549a9ae-63bb-48fa-9050-0816dd805a4c.png",
        "/lovable-uploads/701928ab-02b0-45d8-912f-172f5876b57c.png",
        "/lovable-uploads/d8c6a6d1-5103-4786-86bb-0bacd11df6a6.png"
      ]);
    }
    // If product has images object organized by color
    else if (product.images && typeof product.images === 'object' && !Array.isArray(product.images)) {
      if (selectedColor && product.images[selectedColor]) {
        // Selected color images exist
        if (Array.isArray(product.images[selectedColor])) {
          images = processImages(product.images[selectedColor]);
        }
      } else {
        // No selected color or selected color has no images, try to get any available images
        const firstColorWithImages = Object.keys(product.images).find(
          color => Array.isArray(product.images[color]) && product.images[color].length > 0
        );
        
        if (firstColorWithImages) {
          images = processImages(product.images[firstColorWithImages]);
        }
      }
    } 
    // If product has a simple images array
    else if (product.images && Array.isArray(product.images)) {
      images = processImages(product.images);
    }
    
    // If we still have no images, try using imageUrl
    if (images.length === 0 && product.imageUrl) {
      images = [toAbsoluteURL(product.imageUrl)];
    }
    
    // If we still have no images, use a placeholder based on product category
    if (images.length === 0) {
      const placeholder = getImagePlaceholder(product.category || '');
      images = [placeholder];
    }
    
    // Ensure all images have valid URLs
    images = images.filter(img => img && img.length > 0);
    
    // Set default placeholder if we somehow still have no images
    if (images.length === 0) {
      images = ['/placeholder.svg'];
    }
    
    setCurrentImages(images);
  }, [product, selectedColor]);

  return {
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getPlaceholder
  };
};
