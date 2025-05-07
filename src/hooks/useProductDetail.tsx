
import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Product, ProductColor, ProductSize } from '@/types/product';
import { allProducts } from '@/utils/productUtils';
import useProductImageManager from '@/hooks/useProductImageManager';
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
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    // Set mounting flag
    isMountedRef.current = true;
    
    if (productId) {
      setLoading(true);
      
      try {
        console.log("useProductDetail - Looking for product with ID:", productId);
        let foundProduct = allProducts.find(p => p.id.toString() === productId);
        
        // Special handling for product 204 (could be moved to a config)
        if (productId === "204") {
          foundProduct = {
            id: "204",
            name: "Jogo Americano Requinte Ondulado",
            type: "product",
            category: "Mesa e Cozinha",
            imageUrl: "/lovable-uploads/77ef9243-1485-4e45-b51d-6e05b692b7e7.png", 
            description: "Jogo americano com bordado elegante, conjunto com 4 unidades.",
            colors: [
              { name: "Branco", value: "#FFFFFF" },
              { name: "Dourado", value: "#DAA520" },
              { name: "Bege", value: "#F5F5DC" },
              { name: "Marrom", value: "#8B4513" },
              { name: "Rosa", value: "#FFC0CB" },
              { name: "Verde", value: "#008000" },
              { name: "Vinho", value: "#800020" }
            ],
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
          console.log("useProductDetail - Found product:", foundProduct);
          
          // Corrigir estrutura de imagens baseada no imageUrl já existente
          if (
            !foundProduct.images ||
            !Array.isArray(foundProduct.images) ||
            foundProduct.images.length === 0
          ) {
            foundProduct.images = [foundProduct.imageUrl || "/placeholder.png"];
          }
          
          // Safe state updates with mounted check
          if (isMountedRef.current) {
            // Convert string colors to color objects
            if (foundProduct.colors && Array.isArray(foundProduct.colors) && typeof foundProduct.colors[0] === 'string') {
              foundProduct.colors = (foundProduct.colors as string[]).map(color => ({
                name: color,
                value: color
              })) as ProductColor[];
            }
            
            // Convert string sizes to size objects
            if (foundProduct.sizes && Array.isArray(foundProduct.sizes) && typeof foundProduct.sizes[0] === 'string') {
              foundProduct.sizes = (foundProduct.sizes as string[]).map(size => ({
                name: size,
                value: size,
                available: true
              })) as ProductSize[];
            }
            
            if (foundProduct.colors && foundProduct.colors.length > 0) {
              const firstColor = (foundProduct.colors as ProductColor[])[0];
              setSelectedColor(firstColor.name);
            }
            
            if (foundProduct.sizes && foundProduct.sizes.length > 0) {
              const firstSize = (foundProduct.sizes as ProductSize[])[0];
              setSelectedSize(firstSize.name);
            }
            
            setIsFromPortfolio(foundProduct.type === 'portfolio');
            
            // Provide fallback values for missing fields
            if (!foundProduct.rating) foundProduct.rating = 4.8;
            if (!foundProduct.description) foundProduct.description = "Produto de alta qualidade da Paraíso dos Bordados.";
            if (!foundProduct.features) foundProduct.features = ["Qualidade premium", "Personalização disponível", "Material durável"];
            
            // Ensure imageUrl is added to images if not already present
            if (foundProduct.imageUrl && foundProduct.images && !foundProduct.images.includes(foundProduct.imageUrl)) {
              foundProduct.images = [foundProduct.imageUrl, ...foundProduct.images];
            }
            
            setProduct(foundProduct);
            
            // Cache and preload images
            if (foundProduct.images && Array.isArray(foundProduct.images)) {
              cacheImagesInBrowser(foundProduct.images);
              preloadImages(foundProduct.images.slice(0, 3));
            }
          }
        } else if (isMountedRef.current) {
          setProduct(null);
          toast.error("Produto não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        if (isMountedRef.current) {
          toast.error("Erro ao carregar o produto. Tente novamente mais tarde.");
          setProduct(null);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMountedRef.current = false;
    };
  }, [productId]);

  // Get product images in a safe way for the hook
  const safeImages = useMemo(() => {
    return product?.images && Array.isArray(product.images) ? product.images.filter(Boolean) : 
           (product?.id ? [`/lovable-uploads/${product.id}.png`] : []);
  }, [product]);
  
  const safeCategory = product?.category || '';
  
  // Use the hook with product images and category for better fallback
  const { 
    currentImages, 
    activeImageIndex, 
    setActiveImageIndex, 
    getPlaceholder 
  } = useProductImageManager({
    images: safeImages,
    category: safeCategory
  });

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

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

export default useProductDetail;
