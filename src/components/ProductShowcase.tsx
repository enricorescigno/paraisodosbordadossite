import { useEffect, useState } from 'react';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 101,
    name: "Kit Bordado Floral",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop",
    category: "Kits",
    rating: 4.8
  },
  {
    id: 140,
    name: "Toalha Bordada à Mão",
    image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e7?q=80&w=500&auto=format&fit=crop",
    category: "Bordados Manuais",
    rating: 5.0
  },
  {
    id: 310,
    name: "Necessaire Bordada",
    image: "https://images.unsplash.com/photo-1596266651066-9d0033df4afd?q=80&w=500&auto=format&fit=crop",
    category: "Acessórios",
    rating: 4.7
  },
  {
    id: 150,
    name: "Kit Infantil Bordado",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=500&auto=format&fit=crop",
    category: "Bordados à Máquina",
    rating: 4.9
  }
];

const generateWhatsAppMessage = (productName: string): string => {
  return encodeURIComponent(`Olá! Vi o produto ${productName.toLowerCase()} e gostaria de fazer um orçamento!`);
};

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [animateProducts, setAnimateProducts] = useState(false);
  
  const categories = ["all", ...new Set(products.map(product => product.category.toLowerCase().replace(' ', '-')))];
  
  const categoryLabels: {[key: string]: string} = {
    "all": "Todos",
    "kits": "Kits",
    "bordados-manuais": "Bordados Manuais",
    "acessórios": "Acessórios",
    "bordados-à-máquina": "Bordados à Máquina"
  };

  useEffect(() => {
    setAnimateProducts(false);
    
    setTimeout(() => {
      if (activeTab === "all") {
        setVisibleProducts(products);
      } else {
        const filtered = products.filter(
          product => product.category.toLowerCase().replace(' ', '-') === activeTab
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
          <h2 className="section-title">Nossos Produtos</h2>
          <p className="section-subtitle">
            Explore nossa seleção de bordados e acessórios de alta qualidade, feitos com amor e dedicação.
          </p>
        </div>
        
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
        
        <div className="flex justify-center mt-12">
          <Link 
            to="/produtos"
            className="btn-secondary flex items-center gap-2"
          >
            Ver Todos os Produtos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
