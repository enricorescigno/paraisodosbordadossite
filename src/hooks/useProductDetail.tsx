
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Product } from '@/types/product';
import { allProducts } from '@/utils/productUtils';
import { useProductImageManager } from './useProductImageManager';
import { cacheImagesInBrowser, preloadImages } from '@/utils/imageUtils';

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFromPortfolio, setIsFromPortfolio] = useState(false);
  
  // Initialize product and check if special product 204
  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      if (productId) {
        try {
          let foundProduct = allProducts.find(p => p.id.toString() === productId);
          
          // Special case for product 204
          if (productId === "204") {
            foundProduct = {
              id: 204,
              name: "Jogo Americano Requinte Ondulado",
              type: "product",
              category: "Mesa e Cozinha",
              imageUrl: "/lovable-uploads/77ef9243-1485-4e45-b51d-6e05b692b7e7.png", 
              description: "Jogo americano com bordado elegante, conjunto com 4 unidades.",
              colors: ["Branco", "Dourado", "Bege", "Marrom", "Rosa", "Verde", "Vinho"],
              sizes: [],
              rating: 4.9,
              isNew: true,
              features: [
                "Composição: 75% polipropileno e 25% poliéster", 
                "Diâmetro: 38cm", 
                "Conjunto com 4 unidades",
                "Fácil lavagem e secagem rápida",
                "Resistente para uso diário"
              ],
              keywords: ["jogo americano", "mesa", "cozinha", "bordado"],
            };
          }
          
          if (foundProduct) {
            if (foundProduct.colors && foundProduct.colors.length > 0) {
              setSelectedColor(foundProduct.colors[0]);
            }
            if (foundProduct.sizes && foundProduct.sizes.length > 0) {
              setSelectedSize(foundProduct.sizes[0]);
            }
            
            setIsFromPortfolio(foundProduct.type === 'portfolio');
            
            // Ensure default values for better UX
            if (!foundProduct.rating) foundProduct.rating = 4.8;
            if (!foundProduct.description) foundProduct.description = "Produto de alta qualidade da Paraíso dos Bordados.";
            if (!foundProduct.features) foundProduct.features = ["Qualidade premium", "Personalização disponível", "Material durável"];
            
            setProduct(foundProduct);
            
            // Preload images for better performance
            if (foundProduct.images && Array.isArray(foundProduct.images)) {
              cacheImagesInBrowser(foundProduct.images);
              preloadImages(foundProduct.images.slice(0, 3)); // Preload first three images
            } else if (foundProduct.imageUrl) {
              cacheImagesInBrowser([foundProduct.imageUrl]);
              preloadImages([foundProduct.imageUrl]);
            }
          } else {
            setProduct(null);
            toast.error("Produto não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao carregar produto:", error);
          toast.error("Erro ao carregar o produto. Tente novamente mais tarde.");
          setProduct(null);
        }
      }
      setLoading(false);
    }, 300); // Reduced timeout for faster loading
    
    return () => clearTimeout(timer);
  }, [productId]);

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
      const category = product.category.toLowerCase().replace(/\s+/g, '-');
      
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
