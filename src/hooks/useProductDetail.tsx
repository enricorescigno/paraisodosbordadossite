
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductById } from './useProducts';

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading: loading } = useProductById(productId);
  
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  
  // Set defaults when product loads
  useEffect(() => {
    if (product) {
      // Default to first color if available
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      
      // Default to first size if available
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);
  
  // Calculate current images based on selected color
  const currentImages = product?.imagesByColor?.[selectedColor] || product?.images || [];
  
  // Utility functions
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  const getWhatsAppLink = () => {
    const baseUrl = "https://wa.me/+5581995970776";
    
    let message = `Olá! Gostaria de orçamento para o produto: ${product?.name}`;
    
    if (selectedColor) {
      message += `, na cor: ${selectedColor}`;
    }
    
    if (selectedSize) {
      message += `, tamanho: ${selectedSize}`;
    }
    
    if (quantity > 1) {
      message += `, quantidade: ${quantity} unidades`;
    }
    
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  };
  
  const getBackLink = () => {
    if (!product) return '/produtos';
    
    if (product.type === 'portfolio') {
      return '/portfolio';
    }
    
    return '/produtos';
  };
  
  const placeholder = (category: string) => {
    return `https://via.placeholder.com/500x500?text=${encodeURIComponent(category || 'Produto')}`;
  };
  
  return {
    product,
    loading,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    currentImages,
    getWhatsAppLink,
    getBackLink,
    placeholder
  };
};

export default useProductDetail;
