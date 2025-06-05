
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getImagePlaceholder, cleanImageUrl } from '@/utils/imageUtils';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface ProductImageProps {
  id: number | string;
  name: string;
  imageUrl?: string;
  images?: any;
}

const ProductImage = ({ id, name, imageUrl, images }: ProductImageProps) => {
  const [useContainFallback, setUseContainFallback] = useState(false);

  const getImageUrl = () => {
    // Special cases for specific product IDs - simplified
    const productMappings: Record<string, string> = {
      '2010': "/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png",
      '1004': "/lovable-uploads/c8d43835-b876-42ab-9780-bf1c0225effa.png",
      '1005': "/lovable-uploads/7a304209-bf62-4d8f-8c86-e3adf38e105f.png",
      '2002': "/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png",
      '901': "/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png",
      '2004': "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
      '903': "/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png",
      '205': "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png",
      '902': "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png",
      '202': "/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png",
      '203': "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png",
      '204': "/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png",
      '206': "/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png",
      '207': "/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png",
      '208': "/lovable-uploads/6406277c-f290-4a94-abb0-24f098dd74c6.png"
    };
    
    const productId = String(id);
    if (productMappings[productId]) {
      return cleanImageUrl(productMappings[productId]);
    }
    
    // Handle images by type
    if (imageUrl) {
      return cleanImageUrl(imageUrl);
    }
    
    if (Array.isArray(images) && images.length > 0) {
      return cleanImageUrl(images[0]);
    }
    
    // Special handling for product 204 color variants
    if (productId === '204' && images && typeof images === 'object' && !Array.isArray(images)) {
      const colorImages = images["Branco"];
      if (colorImages && colorImages[0]) {
        return cleanImageUrl(colorImages[0]);
      }
    }
    
    // Fallback to placeholder
    return getImagePlaceholder(name);
  };

  const finalImageUrl = getImageUrl();

  return (
    <div className="w-full aspect-square bg-white rounded-2xl p-6 mb-4 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300">
      <motion.div
        className="relative w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <OptimizedImage
          src={finalImageUrl}
          alt={`Produto: ${name}`}
          className={`w-full h-full ${useContainFallback ? 'object-contain' : 'object-cover'} object-center mix-blend-multiply`}
          placeholder={getImagePlaceholder(name)}
          onError={() => setUseContainFallback(true)}
        />
      </motion.div>
    </div>
  );
};

export default ProductImage;
