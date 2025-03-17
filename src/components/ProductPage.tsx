
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { Button } from "@/components/ui/button";
import { allProducts } from '../utils/productUtils';
import { mesaCozinhaProducts } from '../utils/categoryProducts';
import { Product } from '../types/product';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import { useScrollToTop } from '../hooks/useScrollToTop';

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'cama-mesa-banho': 'Cama, Mesa e Banho',
  'cama': 'Cama',
  'mesa-cozinha': 'Mesa e Cozinha',
  'tapete-cortinas': 'Tapete e Cortinas',
  'banho': 'Banho',
  'infantil': 'Infantil',
  'vestuario': 'Vestuário',
  'camisa': 'Camisa',
  'jaleco': 'Jaleco',
  'pantufa': 'Pantufa',
  'bordado-bone': 'Bordado em Boné',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Bordado em Jaleco',
  'bordado-infantis': 'Bordado Infantil',
  'bordado-toalha-banho': 'Bordado em Toalha de Banho'
};

// Mapping from URL paths to product categories
const CATEGORY_MAPPINGS: Record<string, string> = {
  'cama-mesa-banho': 'Cama, Mesa e Banho',
  'cama': 'Cama',
  'mesa-cozinha': 'Mesa e Cozinha',
  'tapete-cortinas': 'Tapete e Cortinas',
  'banho': 'Banho',
  'infantil': 'Infantil',
  'vestuario': 'Vestuário',
  'camisa': 'Camisa',
  'jaleco': 'Jaleco',
  'pantufa': 'Pantufa',
};

const ProductPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  useScrollToTop();
  
  useEffect(() => {
    // Extract the category from the URL path
    const pathParts = location.pathname.split('/');
    const categoryPath = pathParts[pathParts.length - 1];
    
    // In a real application, this would be an API call
    setLoading(true);
    setTimeout(() => {
      console.log("Current category path:", categoryPath);
      
      let categoryProducts: Product[] = [];
      
      // Special handling for mesa-cozinha category to ensure all products are included
      if (categoryPath === 'mesa-cozinha') {
        console.log("Processing mesa-cozinha category");
        
        // Use mesaCozinhaProducts directly since they're already correctly configured
        categoryProducts = [...mesaCozinhaProducts];
        
        console.log("Mesa-cozinha category - Products count:", categoryProducts.length);
        console.log("Products IDs:", categoryProducts.map(p => p.id).join(', '));
      } else {
        // Get the corresponding category name from the URL path
        const categoryName = CATEGORY_MAPPINGS[categoryPath] || categoryTitles[categoryPath] || '';
        
        // For other categories, filter normally
        categoryProducts = allProducts.filter(product => 
          product.type === 'product' && 
          (product.category === categoryName || 
           product.category.toLowerCase().includes(categoryName.toLowerCase()) ||
           categoryName.toLowerCase().includes(product.category.toLowerCase()))
        );
        
        // If still no products found, try partial matching
        if (categoryProducts.length === 0) {
          categoryProducts = allProducts.filter(product => 
            product.type === 'product' && (
              categoryPath.includes(product.category.toLowerCase().replace(/\s+/g, '-')) ||
              product.category.toLowerCase().includes(categoryPath.replace(/-/g, ' '))
            )
          );
        }
      }
      
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
      setLoading(false);
    }, 500);
  }, [location.pathname]);
  
  // Extract the category from the URL path for title
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-16 md:py-24 bg-[#f5f5f7]">
        <div className="container-custom px-4">
          <div className="mb-16 space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans tracking-tight font-medium text-center">
              {categoryTitle}
            </h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-normal px-4">
              Explore nossa coleção de {categoryTitle.toLowerCase()} feitos com qualidade e atenção aos detalhes.
            </p>
          </div>
          
          {/* Debug info - for development purpose */}
          {categoryPath === 'mesa-cozinha' && !loading && (
            <div className="mb-4 text-center text-sm text-gray-500">
              <p>Mostrando {filteredProducts.length} produtos na categoria Mesa-cozinha</p>
              <p className="text-xs">IDs: {filteredProducts.map(p => p.id).join(', ')}</p>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {filteredProducts.map((product) => (
                    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 w-full">
                      <div className="p-4 flex justify-center">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-center w-[90%] mx-auto"
                        >
                          <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-6 overflow-hidden relative">
                            <img 
                              src={
                                // Special handling for object-based images
                                product.images && typeof product.images === 'object' && !Array.isArray(product.images) 
                                  ? product.images[product.colors?.[0] || "Branco"]?.[0] || product.imageUrl // Use first image of first color
                                  : (
                                    product.imageUrl || 
                                    (Array.isArray(product.images) ? product.images[0] : null) || 
                                    `https://via.placeholder.com/500x500?text=${encodeURIComponent(product.category)}`
                                  )
                              }
                              alt={product.name}
                              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(product.category)}`;
                              }}
                            />
                            
                            {/* Display "Novo" badge for new products */}
                            {product.isNew && (
                              <div className="absolute top-3 right-3">
                                <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full font-medium">
                                  Novo
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-sans tracking-tight font-medium text-center mb-2">
                            {product.name}
                          </h3>
                          
                          {product.description && (
                            <p className="text-center text-gray-500 mb-6 max-w-md">
                              {product.description.length > 100 
                                ? `${product.description.substring(0, 100)}...` 
                                : product.description}
                            </p>
                          )}
                          
                          <div className="flex flex-col w-full gap-3 justify-center mt-4">
                            <Link to={`/produto/${product.id}`} className="w-full">
                              <Button 
                                variant="default" 
                                size="lg" 
                                className="rounded-full px-8 w-full"
                              >
                                Saiba Mais
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="absolute bottom-0 right-8 flex space-x-2 mt-8">
                  <CarouselPrevious className="relative inset-0 translate-y-0 h-11 w-11 md:h-10 md:w-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </CarouselPrevious>
                  <CarouselNext className="relative inset-0 translate-y-0 h-11 w-11 md:h-10 md:w-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </CarouselNext>
                </div>
              </Carousel>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">Nenhum produto encontrado nesta categoria.</p>
              <Link to="/produtos" className="inline-block mt-4 btn-primary">
                Ver todos os produtos
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

export default ProductPage;
