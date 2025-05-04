
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProductSize } from '@/types/product';

interface SizeSelectorProps {
  sizes: ProductSize[] | string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) => {
  if (!sizes || sizes.length === 0) return null;
  
  // Convert sizes to a consistent format for rendering
  const normalizedSizes = sizes.map(size => {
    if (typeof size === 'string') {
      return { name: size, value: size, available: true };
    }
    return size;
  });
  
  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4 text-gray-800 text-lg">Tamanho:</h3>
      <div 
        className="flex flex-wrap gap-3"
        role="radiogroup"
        aria-label="Selecione um tamanho"
      >
        {normalizedSizes.map((size) => (
          <motion.button
            key={size.name}
            onClick={() => onSizeChange(size.name)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-5 py-3 border rounded-lg transition-all duration-200 min-w-[60px]",
              selectedSize === size.name 
                ? "border-[#0071E3] bg-[#0071E3]/5 text-[#0071E3] font-medium" 
                : "border-gray-300 text-gray-600 hover:border-gray-400",
              !size.available && "opacity-50 cursor-not-allowed"
            )}
            aria-label={`Selecionar tamanho ${size.name}`}
            aria-pressed={selectedSize === size.name}
            role="radio"
            aria-checked={selectedSize === size.name}
            disabled={!size.available}
            data-testid={`size-button-${size.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {/* Format multiline labels if needed */}
            {size.name.includes(' ') 
              ? size.name.split(' ').map((word, index, array) => (
                  <React.Fragment key={index}>
                    {word}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))
              : size.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
