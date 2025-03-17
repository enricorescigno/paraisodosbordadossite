
import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';

interface ProductHeaderProps {
  product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="product-header"
    >
      {product.isNew && (
        <span 
          className="inline-block bg-[#C32E2E]/10 text-[#C32E2E] px-3 py-1 rounded-full text-xs font-medium mb-3"
          aria-label="Produto novo"
        >
          Novo
        </span>
      )}
      
      <h1 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
        {product.name}
      </h1>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500">{product.category}</span>
        <div className="flex items-center gap-1" aria-label={`Avaliação ${(product.rating || 4.8).toFixed(1)} de 5 estrelas`}>
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          <span className="text-sm text-gray-500">{(product.rating || 4.8).toFixed(1)}</span>
        </div>
      </div>
      
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        {product.description || "Eleve sua experiência à mesa com este jogo americano de alta qualidade. Com design elegante e materiais premium, é perfeito para todas as ocasiões, do dia a dia às celebrações especiais."}
      </p>
    </motion.div>
  );
};

export default ProductHeader;
