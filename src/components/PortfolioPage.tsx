
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Star, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { allProducts } from '../utils/productUtils';
import { Product } from '../types/product';

// Portfolio categories mapping
const PORTFOLIO_CATEGORIES: Record<string, string> = {
  'bordado-bone': 'Bonés Bordados',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Jalecos',
  'bordado-infantis': 'Roupões Infantis',
  'bordado-toalha-banho': 'Toalhas Infantis',
};

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'bordado-bone': 'Bordado em Boné',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Bordado em Jaleco',
  'bordado-infantis': 'Bordado Infantil',
  'bordado-toalha-banho': 'Bordado em Toalha de Banho'
};

// Gerador de mensagens personalizadas para WhatsApp
const generateWhatsAppMessage = (productName: string, colors?: string[], sizes?: string[]): string => {
  let message = `Olá! Vi o produto ${productName} e gostaria de fazer um orçamento!`;
  
  if (colors && colors.length > 0) {
    message += `\nCor: ${colors.join(', ')}.`;
  }
  
  if (sizes && sizes.length > 0) {
    message += `\nTamanho: ${sizes.join(', ')}.`;
  }
  
  message += "\nQuantidade: [campo para preencher]";
  
  return encodeURIComponent(message);
};

const PortfolioPage = () => {
  const location = useLocation();
  const [portfolioItems, setPortfolioItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const whatsappNumber = "+5581995970776";
  
  useEffect(() => {
    // Extract the category from the URL path
    const pathParts = location.pathname.split('/');
    const categoryPath = pathParts[pathParts.length - 1];
    
    // In a real application, this would be an API call
    setLoading(true);
    setTimeout(() => {
      // Obter produtos do productUtils.ts que correspondem à categoria do portfólio
      const matchingCategory = PORTFOLIO_CATEGORIES[categoryPath] || '';
      
      let categoryItems: Product[] = [];
      
      if (matchingCategory) {
        // Filtra produtos que correspondem à categoria mapeada
        categoryItems = allProducts.filter(product => 
          product.type === 'portfolio' && 
          product.category === matchingCategory
        );
      }
      
      // Se não encontrar itens de portfólio, buscar como produtos normais
      if (categoryItems.length === 0) {
        categoryItems = allProducts.filter(product => 
          product.category === matchingCategory || 
          product.category === categoryTitles[categoryPath]
        );
      }
      
      setPortfolioItems(categoryItems);
      setFilteredItems(categoryItems);
      setLoading(false);
    }, 300); // Simulate network request
  }, [location.pathname]);
  
  // Filter items based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(portfolioItems);
    } else {
      const filtered = portfolioItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, portfolioItems]);
  
  // Extract the category from the URL path for title
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-10 md:py-16 bg-[#f5f5f7]">
        <div className="container-custom">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">{categoryTitle}</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto">
              Explore nossos trabalhos de {categoryTitle.toLowerCase()} feitos com qualidade e atenção aos detalhes.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder={`Buscar em ${categoryTitle}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="apple-input pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-brand-red focus:ring focus:ring-brand-red/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="rounded-xl overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]"
                >
                  <Link to={`/produto/${item.id}`} className="block">
                    <AspectRatio ratio={1/1} className="relative bg-[#f5f5f7]">
                      <img 
                        src={item.imageUrl || (item.images && item.images[0])} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(item.category)}`;
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      {item.isNew && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full">
                            Novo
                          </span>
                        </div>
                      )}
                    </AspectRatio>
                  </Link>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{item.rating || 4.8}</span>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-3 line-clamp-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <a 
                        href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(item.name, item.colors, item.sizes)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs md:text-sm text-gray-600 hover:text-brand-red flex items-center gap-1 transition-all"
                      >
                        <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span>Solicitar orçamento</span>
                      </a>
                      <Link 
                        to={`/produto/${item.id}`}
                        className="text-brand-dark hover:text-brand-red transition-colors duration-300"
                      >
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">Nenhum item encontrado nesta categoria.</p>
              <Link to="/portfolio" className="inline-block mt-4 btn-primary">
                Ver todas as categorias
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default PortfolioPage;
