
import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductHeaderProps {
  product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  // Helper para extrair valor numérico do rating
  const getRatingValue = (rating: number | { value: number } | undefined): number => {
    if (typeof rating === 'number') return rating;
    if (rating && typeof rating === 'object' && 'value' in rating) return rating.value;
    return 4.8; // fallback
  };

  const ratingValue = getRatingValue(product.rating);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="product-header"
    >
      {product.isNew && (
        <span 
          className="inline-block bg-red-600/10 text-red-600 px-3 py-1 rounded-full text-xs font-medium mb-3"
          aria-label="Produto novo"
        >
          Novo
        </span>
      )}
      
      <h1 className={cn(
        "text-3xl md:text-4xl font-semibold mb-3 tracking-tight text-[#1D1D1F]",
        "leading-tight"
      )}>
        {product.name}
      </h1>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-[#6E6E73]">{product.category}</span>
        <div 
          className="flex items-center gap-1" 
          aria-label={`Avaliação ${ratingValue.toFixed(1)} de 5 estrelas`}
        >
          <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" aria-hidden="true" />
          <span className="text-sm text-[#6E6E73]">{ratingValue.toFixed(1)}</span>
        </div>
      </div>
      
      <p className="text-lg text-[#1D1D1F]/90 mb-8 leading-relaxed max-w-[95%]">
        {product.description || "Eleve sua experiência à mesa com este jogo americano de alta qualidade. Com design elegante e materiais premium, é perfeito para todas as ocasiões, do dia a dia às celebrações especiais."}
      </p>
    </motion.div>
  );
};

export default ProductHeader;
