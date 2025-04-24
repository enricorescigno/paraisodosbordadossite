
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProductsCarouselProps {
  products: Product[];
  whatsappNumber: string;
  isPortfolio?: boolean;
}

const ProductsCarousel = ({
  products,
  whatsappNumber,
  isPortfolio = false
}: ProductsCarouselProps) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Carousel className="w-full">
        <CarouselContent className="-ml-4 md:-ml-6">
          {products.map((product) => (
            <CarouselItem 
              key={product.id} 
              className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3 h-full"
            >
              <div className="p-1 md:p-2 h-full flex flex-col">
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  images={product.images}
                  colors={product.colors}
                  isNew={product.isNew}
                  whatsappNumber={whatsappNumber}
                  isPortfolio={isPortfolio}
                  showActionButton={false}
                />
                
                {/* Botão Saiba Mais abaixo de cada produto */}
                <Link 
                  to={`/produto/${product.id}`} 
                  className="mt-3 w-full"
                >
                  <Button 
                    variant="outline" 
                    className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-medium rounded-lg py-2"
                  >
                    {isPortfolio ? "Ver Detalhes" : "Saiba Mais"}
                  </Button>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className={`absolute ${isMobile ? 'bottom-0 right-4' : '-bottom-16 right-8'} flex space-x-2 mt-8`}>
          <CarouselPrevious className="h-10 w-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white touch-target">
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </CarouselPrevious>
          <CarouselNext className="h-10 w-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white touch-target">
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </CarouselNext>
        </div>
      </Carousel>
      
      {/* Add extra spacing at the bottom on mobile to prevent overlay with WhatsApp button */}
      {isMobile && <div className="h-16"></div>}
    </motion.div>
  );
};

export default ProductsCarousel;
