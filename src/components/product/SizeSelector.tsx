
import React from 'react';
import { motion } from 'framer-motion';

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
            className={`px-5 py-3 border rounded-lg transition-all duration-200 min-w-[60px] ${
              selectedSize === size 
                ? 'border-[#C32E2E] bg-[#C32E2E]/5 text-[#C32E2E] font-medium' 
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
            aria-label={`Selecionar tamanho ${size}`}
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
