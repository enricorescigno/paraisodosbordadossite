
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allProducts } from '../utils/productUtils';
import { Product } from '../types/product';

// Portfolio categories mapping
const PORTFOLIO_CATEGORIES = {
  'Bordado em Boné': 'bordado-bone',
  'Bordado em Necessaire': 'bordado-necessaire',
  'Bordado em Bolsa': 'bordado-bolsa',
  'Bordado em Jaleco': 'bordado-jaleco',
  'Bordado Infantis': 'bordado-infantis',
  'Bordado em Toalha de Banho': 'bordado-toalha-banho',
  'Bonés Bordados': 'bordado-bone',
  'Camisetas': 'vestuario',
  'Camisas Polo': 'vestuario',
  'Jalecos': 'bordado-jaleco',
  'Pantufas': 'vestuario',
  'Roupões Infantis': 'bordado-infantis',
  'Toalhas Infantis': 'bordado-toalha-banho'
};

const AllPortfolioPage = () => {
  const [loading, setLoading] = useState(true);
  const [allPortfolioItems, setAllPortfolioItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Simular carregamento para melhorar UX
    setLoading(true);
    setTimeout(() => {
      // Usar os produtos do nosso arquivo productUtils.ts
      const portfolioItems = allProducts.filter(product => 
        product.type === 'product' && product.category in PORTFOLIO_CATEGORIES
      );
      setAllPortfolioItems(portfolioItems);
      setFilteredItems(portfolioItems);
      setLoading(false);
    }, 300);
  }, []);

  // Filtrar itens com base na busca e categoria
  useEffect(() => {
    let result = [...allPortfolioItems];
    
    // Aplicar filtro de busca
    if (searchQuery) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Aplicar filtro de categoria
    if (activeCategory !== 'all') {
      result = result.filter(item => {
        // Mapear categoria do produto para o slug da rota
        const categorySlug = PORTFOLIO_CATEGORIES[item.category as keyof typeof PORTFOLIO_CATEGORIES];
        return categorySlug === activeCategory;
      });
    }
    
    setFilteredItems(result);
  }, [searchQuery, activeCategory, allPortfolioItems]);

  // Extrair categorias únicas para filtros
  const getUniqueCategories = () => {
    const categories = ['all'];
    const uniqueSlugs = new Set();
    
    allPortfolioItems.forEach(item => {
      const categorySlug = PORTFOLIO_CATEGORIES[item.category as keyof typeof PORTFOLIO_CATEGORIES];
      if (categorySlug && !uniqueSlugs.has(categorySlug)) {
        uniqueSlugs.add(categorySlug);
        categories.push(categorySlug);
      }
    });
    
    return categories;
  };

  const categories = getUniqueCategories();

  // Função para obter nome de exibição da categoria
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'all': 'Todos',
      'bordado-bone': 'Bordado em Boné',
      'bordado-necessaire': 'Bordado em Necessaire',
      'bordado-bolsa': 'Bordado em Bolsa',
      'bordado-jaleco': 'Bordado em Jaleco',
      'bordado-infantis': 'Bordado Infantil',
      'bordado-toalha-banho': 'Bordado em Toalha',
      'vestuario': 'Vestuário'
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className={`py-10 md:py-16 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
        <div className="container-custom">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">Nosso Portfólio</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto">
              Conheça nossos trabalhos de bordado personalizados para diversas aplicações, feitos com qualidade e atenção aos detalhes.
            </p>
            
            {/* Search Bar - Apple Style */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Buscar no portfólio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red
                  transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          {/* Category Tabs - Apple Style */}
          <Tabs defaultValue="all" className="mb-8 justify-center flex flex-col items-center">
            <TabsList className="bg-white rounded-full shadow-sm overflow-x-auto py-1 px-1 w-auto flex flex-nowrap">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-4 py-2 rounded-full data-[state=active]:bg-brand-red data-[state=active]:text-white"
                >
                  {getCategoryDisplayName(category)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
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
                      <span className="text-xs md:text-sm text-gray-600">Solicite um orçamento</span>
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
              <p className="text-lg text-gray-600">Nenhum item encontrado no portfólio.</p>
              <Link to="/" className="inline-block mt-4 btn-primary">
                Voltar para página inicial
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

export default AllPortfolioPage;
