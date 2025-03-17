
import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) => {
  if (!sizes || sizes.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3 text-gray-800">Tamanho:</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
              selectedSize === size 
                ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
