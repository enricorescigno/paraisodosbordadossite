
import { useEffect, useState } from 'react';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
  portfolioType: string;
}

// Updated products to match portfolio categories from MenubarNav
const products: Product[] = [
  {
    id: 301,
    name: "Boné Personalizado Empresarial",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
    category: "Bordado em Boné",
    rating: 4.8,
    portfolioType: "bordado-bone"
  },
  {
    id: 310,
    name: "Necessaire Floral Bordada",
    image: "https://images.unsplash.com/photo-1596266651066-9d0033df4afd?q=80&w=500&auto=format&fit=crop",
    category: "Bordado em Necessaire",
    rating: 4.9,
    portfolioType: "bordado-necessaire"
  },
  {
    id: 320,
    name: "Bolsa Tote com Bordado",
    image: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop",
    category: "Bordado em Bolsa",
    rating: 4.7,
    portfolioType: "bordado-bolsa"
  },
  {
    id: 330,
    name: "Jaleco Médico Personalizado",
    image: "https://images.unsplash.com/photo-1524901548305-08eeddc35080?q=80&w=500&auto=format&fit=crop",
    category: "Bordado em Jaleco",
    rating: 5.0,
    portfolioType: "bordado-jaleco"
  }
];

// Gerador de mensagens personalizadas para WhatsApp
const generateWhatsAppMessage = (productName: string): string => {
  return encodeURIComponent(`Olá! Vi o produto ${productName.toLowerCase()} e gostaria de fazer um orçamento!`);
};

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [animateProducts, setAnimateProducts] = useState(false);
  
  // Extract unique portfolio categories for tabs
  const categories = ["all", ...new Set(products.map(product => product.portfolioType))];
  
  const categoryLabels: {[key: string]: string} = {
    "all": "Todos",
    "bordado-bone": "Bordado em Boné",
    "bordado-necessaire": "Bordado em Necessaire",
    "bordado-bolsa": "Bordado em Bolsa",
    "bordado-jaleco": "Bordado em Jaleco",
    "bordado-infantis": "Bordado Infantil",
    "bordado-toalha-banho": "Bordado em Toalha"
  };

  useEffect(() => {
    setAnimateProducts(false);
    
    setTimeout(() => {
      if (activeTab === "all") {
        setVisibleProducts(products);
      } else {
        const filtered = products.filter(
          product => product.portfolioType === activeTab
        );
        setVisibleProducts(filtered);
      }
      setAnimateProducts(true);
    }, 300);
  }, [activeTab]);

  const whatsappNumber = "+5581995970776";

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="section-title">Nosso Portfólio de Bordados</h2>
          <p className="section-subtitle">
            Conheça nossos trabalhos de bordado personalizados para diversas aplicações, feitos com qualidade e atenção aos detalhes.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 whitespace-nowrap rounded-full transition-all duration-300
                ${activeTab === category 
                  ? 'bg-brand-red text-white' 
                  : 'bg-white text-brand-dark hover:bg-brand-red/10'}`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {visibleProducts.map((product) => (
            <div 
              key={product.id}
              className={`product-card ${animateProducts ? 'animate-scale-in' : 'opacity-0'}`}
            >
              <Link to={`/produto/${product.id}`} className="block">
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-700">{product.rating.toFixed(1)}</span>
                </div>
                <h3 className="font-medium text-lg mb-3">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(product.name)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-brand-red flex items-center gap-1"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Solicitar orçamento
                  </a>
                  <Link 
                    to={`/produto/${product.id}`}
                    className="text-brand-dark hover:text-brand-red transition-colors duration-300"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Link */}
        <div className="flex justify-center mt-12">
          <Link 
            to="/portfolio"
            className="btn-secondary flex items-center gap-2"
          >
            Ver Todo o Portfólio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
