
import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => {
  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-3 text-gray-800">Quantidade:</h3>
      <div className="flex w-full max-w-[180px]">
        <button 
          onClick={onDecrement}
          className="border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-l-lg transition-colors"
        >
          -
        </button>
        <div className="border-t border-b border-gray-300 px-6 py-2 flex items-center justify-center min-w-[60px] bg-gray-50">
          {quantity}
        </div>
        <button 
          onClick={onIncrement}
          className="border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-r-lg transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
