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

  const colorToImageMap: Record<string, string[]> = {
    "Branco": ["/lovable-uploads/77ef9243-1485-4e45-b51d-6e05b692b7e7.png"],
    "Dourado": ["/lovable-uploads/a27a62b2-7cd7-4885-9237-e10a1a5af81c.png", "/lovable-uploads/daa147c3-5f33-4d21-9859-0f6e7394a707.png"],
    "Bege": ["/lovable-uploads/4de7cea7-6ec7-40d7-805f-b6376c8ce332.png", "/lovable-uploads/5bf87248-7116-437f-a17f-0ebf349f5a7d.png"],
    "Marrom": ["/lovable-uploads/a9039859-5fad-4bea-b70e-a421fc3a738e.png", "/lovable-uploads/ee1dd359-5e94-4d14-b056-54144ebfab02.png"],
    "Rosa": ["/lovable-uploads/7623d992-a209-4aa0-9e9f-6e61dd923525.png", "/lovable-uploads/027486e9-199c-4df5-b55b-f63c8c204a67.png"],
    "Verde": ["/lovable-uploads/a72a144c-bc6b-46e3-a186-c10371a08f4d.png", "/lovable-uploads/318328c5-e3a8-4a03-b50a-bbb8b83c0e6f.png"],
    "Vinho": ["/lovable-uploads/8c188ba5-a757-4b69-92ae-3746ceee13e3.png", "/lovable-uploads/490a9441-5e41-4629-9053-3e9f9e087263.png", "/lovable-uploads/aff65b30-525f-4368-926c-3bb14c5b54a6.png"],
    "Cobre": ["/lovable-uploads/97ec483a-beee-45ae-8a3a-773fc71c8368.png", "/lovable-uploads/fbfe7b78-08bd-45c6-ae97-f62616c4a07a.png"]
  };

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      if (productId) {
        let foundProduct = allProducts.find(p => p.id.toString() === productId);
        
        if (productId === "204") {
          foundProduct = {
            id: 204,
            name: "Jogo Americano Requinte Ondulado",
            type: "product",
            category: "Mesa e Cozinha",
            imageUrl: "/lovable-uploads/77ef9243-1485-4e45-b51d-6e05b692b7e7.png", 
            description: "Jogo americano com bordado elegante, conjunto com 4 unidades.",
            colors: ["Branco", "Dourado", "Bege", "Marrom", "Rosa", "Verde", "Vinho", "Cobre"],
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
          
          if (!foundProduct.rating) foundProduct.rating = 4.8;
          if (!foundProduct.description) foundProduct.description = "Produto de alta qualidade da Paraíso dos Bordados.";
          if (!foundProduct.features) foundProduct.features = ["Qualidade premium", "Personalização disponível", "Material durável"];
          
          setProduct(foundProduct);
          
          if (productId === "204") {
            const defaultColor = foundProduct.colors && foundProduct.colors.length > 0 ? foundProduct.colors[0] : '';
            if (defaultColor && colorToImageMap[defaultColor]) {
              setCurrentImages(colorToImageMap[defaultColor]);
            } else {
              setCurrentImages([foundProduct.imageUrl]);
            }
          } else {
            initializeImages(foundProduct);
          }
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
    if (!product) return;
    
    if (product.id.toString() === "204" && selectedColor) {
      console.log("Mudando para cor:", selectedColor);
      if (colorToImageMap[selectedColor]) {
        console.log("Imagens para esta cor:", colorToImageMap[selectedColor]);
        setCurrentImages(colorToImageMap[selectedColor]);
        setActiveImageIndex(0);
        return;
      }
    }
    
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
