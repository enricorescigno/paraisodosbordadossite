
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from './ProductCard';

interface ProductsCarouselProps {
  products: Product[];
  whatsappNumber: string;
  isPortfolio?: boolean;
}

const ProductsCarousel = ({ products, whatsappNumber, isPortfolio = false }: ProductsCarouselProps) => {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-4">
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
                />
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
  );
};

export default ProductsCarousel;
