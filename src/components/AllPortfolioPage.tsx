
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useMainCategories, useSubcategories } from '../hooks/useCategories';
import { Category } from '../types/database';

const AllPortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  
  // Fetch all portfolio items
  const { data: portfolioItems = [], isLoading } = useProducts('portfolio');
  
  // Fetch main categories
  const { data: mainCategories = [] } = useMainCategories('portfolio');
  
  // State for filtered items
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  
  // Filter items based on category
  useEffect(() => {
    if (portfolioItems.length > 0) {
      let result = [...portfolioItems];
      
      // Apply category filter
      if (activeCategory !== 'all') {
        result = portfolioItems.filter(item => {
          const category = mainCategories.find((cat: Category) => cat.id === item.category_id);
          
          if (category) {
            return category.slug === activeCategory;
          }
          
          return false;
        });
      }
      
      setFilteredItems(result);
    }
  }, [activeCategory, portfolioItems, mainCategories]);

  // Prepare categories for filtering
  const categories = [
    { id: 'all', name: 'Todos', slug: 'all' },
    ...mainCategories
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className={`py-16 md:py-24 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
        <div className="container-custom">
          <div className="mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight font-medium text-center">
              Nosso Portfólio
            </h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-normal">
              Conheça nossos trabalhos de bordado personalizados para diversas aplicações, feitos com qualidade e atenção aos detalhes.
            </p>
          </div>
          
          {/* Category Tabs - Apple Style */}
          <Tabs defaultValue="all" className="mb-16 justify-center flex flex-col items-center">
            <TabsList className="bg-white rounded-full shadow-sm overflow-x-auto py-1 px-1 w-auto flex flex-nowrap">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className="px-4 py-2 rounded-full data-[state=active]:bg-brand-red data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {filteredItems.map((item) => (
                    <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-4">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-6 overflow-hidden">
                            <img 
                              src={item.images?.[0]} 
                              alt={item.name}
                              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(item.category)}`;
                              }}
                            />
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-sans tracking-tight font-medium text-center mb-2">{item.name}</h3>
                          
                          {item.shortDescription && (
                            <p className="text-center text-gray-500 mb-6 max-w-md">
                              {item.shortDescription}
                            </p>
                          )}
                          
                          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                            <Link to={`/produto/${item.id}`}>
                              <Button 
                                variant="default" 
                                size="lg" 
                                className="rounded-full px-8"
                              >
                                Ver Detalhes
                              </Button>
                            </Link>
                            
                            <a href={`https://wa.me/${whatsappNumber}?text=Olá! Vi o produto ${item.name} no portfólio e gostaria de solicitar um orçamento.`} target="_blank" rel="noopener noreferrer">
                              <Button 
                                variant="outline" 
                                size="lg" 
                                className="rounded-full px-8"
                              >
                                Solicitar Orçamento
                              </Button>
                            </a>
                          </div>
                        </motion.div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="absolute bottom-0 right-8 flex space-x-2 mt-8">
                  <CarouselPrevious className="relative inset-0 translate-y-0 h-10 w-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </CarouselPrevious>
                  <CarouselNext className="relative inset-0 translate-y-0 h-10 w-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </CarouselNext>
                </div>
              </Carousel>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">Nenhum item encontrado no portfólio.</p>
              <Link to="/" className="inline-block mt-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="rounded-full px-8"
                >
                  Voltar para página inicial
                </Button>
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
