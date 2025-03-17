
import { useState } from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import ColorSelector from '../product/ColorSelector';
import SizeSelector from '../product/SizeSelector';
import QuantitySelector from '../product/QuantitySelector';

interface ProductInfoProps {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  incrementQuantity,
  decrementQuantity
}: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        {product.isNew && (
          <span className="inline-block bg-brand-red text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
            Novo
          </span>
        )}
        
        <h1 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight">{product.name}</h1>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-500">{(product.rating || 4.8).toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
          {product.description || "Eleve sua experiência à mesa com o jogo americano Requinte Ondulado. Com uma composição inteligente de 75% polipropileno e 25% poliéster, este jogo americano é sinônimo de resistência e praticidade. Sua durabilidade o torna perfeito para o uso diário, e a limpeza é simples, graças à sua fácil lavagem."}
        </p>
      </div>
      
      <ColorSelector 
        colors={product.colors || []} 
        selectedColor={selectedColor} 
        onColorChange={setSelectedColor} 
      />
      
      <SizeSelector 
        sizes={product.sizes || []} 
        selectedSize={selectedSize} 
        onSizeChange={setSelectedSize} 
      />
      
      <QuantitySelector 
        quantity={quantity} 
        onIncrement={incrementQuantity} 
        onDecrement={decrementQuantity} 
      />
    </div>
  );
};

export default ProductInfo;
