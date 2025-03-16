
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { initializeDatabase } from '@/services/localDatabaseService';

const AllProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  
  // Initialize the database when the component mounts
  useEffect(() => {
    initializeDatabase();
  }, []);
  
  // Fetch products using React Query
  const { products, isLoading } = useProducts('product');
  
  // Fetch categories using React Query
  const { categories } = useCategories();
  
  // Filter products based on category
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  
  useEffect(() => {
    if (!products) return;
    
    let result = [...products];
    
    // Apply category filter
    if (activeCategory !== 'all') {
      const category = categories.find(c => c.slug === activeCategory);
      
      if (category) {
        result = result.filter(product => product.category_id === category.id);
      } else {
        // If no exact match, try finding a category that contains the active category in its name
        result = result.filter(product => {
          const productCategory = categories.find(c => c.id === product.category_id);
          return productCategory && 
                 (productCategory.name.toLowerCase().includes(activeCategory) || 
                  activeCategory.includes(productCategory.name.toLowerCase()));
        });
      }
    }
    
    setFilteredProducts(result);
  }, [activeCategory, products, categories]);

  // Extract unique categories for filtering
  const uniqueCategories = categories
    .filter(cat => cat.type === 'product' && cat.parent_id !== null)
    .map(cat => cat.slug);
  
  // Add 'all' category
  const filterCategories = ['all', ...uniqueCategories];

  // Function to get category display name
  const getCategoryDisplayName = (slug: string) => {
    if (slug === 'all') return 'Todos';
    
    const category = categories.find(c => c.slug === slug);
    return category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className={`py-16 md:py-24 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
        <div className="container-custom">
          <div className="mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight font-medium text-center">
              Nossos Produtos
            </h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-normal">
              Explore nossa coleção de produtos feitos com qualidade e atenção aos detalhes.
            </p>
          </div>
          
          {/* Category Tabs - Apple Style */}
          <Tabs defaultValue="all" className="mb-16 justify-center flex flex-col items-center">
            <TabsList className="bg-white rounded-full shadow-sm overflow-x-auto py-1 px-1 w-auto flex flex-nowrap">
              {filterCategories.map((category) => (
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
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {filteredProducts.map((product) => (
                    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-4">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-6 overflow-hidden">
                            <img 
                              src={product.imageUrl || "https://via.placeholder.com/500x500?text=Sem+Imagem"} 
                              alt={product.name}
                              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(product.name)}`;
                              }}
                            />
                            {product.isNew && (
                              <div className="absolute top-3 right-3">
                                <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full font-medium">
                                  Novo
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-sans tracking-tight font-medium text-center mb-2">{product.name}</h3>
                          
                          {product.description && (
                            <p className="text-center text-gray-500 mb-6 max-w-md">
                              {product.description.length > 100 
                                ? `${product.description.substring(0, 100)}...` 
                                : product.description}
                            </p>
                          )}
                          
                          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                            <Link to={`/produto/${product.id}`}>
                              <Button 
                                variant="default" 
                                size="lg" 
                                className="rounded-full px-8"
                              >
                                Saiba Mais
                              </Button>
                            </Link>
                            
                            <a href={`https://wa.me/${whatsappNumber}?text=Olá! Vi o produto ${product.name} e gostaria de fazer um orçamento!`} target="_blank" rel="noopener noreferrer">
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
              <p className="text-lg text-gray-600">Nenhum produto encontrado.</p>
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

export default AllProductsPage;
