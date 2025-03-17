
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) => {
  if (!sizes || sizes.length === 0) return null;
  
  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4 text-gray-800 text-lg">Tamanho:</h3>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <motion.button
            key={size}
            onClick={() => onSizeChange(size)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-5 py-3 border rounded-lg transition-all duration-200 min-w-[60px]",
              selectedSize === size 
                ? "border-[#0071E3] bg-[#0071E3]/5 text-[#0071E3] font-medium" 
                : "border-gray-300 text-gray-600 hover:border-gray-400"
            )}
            aria-label={`Selecionar tamanho ${size}`}
            aria-pressed={selectedSize === size}
            data-testid={`size-button-${size.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {/* Format multiline labels if needed */}
            {size.includes(' ') 
              ? size.split(' ').map((word, index, array) => (
                  <React.Fragment key={index}>
                    {word}
                    {index < array.length - 1 && <br />}
                  </React.Fragment>
                ))
              : size}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
