
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { products } from '../utils/searchUtils';
import { allProducts } from '../utils/productUtils';
import { mesaCozinhaProducts } from '../utils/categoryProducts';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from 'framer-motion';

const AllProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allProductsList, setAllProductsList] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    setTimeout(() => {
      // Filter only products (not portfolio items)
      let productItems = products.filter(product => product.type === 'product');
      
      // Make sure product 204 is included - using direct product from mesaCozinhaProducts
      const product204 = mesaCozinhaProducts.find(p => p.id === 204);
      
      if (product204 && !productItems.some(p => Number(p.id) === 204)) {
        productItems = [...productItems, product204];
      }
      
      setAllProductsList(productItems);
      setFilteredProducts(productItems);
      setLoading(false);
      
      console.log("Products loaded:", productItems.length, "Product 204 included:", productItems.some(p => Number(p.id) === 204));
    }, 300); // Simulate network request
  }, []);

  // Filter products based on category
  useEffect(() => {
    let result = [...allProductsList];
    
    // Apply category filter
    if (activeCategory !== 'all') {
      // Special handling for mesa to ensure product 204 is included
      if (activeCategory === 'mesa') {
        // Get product 204 directly from mesaCozinhaProducts to ensure we have all properties
        const product204 = mesaCozinhaProducts.find(p => p.id === 204);
        const otherProducts = result.filter(product => 
          product.category.toLowerCase().includes(activeCategory.toLowerCase())
        );
        
        result = product204 ? [...otherProducts, product204] : otherProducts;
        console.log("Mesa category - Product 204 included:", result.some(p => Number(p.id) === 204));
      } else {
        result = result.filter(product => 
          product.category.toLowerCase().includes(activeCategory.toLowerCase())
        );
      }
    } else {
      // Make sure product 204 is always included in "all" category
      const product204 = mesaCozinhaProducts.find(p => p.id === 204);
      if (product204 && !result.some(p => Number(p.id) === 204)) {
        result = [...result, product204];
      }
      console.log("All category - Product 204 included:", result.some(p => Number(p.id) === 204));
    }
    
    setFilteredProducts(result);
  }, [activeCategory, allProductsList]);

  // Extract unique categories for filtering
  const categories = ['all', ...new Set(allProductsList.map(product => product.category.split(',')[0].trim().toLowerCase()))];

  // Function to get category display name
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'all': 'Todos',
      'cama': 'Cama',
      'mesa': 'Mesa',
      'banho': 'Banho',
      'infantil': 'Infantil',
      'vestuário': 'Vestuário',
      'bordado': 'Bordado',
      'pantufas': 'Pantufas',
      'roupões': 'Roupões'
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
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
                              src={product.imageUrl || (product.images && Array.isArray(product.images) ? product.images[0] : null) || "https://via.placeholder.com/500x500?text=Sem+Imagem"} 
                              alt={product.name}
                              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "https://via.placeholder.com/500x500?text=Sem+Imagem";
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
