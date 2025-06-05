
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useProductDomain } from './useProductDomain';
import { useProductImageManager } from './useProductImageManager';
import { ProductAdapter } from '../data/adapters/ProductAdapter';
import { cacheImagesInBrowser, preloadImages } from '@/utils/imageUtils';
import { toAbsoluteURL } from '@/utils/urlUtils';

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFromPortfolio, setIsFromPortfolio] = useState(false);
  
  // Use domain layer for product management
  const { product: domainProduct, loading, error, processProductImages } = useProductDomain(productId);
  
  // Convert domain product to legacy format for backward compatibility
  const product = domainProduct ? ProductAdapter.toLegacyProduct({
    id: domainProduct.id,
    name: domainProduct.name,
    type: domainProduct.type,
    category: domainProduct.category as any,
    description: domainProduct.description,
    price: domainProduct.pricing.price,
    images: domainProduct.images.map(img => img.url),
    colors: domainProduct.variants.colors,
    sizes: domainProduct.variants.sizes,
    rating: domainProduct.rating,
    isNew: domainProduct.isNew,
    features: domainProduct.features
  }) : null;

  // Initialize product data
  useEffect(() => {
    if (!domainProduct) return;

    // Set initial selections
    if (domainProduct.variants.hasColors()) {
      setSelectedColor(domainProduct.variants.getFirstColor() || "");
    }
    if (domainProduct.variants.hasSizes()) {
      setSelectedSize(domainProduct.variants.getFirstSize() || "");
    }
    
    setIsFromPortfolio(domainProduct.type === 'portfolio');
    
    // Preload images using domain layer
    const imageResult = processProductImages();
    if (imageResult && imageResult.hasImages) {
      const imageUrls = imageResult.images.map(img => toAbsoluteURL(img.url));
      try {
        cacheImagesInBrowser(imageUrls.slice(0, 3));
        preloadImages(imageUrls.slice(0, 3));
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    }
  }, [domainProduct, processProductImages]);

  // Use product image manager for handling color and images
  const { 
    currentImages, 
    activeImageIndex, 
    setActiveImageIndex,
    getPlaceholder 
  } = useProductImageManager(product, selectedColor);

  // Functions to control quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Generate WhatsApp link with product details
  const getWhatsAppLink = () => {
    if (!product) return '';
    
    let message = `Olá! Vi o ${product.name} e gostaria de fazer um orçamento!`;
    
    if (selectedColor) {
      message += ` Cor: ${selectedColor}.`;
    }
    
    if (selectedSize) {
      message += ` Tamanho: ${selectedSize}.`;
    }
    
    message += ` Quantidade: ${quantity}.`;
    
    return `https://wa.me/5581995970776?text=${encodeURIComponent(message)}`;
  };

  // Get back link based on product type and category
  const getBackLink = () => {
    if (isFromPortfolio || location.pathname.includes('/portfolio')) {
      return '/portfolio';
    }
    
    if (product && product.category) {
      const categoryMap: Record<string, string> = {
        'cama': '/categoria/cama',
        'mesa e cozinha': '/categoria/mesa-cozinha',
        'banho': '/categoria/banho',
        'infantil': '/categoria/infantil',
        'vestuário': '/categoria/vestuario',
        'jaleco': '/categoria/jaleco',
        'pantufa': '/categoria/pantufa',
        'bonés bordados': '/portfolio/bordado-bone',
        'bordado em necessaire': '/portfolio/bordado-necessaire',
        'bordado em bolsa': '/portfolio/bordado-bolsa',
        'jalecos': '/portfolio/bordado-jaleco',
        'roupões infantis': '/portfolio/bordado-infantis',
        'toalhas infantis': '/portfolio/bordado-toalha-banho'
      };
      
      return categoryMap[product.category.toLowerCase()] || '/produtos';
    }
    
    return '/produtos';
  };

  return {
    product,
    loading,
    error,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    isFromPortfolio,
    currentImages,
    activeImageIndex,
    setActiveImageIndex,
    getWhatsAppLink,
    getBackLink,
    placeholder: getPlaceholder
  };
};
