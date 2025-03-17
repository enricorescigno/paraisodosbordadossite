
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => {
  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4 text-[#1D1D1F] text-lg">Quantidade:</h3>
      <div className="flex w-full max-w-[180px]">
        <motion.button 
          onClick={onDecrement}
          whileTap={{ scale: 0.95 }}
          className={`border px-4 py-2 rounded-l-lg transition-colors flex items-center justify-center ${
            quantity <= 1 
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
              : 'border-gray-300 hover:border-[#0071E3] active:border-[#0071E3]'
          }`}
          aria-label="Diminuir quantidade"
          disabled={quantity <= 1}
        >
          <Minus className={`w-4 h-4 ${quantity <= 1 ? 'text-gray-400' : 'text-gray-700'}`} />
        </motion.button>
        <div 
          className="border-t border-b border-gray-300 px-6 py-2 flex items-center justify-center min-w-[60px] bg-white font-medium"
          aria-live="polite"
          aria-label={`Quantidade: ${quantity}`}
        >
          {quantity}
        </div>
        <motion.button 
          onClick={onIncrement}
          whileTap={{ scale: 0.95 }}
          className="border border-gray-300 hover:border-[#0071E3] active:border-[#0071E3] px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center"
          aria-label="Aumentar quantidade"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default QuantitySelector;
