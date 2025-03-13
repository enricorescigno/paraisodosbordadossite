import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Star, Truck, RefreshCw, ShieldCheck, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { AppleButton } from '@/components/ui/apple-button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
  description?: string;
  features?: string[];
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const allProducts: Record<string, Product[]> = {
  'cama-mesa-banho': [
    {
      id: 101,
      name: "Kit Bordado Cama, Mesa e Banho",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500&auto=format&fit=crop",
      category: "Cama, Mesa e Banho",
      rating: 4.9,
      description: "Kit completo de bordados para cama, mesa e banho feito com materiais premium e acabamento impecável.",
      features: ["100% Algodão", "Bordado à mão", "Lavável à máquina", "Kit com 6 peças"],
      colors: ["Branco", "Bege", "Azul Claro"],
      sizes: ["Único"]
    },
    {
      id: 102,
      name: "Toalha Bordada Decorativa",
      image: "https://images.unsplash.com/photo-1579656450812-5b1bcd4a952e?q=80&w=500&auto=format&fit=crop",
      category: "Cama, Mesa e Banho",
      rating: 4.7,
      description: "Toalha decorativa com bordados exclusivos, perfeita para dar um toque especial à sua mesa.",
      features: ["Bordado artesanal", "Material de alta qualidade", "Fácil de lavar"],
      colors: ["Branco", "Creme", "Rosa"],
      sizes: ["Pequena (1,2m)", "Média (1,5m)", "Grande (2m)"]
    }
  ],
  'infantil': [
    {
      id: 150,
      name: "Kit Berço Bordado",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=500&auto=format&fit=crop",
      category: "Infantil",
      rating: 4.9,
      description: "Kit completo para berço com bordados delicados, ideal para o quarto do bebê.",
      features: ["100% Algodão", "Antialérgico", "Inclui protetor, lençol e fronha"],
      colors: ["Azul", "Rosa", "Amarelo", "Verde"],
      sizes: ["Berço Padrão"]
    }
  ],
  'vestuario': [
    {
      id: 160,
      name: "Camisa Bordada Social",
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=500&auto=format&fit=crop",
      category: "Vestuário",
      rating: 4.7,
      description: "Camisa social com bordados elegantes, perfeita para ocasiões especiais.",
      features: ["Tecido nobre", "Bordado personalizado", "Confortável"],
      colors: ["Branco", "Azul", "Preto"],
      sizes: ["P", "M", "G", "GG"]
    }
  ]
};

const allPortfolioItems: Record<string, PortfolioItem[]> = {
  'bordado-bone': [
    {
      id: 301,
      title: "Boné Personalizado Empresarial",
      description: "Bordado com logotipo empresarial, feito com linha de alta durabilidade.",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Boné"
    },
    {
      id: 302,
      title: "Boné Esportivo Bordado",
      description: "Bordado com símbolos esportivos, perfeito para equipes e torcedores.",
      image: "https://images.unsplash.com/photo-1580880783109-4d9daf311df5?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Boné"
    }
  ],
  'bordado-necessaire': [
    {
      id: 310,
      title: "Necessaire Floral Bordada",
      description: "Bordado floral feito à mão, com detalhes em cores vibrantes.",
      image: "https://images.unsplash.com/photo-1596266651066-9d0033df4afd?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Necessaire"
    },
    {
      id: 311,
      title: "Necessaire com Monograma",
      description: "Bordado elegante com monograma personalizado, ideal para presentes.",
      image: "https://images.unsplash.com/photo-1502741126161-b048400d085d?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Necessaire"
    }
  ],
  'bordado-bolsa': [
    {
      id: 320,
      title: "Bolsa Tote com Bordado",
      description: "Bolsa resistente com bordado personalizado, feita para o dia a dia.",
      image: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Bolsa"
    },
    {
      id: 321,
      title: "Bolsa de Praia Bordada",
      description: "Bordado temático marinho, ideal para dias de sol e mar.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Bolsa"
    }
  ],
  'bordado-jaleco': [
    {
      id: 330,
      title: "Jaleco Médico Personalizado",
      description: "Bordado com nome e especialidade, feito com tecido antimicrobiano.",
      image: "https://images.unsplash.com/photo-1624711478065-83f88a296aad?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Jaleco"
    },
    {
      id: 331,
      title: "Jaleco para Dentistas",
      description: "Modelo exclusivo com bordado personalizado para profissionais da odontologia.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Jaleco"
    }
  ],
  'bordado-infantis': [
    {
      id: 340,
      title: "Babador Bordado",
      description: "Bordado temático infantil, feito com material hipoalergênico.",
      image: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=500&auto=format&fit=crop",
      category: "Bordado Infantis"
    },
    {
      id: 341,
      title: "Manta Infantil Personalizada",
      description: "Bordado com nome da criança, feito com algodão macio.",
      image: "https://images.unsplash.com/photo-1616627561839-074385245934?q=80&w=500&auto=format&fit=crop",
      category: "Bordado Infantis"
    }
  ],
  'bordado-toalha-banho': [
    {
      id: 350,
      title: "Toalha de Banho Premium",
      description: "Bordado elegante em toalha de alta absorção e durabilidade.",
      image: "https://images.unsplash.com/photo-1600431521340-491eca880813?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Toalha de Banho"
    },
    {
      id: 351,
      title: "Kit Toalhas Personalizadas",
      description: "Conjunto de toalhas com bordado uniforme, ideal para presentes.",
      image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e7?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Toalha de Banho"
    }
  ]
};

const flattenedPortfolioItems: PortfolioItem[] = Object.values(allPortfolioItems).reduce(
  (acc, items) => [...acc, ...items], 
  []
);

const flattenedProducts: Product[] = Object.values(allProducts).reduce(
  (acc, products) => [...acc, ...products], 
  []
);

const portfolioDefaults = {
  rating: 5.0,
  colors: ["Personalizado", "Sob consulta"],
  sizes: ["Único", "Personalizado"]
};

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isFromPortfolio, setIsFromPortfolio] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      if (productId) {
        let foundProduct = flattenedProducts.find(p => p.id === parseInt(productId));
        
        if (foundProduct) {
          setProduct(foundProduct);
          setIsFromPortfolio(false);
        } else {
          const portfolioItem = flattenedPortfolioItems.find(p => p.id === parseInt(productId));
          
          if (portfolioItem) {
            foundProduct = {
              id: portfolioItem.id,
              name: portfolioItem.title,
              image: portfolioItem.image,
              category: portfolioItem.category,
              description: portfolioItem.description,
              rating: portfolioDefaults.rating,
              colors: portfolioDefaults.colors,
              sizes: portfolioDefaults.sizes
            };
            
            setProduct(foundProduct);
            setIsFromPortfolio(true);
          } else {
            setProduct(null);
          }
        }
        
        if (foundProduct) {
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          }
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
        }
      }
      setLoading(false);
    }, 500);
  }, [productId]);

  const getWhatsAppLink = () => {
    if (!product) return '';
    
    let message = `Olá! Vi o ${product.name.toLowerCase()} e gostaria de fazer um orçamento!`;
    
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
    return '/';
  };

  const placeholder = (category: string) => {
    const placeholders: Record<string, string> = {
      'Cama, Mesa e Banho': '/images/placeholders/home-textile.jpg',
      'Infantil': '/images/placeholders/kids.jpg',
      'Vestuário': '/images/placeholders/clothing.jpg',
      'Bordado em Boné': '/images/placeholders/cap.jpg',
      'Bordado em Necessaire': '/images/placeholders/necessaire.jpg',
      'Bordado em Bolsa': '/images/placeholders/bag.jpg',
      'Bordado em Jaleco': '/images/placeholders/uniform.jpg',
      'Bordado Infantis': '/images/placeholders/kids-embroidery.jpg',
      'Bordado em Toalha de Banho': '/images/placeholders/towel.jpg'
    };
    
    return placeholders[category] || '/images/placeholders/default.jpg';
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
                    <CarouselItem>
                      <AspectRatio ratio={1/1} className="bg-[#f8f8f8]">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply p-4"
                          onError={(e) => {
                            e.currentTarget.src = placeholder(product.category);
                          }}
                        />
                      </AspectRatio>
                    </CarouselItem>
                    <div className="flex justify-center gap-2 mt-4">
                      <div className="h-2 w-2 rounded-full bg-brand-red"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                    </div>
                  </CarouselContent>
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
                    <span className="text-sm text-gray-500">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-base">
                  {product.description || "Descrição do produto não disponível."}
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
