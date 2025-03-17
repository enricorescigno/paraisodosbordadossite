
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800 text-lg">Quantidade</h3>
      <div className="flex max-w-[180px]">
        <motion.button
          onClick={onDecrement}
          whileTap={{ scale: 0.95 }}
          className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-l-lg hover:bg-gray-50 transition-colors"
          disabled={quantity <= 1}
          aria-label="Diminuir quantidade"
        >
          <Minus className="h-4 w-4 text-gray-700" />
        </motion.button>
        
        <div className="h-12 flex-1 flex items-center justify-center border-t border-b border-gray-300 bg-gray-50 font-medium text-gray-800">
          {quantity}
        </div>
        
        <motion.button
          onClick={onIncrement}
          whileTap={{ scale: 0.95 }}
          className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-r-lg hover:bg-gray-50 transition-colors"
          aria-label="Aumentar quantidade"
        >
          <Plus className="h-4 w-4 text-gray-700" />
        </motion.button>
      </div>
    </div>
  );
};

export default QuantitySelector;
