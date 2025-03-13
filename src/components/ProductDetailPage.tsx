import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Star } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';

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
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

// Combined product data including all categories
const allProducts: Record<string, Product[]> = {
  // Products from main categories
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
  // Products from other categories - abbreviated for brevity
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

// Portfolio items data - same as in PortfolioPage.tsx
const allPortfolioItems: Record<string, PortfolioItem[]> = {
  'bordado-bone': [
    {
      id: 301,
      title: "Boné Personalizado Empresarial",
      description: "Bordado com logotipo empresarial, feito com linha de alta durabilidade.",
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1524901548305-08eeddc35080?q=80&w=500&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1585229259017-e527151ac558?q=80&w=500&auto=format&fit=crop",
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

// Flatten portfolio items
const flattenedPortfolioItems: PortfolioItem[] = Object.values(allPortfolioItems).reduce(
  (acc, items) => [...acc, ...items], 
  []
);

// Flatten all products into a single array for easy lookup by ID
const flattenedProducts: Product[] = Object.values(allProducts).reduce(
  (acc, products) => [...acc, ...products], 
  []
);

// Add portfolio product defaults
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
    // In a real app, this would be an API call to get product by ID
    setLoading(true);
    
    setTimeout(() => {
      if (productId) {
        // First try to find in regular products
        let foundProduct = flattenedProducts.find(p => p.id === parseInt(productId));
        
        if (foundProduct) {
          setProduct(foundProduct);
          setIsFromPortfolio(false);
        } else {
          // If not found, check portfolio items
          const portfolioItem = flattenedPortfolioItems.find(p => p.id === parseInt(productId));
          
          if (portfolioItem) {
            // Convert portfolio item to product format
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
        
        // Set default selections if product is found
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
    }, 500); // Simulate network request
  }, [productId]);

  const getWhatsAppLink = () => {
    if (!product) return '';
    
    // Create a personalized message based on the product name
    let message = `Olá! Vi o ${product.name.toLowerCase()} e gostaria de fazer um orçamento!`;
    
    // Add selected options to the message
    if (selectedColor) {
      message += ` Cor: ${selectedColor}.`;
    }
    
    if (selectedSize) {
      message += ` Tamanho: ${selectedSize}.`;
    }
    
    message += ` Quantidade: ${quantity}.`;
    
    // Create the WhatsApp link with the message
    return `https://wa.me/5581995970776?text=${encodeURIComponent(message)}`;
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Determine the back link based on where the user came from
  const getBackLink = () => {
    if (isFromPortfolio || location.pathname.includes('/portfolio')) {
      return '/portfolio';
    }
    return '/';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container-custom py-10">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product Image */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Details */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-700">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
                
                <p className="text-gray-600 mb-6">
                  {product.description || "Descrição do produto não disponível."}
                </p>
                
                {/* Product Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Características:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Cor:</h3>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 border rounded-md ${
                            selectedColor === color 
                              ? 'border-brand-red text-brand-red' 
                              : 'border-gray-300 text-gray-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Tamanho:</h3>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 border rounded-md ${
                            selectedSize === size 
                              ? 'border-brand-red text-brand-red' 
                              : 'border-gray-300 text-gray-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quantity Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Quantidade:</h3>
                  <div className="flex">
                    <button 
                      onClick={decrementQuantity}
                      className="border border-gray-300 px-3 py-1 rounded-l-md"
                    >
                      -
                    </button>
                    <div className="border-t border-b border-gray-300 px-4 py-1 flex items-center justify-center min-w-[60px]">
                      {quantity}
                    </div>
                    <button 
                      onClick={incrementQuantity}
                      className="border border-gray-300 px-3 py-1 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* WhatsApp Contact Button - Changed to red */}
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red/90 text-white px-6 py-3 rounded-lg transition-colors w-full md:w-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
            <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
            <Link to="/" className="btn-primary">
              Voltar para a loja
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
