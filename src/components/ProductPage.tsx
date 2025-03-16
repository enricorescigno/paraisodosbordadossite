
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import { useProductsByCategory } from '@/hooks/useProducts';
import { useCategoryBySlug } from '@/hooks/useCategories';

const ProductPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  // Get category by slug
  const { data: category, isLoading: loadingCategory } = useCategoryBySlug(categorySlug || '');
  
  // Get products by category
  const { data: products, isLoading: loadingProducts } = 
    useProductsByCategory(categorySlug || '');
  
  const isLoading = loadingCategory || loadingProducts;

  // Extract the category name for title
  const categoryTitle = category?.name || '';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-16 md:py-24 bg-[#f5f5f7]">
        <div className="container-custom">
          <div className="mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight font-medium text-center">
              {categoryTitle}
            </h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-normal">
              Explore nossa coleção de {categoryTitle.toLowerCase()} feitos com qualidade e atenção aos detalhes.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : products && products.length > 0 ? (
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {products.map((product) => (
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
