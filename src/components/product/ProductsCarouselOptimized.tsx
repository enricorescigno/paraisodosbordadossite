
import React, { useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { VirtualScrolling } from '@/components/ui/VirtualScrolling';
import { usePerformanceOptimized } from '@/hooks/usePerformanceOptimized';

interface ProductsCarouselOptimizedProps {
  products: Product[];
  whatsappNumber: string;
  isPortfolio?: boolean;
  useVirtualScrolling?: boolean;
  itemHeight?: number;
}

const ProductsCarouselOptimized = ({
  products,
  whatsappNumber,
  isPortfolio = false,
  useVirtualScrolling = false,
  itemHeight = 400
}: ProductsCarouselOptimizedProps) => {
  const isMobile = useIsMobile();
  const { memoizeArray } = usePerformanceOptimized();
  
  // Memoize products array to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => 
    memoizeArray(Array.isArray(products) ? products : [], (product) => product.id.toString()),
    [products, memoizeArray]
  );

  // Memoized render function for virtual scrolling
  const renderProductItem = useCallback((product: Product, index: number) => (
    <div className="p-1 md:p-2 h-full flex flex-col">
      <div className="flex-grow">
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
      </div>
      
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
  ), [whatsappNumber, isPortfolio]);

  // Memoized animation variants
  const animationVariants = useMemo(() => ({
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 }
    }
  }), []);

  if (useVirtualScrolling && memoizedProducts.length > 20) {
    return (
      <motion.div 
        className="relative"
        {...animationVariants}
      >
        <VirtualScrolling
          items={memoizedProducts}
          itemHeight={itemHeight}
          containerHeight={600}
          renderItem={renderProductItem}
          overscan={3}
          className="w-full"
        />
        {isMobile && <div className="h-16"></div>}
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="relative"
      {...animationVariants}
    >
      <Carousel className="w-full">
        <CarouselContent className="-ml-4 md:-ml-6">
          {memoizedProducts.map((product) => (
            <CarouselItem 
              key={product.id} 
              className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3 h-full"
            >
              {renderProductItem(product, 0)}
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
      
      {isMobile && <div className="h-16"></div>}
    </motion.div>
  );
};

export default ProductsCarouselOptimized;
