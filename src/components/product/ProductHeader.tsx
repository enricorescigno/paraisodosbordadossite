
import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductHeaderProps {
  product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  return (
    <>
      {product.isNew && (
        <span className="inline-block bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-xs font-medium mb-3">
          Novo
        </span>
      )}
      
      <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500">{product.category}</span>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-500">{(product.rating || 4.8).toFixed(1)}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed text-base">
        {product.description || "Eleve sua experiência à mesa com o jogo americano Requinte Ondulado. Com uma composição inteligente de 75% polipropileno e 25% poliéster, este jogo americano é sinônimo de resistência e praticidade. Sua durabilidade o torna perfeito para o uso diário, e a limpeza é simples, graças à sua fácil lavagem. Além disso, seca rapidamente, estando pronto para ser usado sempre que você precisar. Com um diâmetro de 38cm, o formato redondo complementa sua mesa de maneira elegante. Adicione estilo e conveniência à sua refeição com este elegante jogo americano."}
      </p>
    </>
  );
};

export default ProductHeader;
