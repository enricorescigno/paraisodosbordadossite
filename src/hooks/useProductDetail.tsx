
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useProductById } from './useProducts';
import { useProductColorVariants } from './useProductImages';
import { useCategoryBySlug } from './useCategories';

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFromPortfolio, setIsFromPortfolio] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch product data using React Query
  const { data: product, isLoading, error } = useProductById(productId || '0');
  
  // Fetch product color variants
  const { data: colorVariants, isLoading: loadingColorVariants } = 
    useProductColorVariants(product?.id || 0);

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      
      setIsFromPortfolio(product.type === 'portfolio');
      
      initializeImages();
    }
  }, [product, colorVariants]);

  const initializeImages = () => {
    if (!product) return;
    
    if (colorVariants && Object.keys(colorVariants).length > 0) {
      const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : '';
      const colorImages = defaultColor && colorVariants[defaultColor] ? colorVariants[defaultColor] : [];
      setCurrentImages(colorImages);
      setActiveImageIndex(0);
    } 
    else if (product.imageUrl) {
      setCurrentImages([product.imageUrl]);
      setActiveImageIndex(0);
    } 
    else {
      setCurrentImages([]);
    }
  };

  useEffect(() => {
    if (!product || !selectedColor || !colorVariants) return;
    
    if (colorVariants && Object.keys(colorVariants).length > 0) {
      const colorImages = colorVariants[selectedColor] || [];
      setCurrentImages(colorImages);
      setActiveImageIndex(0);
    }
  }, [selectedColor, colorVariants, product]);

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

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const getBackLink = () => {
    if (isFromPortfolio || location.pathname.includes('/portfolio')) {
      return '/portfolio';
    }
    
    if (product && product.category_id) {
      const categoryMap: Record<string, string> = {
        '2': '/categoria/cama',
        '3': '/categoria/mesa-cozinha',
        '4': '/categoria/banho',
        '5': '/categoria/infantil',
        '6': '/categoria/vestuario',
        '7': '/categoria/jaleco',
        '8': '/categoria/pantufa',
        '9': '/portfolio/bordado-bone',
        '10': '/portfolio/bordado-necessaire',
        '11': '/portfolio/bordado-bolsa',
        '12': '/portfolio/bordado-jaleco',
        '13': '/portfolio/bordado-infantis',
        '14': '/portfolio/bordado-toalha-banho'
      };
      
      return categoryMap[product.category_id.toString()] || '/produtos';
    }
    
    return '/produtos';
  };

  const placeholder = (categoryId: number) => {
    const placeholders: Record<number, string> = {
      1: '/images/placeholders/home-textile.jpg',
      2: '/images/placeholders/home-textile.jpg',
      3: '/images/placeholders/home-textile.jpg',
      4: '/images/placeholders/towel.jpg',
      5: '/images/placeholders/kids.jpg',
      6: '/images/placeholders/clothing.jpg',
      7: '/images/placeholders/uniform.jpg',
      8: '/images/placeholders/slippers.jpg',
      9: '/images/placeholders/cap.jpg',
      10: '/images/placeholders/necessaire.jpg',
      11: '/images/placeholders/bag.jpg',
      12: '/images/placeholders/uniform.jpg',
      13: '/images/placeholders/kids-embroidery.jpg',
      14: '/images/placeholders/towel.jpg'
    };
    
    return placeholders[categoryId] || 'https://via.placeholder.com/500x500?text=Produto';
  };

  return {
    product,
    loading: isLoading || loadingColorVariants,
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
    placeholder
  };
};
