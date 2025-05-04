
import React from 'react';
import { motion } from 'framer-motion';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import { Product, ProductColor, ProductSize } from '@/types/product';

interface ProductVariantSelectorProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const ProductVariantSelector = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  incrementQuantity,
  decrementQuantity
}: ProductVariantSelectorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, staggerChildren: 0.1 }}
      className="space-y-6"
    >
      {product.colors && product.colors.length > 0 && (
        <ColorSelector 
          colors={product.colors} 
          selectedColor={selectedColor} 
          onColorChange={setSelectedColor} 
        />
      )}
      
      {product.sizes && product.sizes.length > 0 && (
        <SizeSelector 
          sizes={product.sizes} 
          selectedSize={selectedSize} 
          onSizeChange={setSelectedSize} 
        />
      )}
      
      <QuantitySelector 
        quantity={quantity} 
        onIncrement={incrementQuantity} 
        onDecrement={decrementQuantity} 
      />
    </motion.div>
  );
};

export default ProductVariantSelector;
