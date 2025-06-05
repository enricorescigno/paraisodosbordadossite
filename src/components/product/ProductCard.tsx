
import React from 'react';
import { motion } from 'framer-motion';
import ProductImage from './ProductCard/ProductImage';
import ProductInfo from './ProductCard/ProductInfo';
import ProductActions from './ProductCard/ProductActions';

interface ProductCardProps {
  id: number | string;
  name: string;
  description?: string;
  imageUrl?: string;
  images?: any;
  colors?: string[];
  isNew?: boolean;
  whatsappNumber: string;
  isPortfolio?: boolean;
  showActionButton?: boolean;
}

const ProductCard = ({
  id,
  name,
  description,
  imageUrl,
  images,
  colors,
  isNew,
  whatsappNumber,
  isPortfolio = false,
  showActionButton = true
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
      whileHover={{
        y: -5,
        transition: {
          duration: 0.2
        }
      }}
      className="flex flex-col h-full w-full"
    >
      <ProductImage 
        id={id}
        name={name}
        imageUrl={imageUrl}
        images={images}
      />
      
      <ProductInfo 
        name={name}
        description={description}
        isNew={isNew}
      />
      
      <ProductActions 
        id={id}
        isPortfolio={isPortfolio}
        showActionButton={showActionButton}
      />
    </motion.div>
  );
};

export default ProductCard;
