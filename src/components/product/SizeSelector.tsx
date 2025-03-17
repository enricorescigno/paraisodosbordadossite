
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
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800 text-lg">Tamanho</h3>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <motion.button
            key={size}
            onClick={() => onSizeChange(size)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`min-w-[60px] px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedSize === size 
                ? 'border-2 border-brand-red bg-brand-red/5 text-brand-red font-medium' 
                : 'border border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
            aria-label={`Selecionar tamanho ${size}`}
          >
            {size}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
