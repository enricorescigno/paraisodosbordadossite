
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Product } from '../types/product';
import { allProducts } from '../utils/productUtils';

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFromPortfolio, setIsFromPortfolio] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      if (productId) {
        let foundProduct = allProducts.find(p => p.id.toString() === productId);
        
        if (foundProduct) {
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          }
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
          
          setIsFromPortfolio(foundProduct.type === 'portfolio');
          
          if (!foundProduct.rating) foundProduct.rating = 4.8;
          if (!foundProduct.description) foundProduct.description = "Produto de alta qualidade da Paraíso dos Bordados.";
          if (!foundProduct.features) foundProduct.features = ["Qualidade premium", "Personalização disponível", "Material durável"];
          
          setProduct(foundProduct);
          
          initializeImages(foundProduct);
        } else {
          setProduct(null);
        }
      }
      setLoading(false);
    }, 500);
  }, [productId]);

  const initializeImages = (product: Product) => {
    if (!product) return;
    
    if (product.images && typeof product.images === 'object' && !Array.isArray(product.images)) {
      const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : '';
      const colorImages = defaultColor && product.images[defaultColor] ? product.images[defaultColor] : [];
      setCurrentImages(colorImages);
      setActiveImageIndex(0);
    } 
    else if (product.images && Array.isArray(product.images)) {
      setCurrentImages(product.images);
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
    if (!product || !selectedColor) return;
    
    if (product.images && typeof product.images === 'object' && !Array.isArray(product.images)) {
      const colorImages = product.images[selectedColor] || [];
      setCurrentImages(colorImages);
      setActiveImageIndex(0);
    }
  }, [selectedColor, product]);

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

  const placeholder = (category: string) => {
    const placeholders: Record<string, string> = {
      'Cama, Mesa e Banho': '/images/placeholders/home-textile.jpg',
      'Cama': '/images/placeholders/home-textile.jpg',
      'Mesa e Cozinha': '/images/placeholders/home-textile.jpg',
      'Banho': '/images/placeholders/towel.jpg',
      'Infantil': '/images/placeholders/kids.jpg',
      'Vestuário': '/images/placeholders/clothing.jpg',
      'Jaleco': '/images/placeholders/uniform.jpg',
      'Pantufas': '/images/placeholders/slippers.jpg',
      'Bonés Bordados': '/images/placeholders/cap.jpg',
      'Bordado em Necessaire': '/images/placeholders/necessaire.jpg',
      'Bordado em Bolsa': '/images/placeholders/bag.jpg',
      'Jalecos': '/images/placeholders/uniform.jpg',
      'Roupões Infantis': '/images/placeholders/kids-embroidery.jpg',
      'Toalhas Infantis': '/images/placeholders/towel.jpg'
    };
    
    return placeholders[category] || 'https://via.placeholder.com/500x500?text=Produto';
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
    getWhatsAppLink,
    getBackLink,
    placeholder
  };
};
