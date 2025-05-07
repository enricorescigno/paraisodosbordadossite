
import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Product, ProductColor, ProductSize } from '@/types/product';
import { allProducts } from '@/utils/productUtils';
import useProductImageManager from '@/hooks/useProductImageManager';

// Safety functions for image handling
const safePreloadImages = (images: string[] = []) => {
  try {
    if (!Array.isArray(images) || images.length === 0) return;
    
    images.slice(0, 3).forEach(src => {
      if (typeof src !== 'string') return;
      
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  } catch (error) {
    console.error("Error preloading images:", error);
  }
};

const safeCacheImages = (images: string[] = []) => {
  try {
    if (!Array.isArray(images)) return;
    
    images.forEach(src => {
      if (typeof src !== 'string') return;
      
      const img = new Image();
      img.src = src;
    });
  } catch (error) {
    console.error("Error caching images:", error);
  }
};

export const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
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
    
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        setProduct(null);
        return;
      }
    
      setLoading(true);
      
      try {
        console.log("useProductDetail - Looking for product with ID:", productId);
        let foundProduct = allProducts.find(p => String(p.id) === String(productId));
        
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
          
          // Ensure product has necessary properties to avoid undefined errors
          const safeProduct = {
            ...foundProduct,
            images: foundProduct.images || [foundProduct.imageUrl || "/placeholder.svg"],
            imageUrl: foundProduct.imageUrl || "/placeholder.svg",
            description: foundProduct.description || "Produto de alta qualidade da Paraíso dos Bordados.",
            features: foundProduct.features || ["Qualidade premium"],
            type: foundProduct.type || "product",
            category: foundProduct.category || "Diversos"
          };
          
          // Safe state updates with mounted check
          if (isMountedRef.current) {
            // Convert string colors to color objects
            if (safeProduct.colors && Array.isArray(safeProduct.colors) && typeof safeProduct.colors[0] === 'string') {
              safeProduct.colors = (safeProduct.colors as string[]).map(color => ({
                name: color,
                value: color
              })) as ProductColor[];
            }
            
            // Convert string sizes to size objects
            if (safeProduct.sizes && Array.isArray(safeProduct.sizes) && typeof safeProduct.sizes[0] === 'string') {
              safeProduct.sizes = (safeProduct.sizes as string[]).map(size => ({
                name: size,
                value: size,
                available: true
              })) as ProductSize[];
            }
            
            if (safeProduct.colors && safeProduct.colors.length > 0) {
              const firstColor = (safeProduct.colors as ProductColor[])[0];
              setSelectedColor(firstColor.name);
            }
            
            if (safeProduct.sizes && safeProduct.sizes.length > 0) {
              const firstSize = (safeProduct.sizes as ProductSize[])[0];
              setSelectedSize(firstSize.name);
            }
            
            setIsFromPortfolio(safeProduct.type === 'portfolio');
            
            // Provide fallback values for missing fields
            if (!safeProduct.rating) safeProduct.rating = 4.8;
            
            // Ensure imageUrl is added to images if not already present
            if (safeProduct.imageUrl && safeProduct.images && !safeProduct.images.includes(safeProduct.imageUrl)) {
              safeProduct.images = [safeProduct.imageUrl, ...safeProduct.images];
            }
            
            setProduct(safeProduct);
            
            // Cache and preload images
            if (safeProduct.images && Array.isArray(safeProduct.images)) {
              try {
                safeCacheImages(safeProduct.images);
                safePreloadImages(safeProduct.images.slice(0, 3));
              } catch (error) {
                console.error("Error caching/preloading images:", error);
              }
            }
          }
        } else if (isMountedRef.current) {
          console.log("Product not found with ID:", productId);
          setProduct(null);
          toast.error("Produto não encontrado.");
          
          // Optional: redirect to products page after a delay
          setTimeout(() => {
            if (isMountedRef.current) {
              navigate('/produtos');
            }
          }, 3000);
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
    };
    
    fetchProduct();
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMountedRef.current = false;
    };
  }, [productId, navigate]);

  // Get product images in a safe way for the hook
  const safeImages = useMemo(() => {
    // Make sure we always return an array, even if empty
    return (product?.images && Array.isArray(product.images) && product.images.length > 0)
      ? product.images.filter(Boolean)
      : (product?.imageUrl ? [product.imageUrl] : ["/placeholder.svg"]);
  }, [product]);
  
  const safeCategory = product?.category || 'Diversos';
  
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
