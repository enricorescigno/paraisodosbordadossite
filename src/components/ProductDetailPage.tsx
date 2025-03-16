
import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Star, Truck, RefreshCw, ShieldCheck, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { AppleButton } from '@/components/ui/apple-button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { allProducts } from '../utils/productUtils';
import { Product } from '../types/product';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFromPortfolio, setIsFromPortfolio] = useState(false);
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
          setActiveImageIndex(0);
        } else {
          setProduct(null);
        }
      }
      setLoading(false);
    }, 500);
  }, [productId]);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container-custom pt-24 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
          </div>
        ) : product ? (
          <div className="animate-scale-in">
            <Link 
              to={getBackLink()} 
              className="inline-flex items-center text-gray-600 hover:text-brand-red mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isFromPortfolio ? 'Voltar para o portfólio' : 'Voltar para a loja'}
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white rounded-2xl overflow-hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images && product.images.length > 0 ? (
                      product.images.map((img, index) => (
                        <CarouselItem key={index}>
                          <AspectRatio ratio={1/1} className="bg-[#f8f8f8]">
                            <img 
                              src={img} 
                              alt={`${product.name} - Imagem ${index + 1}`}
                              className="w-full h-full object-contain mix-blend-multiply p-4"
                              onError={(e) => {
                                e.currentTarget.src = placeholder(product.category);
                              }}
                            />
                          </AspectRatio>
                        </CarouselItem>
                      ))
                    ) : product.imageUrl ? (
                      <CarouselItem>
                        <AspectRatio ratio={1/1} className="bg-[#f8f8f8]">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply p-4"
                            onError={(e) => {
                              e.currentTarget.src = placeholder(product.category);
                            }}
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ) : (
                      <CarouselItem>
                        <AspectRatio ratio={1/1} className="bg-[#f8f8f8]">
                          <img 
                            src={placeholder(product.category)}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply p-4"
                          />
                        </AspectRatio>
                      </CarouselItem>
                    )}
                  </CarouselContent>

                  {product.images && product.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </>
                  )}
                  
                  {product.images && product.images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {product.images.map((_, index) => (
                        <div 
                          key={index} 
                          className={`h-2 w-2 rounded-full cursor-pointer transition-colors ${
                            index === activeImageIndex ? 'bg-brand-red' : 'bg-gray-300'
                          }`}
                          onClick={() => setActiveImageIndex(index)}
                        ></div>
                      ))}
                    </div>
                  )}
                </Carousel>
              </div>
              
              <div className="flex flex-col justify-center">
                {product.isNew && (
                  <span className="inline-block bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-xs font-medium mb-3">
                    Novo
                  </span>
                )}
                
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-500">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-500">{(product.rating || 4.8).toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-base">
                  {product.description || "Produto de alta qualidade da Paraíso dos Bordados."}
                </p>
                
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-gray-800">Características:</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-red mt-1.5"></span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-gray-800">Cor:</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => {
                        const colorMap: Record<string, string> = {
                          "Branco": "#ffffff",
                          "Preto": "#000000",
                          "Azul": "#0066cc",
                          "Azul Claro": "#66a3ff",
                          "Verde": "#4cd964",
                          "Vermelho": "#ff3b30",
                          "Rosa": "#ff2d55",
                          "Amarelo": "#ffcc00",
                          "Laranja": "#ff9500",
                          "Roxo": "#5856d6",
                          "Cinza": "#8e8e93",
                          "Bege": "#e6d2b5",
                          "Marrom": "#8b4513",
                          "Creme": "#fffdd0",
                          "Personalizado": "#f5f5f7",
                          "Sob consulta": "#f5f5f7",
                        };
                        
                        const bgColor = colorMap[color] || "#f5f5f7";
                        
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`relative h-9 w-9 rounded-full transition-all duration-200
                              ${selectedColor === color ? 'ring-2 ring-offset-2 ring-brand-red' : ''}
                            `}
                            title={color}
                          >
                            <span 
                              className="absolute inset-0 rounded-full border border-gray-200"
                              style={{ backgroundColor: bgColor }}
                            ></span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 text-gray-800">Tamanho:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                            selectedSize === size 
                              ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                              : 'border-gray-300 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="font-semibold mb-3 text-gray-800">Quantidade:</h3>
                  <div className="flex w-full max-w-[180px]">
                    <button 
                      onClick={decrementQuantity}
                      className="border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-l-lg transition-colors"
                    >
                      -
                    </button>
                    <div className="border-t border-b border-gray-300 px-6 py-2 flex items-center justify-center min-w-[60px] bg-gray-50">
                      {quantity}
                    </div>
                    <button 
                      onClick={incrementQuantity}
                      className="border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-r-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-10"
                >
                  <AppleButton 
                    size="lg" 
                    className="w-full rounded-lg flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red/90"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Solicitar Orçamento
                  </AppleButton>
                </a>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-8">
                  <div className="flex flex-col items-center text-center">
                    <Truck className="h-8 w-8 text-brand-red mb-2" />
                    <h4 className="font-medium text-sm mb-1">Entrega rápida ou retirada</h4>
                    <p className="text-xs text-gray-500">Escolha a opção mais conveniente</p>
                    <a href="#" className="text-xs text-brand-red mt-2 flex items-center hover:underline">
                      Saiba mais <ChevronRight className="h-3 w-3" />
                    </a>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <RefreshCw className="h-8 w-8 text-brand-red mb-2" />
                    <h4 className="font-medium text-sm mb-1">Devolução fácil e gratuita</h4>
                    <p className="text-xs text-gray-500">Até 7 dias após o recebimento</p>
                    <a href="#" className="text-xs text-brand-red mt-2 flex items-center hover:underline">
                      Saiba mais <ChevronRight className="h-3 w-3" />
                    </a>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <ShieldCheck className="h-8 w-8 text-brand-red mb-2" />
                    <h4 className="font-medium text-sm mb-1">Compre com segurança</h4>
                    <p className="text-xs text-gray-500">Pagamentos criptografados</p>
                    <a href="#" className="text-xs text-brand-red mt-2 flex items-center hover:underline">
                      Saiba mais <ChevronRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
            <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
            <Link to="/">
              <AppleButton>
                Voltar para a loja
              </AppleButton>
            </Link>
          </div>
        )}
      </div>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default ProductDetailPage;
