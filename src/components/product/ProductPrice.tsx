
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductPriceProps {
  product: Product;
}

const ProductPrice = ({ product }: ProductPriceProps) => {
  // Handle price display logic
  const hasDiscount = product.comparePrice || product.originalPrice;
  const displayPrice = product.price || "Sob consulta";
  const displayComparePrice = product.comparePrice || product.originalPrice;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mb-6"
    >
      <div className="flex items-baseline flex-wrap gap-2">
        {hasDiscount && (
          <>
            <span className="text-lg font-medium text-[#1D1D1F]">{displayPrice}</span>
            <span className="text-sm line-through text-gray-500">{displayComparePrice}</span>
            {product.discount && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                {product.discount}
              </span>
            )}
          </>
        )}
        
        {!hasDiscount && displayPrice !== "Sob consulta" && (
          <span className="text-lg font-medium text-[#1D1D1F]">{displayPrice}</span>
        )}
        
        {displayPrice === "Sob consulta" && (
          <span className="text-lg font-medium text-[#1D1D1F]">Sob consulta</span>
        )}
      </div>
      
      {product.minPurchaseQuantity && product.minPurchaseQuantity > 1 && (
        <p className="text-xs text-gray-600 mt-1">
          Quantidade mínima: {product.minPurchaseQuantity} unidades
        </p>
      )}
    </motion.div>
  );
};

export default ProductPrice;
