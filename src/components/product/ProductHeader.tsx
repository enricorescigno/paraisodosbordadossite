
import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductHeaderProps {
  product: Product | {
    id: number;
    name: string;
    type: 'product' | 'portfolio';
    category: string;
    description?: string;
    price?: string;
    colors?: string[];
    sizes?: string[];
    rating?: number;
    isNew?: boolean;
    features?: string[];
    keywords?: string[];
    slug?: string;
  };
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <>
      {product.isNew && (
        <span className="inline-block bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-xs font-medium mb-3">
          Novo
        </span>
      )}
      
      <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">{product.category}</span>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-500">{(product.rating || 4.8).toFixed(1)}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed text-base">
        {product.description || "Produto de alta qualidade da Paraíso dos Bordados."}
      </p>
    </>
  );
};

export default ProductHeader;
