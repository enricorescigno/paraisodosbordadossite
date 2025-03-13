
import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { products } from '../utils/searchUtils';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Gerador de mensagens personalizadas para WhatsApp
const generateWhatsAppMessage = (itemTitle: string): string => {
  return encodeURIComponent(`Olá! Vi o ${itemTitle.toLowerCase()} e gostaria de fazer um orçamento!`);
};

const AllPortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    // In a real application, this would be an API call
    setLoading(true);
    setTimeout(() => {
      // Filter only portfolio items
      const portfolioProducts = products.filter(product => product.type === 'portfolio');
      setPortfolioItems(portfolioProducts);
      setFilteredItems(portfolioProducts);
      setLoading(false);
    }, 300); // Simulate network request
  }, []);
  
  // Filter items based on search and category
  useEffect(() => {
    let result = [...portfolioItems];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter(item => 
        item.category.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }
    
    setFilteredItems(result);
  }, [searchQuery, activeCategory, portfolioItems]);

  // Extract unique categories for filtering
  const categories = ['all', ...new Set(portfolioItems.map(item => 
    item.category.split(' ')[0].toLowerCase()
  ))];

  // Function to get category display name
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'all': 'Todos',
      'bordado': 'Bordado',
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  const whatsappNumber = "+5581995970776";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-10 md:py-16 bg-[#f5f5f7]">
        <div className="container-custom">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">Portfólio de Bordados</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto">
              Explore nossos trabalhos de bordado personalizados para diversas aplicações, feitos com qualidade e atenção aos detalhes.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Buscar no portfólio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="apple-input pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-brand-red focus:ring focus:ring-brand-red/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8 justify-center flex flex-col items-center">
            <TabsList className="bg-transparent overflow-x-auto py-2 w-auto flex flex-nowrap">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="rounded-xl overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]"
                >
                  <Link to={`/produto/${item.id}`} className="block">
                    <AspectRatio ratio={4/3} className="relative bg-[#f5f5f7]">
                      <img 
                        src={item.imageUrl || "https://via.placeholder.com/300x240?text=Sem+Imagem"} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </AspectRatio>
                  </Link>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <a 
                        href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(item.name)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-brand-red flex items-center gap-1 transition-all duration-300 hover:translate-x-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Solicitar orçamento</span>
                      </a>
                      <Link 
                        to={`/produto/${item.id}`}
                        className="text-brand-dark hover:text-brand-red transition-all duration-300 hover:translate-x-1"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">Nenhum item de portfólio encontrado.</p>
              <Link to="/" className="inline-block mt-4 btn-primary">
                Voltar para o início
              </Link>
            </div>
          )}
          
          {/* Navigation arrows (for carousel on desktop) */}
          {filteredItems.length > 3 && (
            <div className="hidden lg:flex justify-between mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
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
