
import React from 'react';
import { Link } from 'react-router-dom';
import { AppleButton } from '@/components/ui/apple-button';
import { ShoppingBag, Home } from 'lucide-react';

const ProductNotFound = () => {
  return (
    <div className="text-center py-20 px-4">
      <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
      <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/produtos">
          <AppleButton className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Ver todos os produtos
          </AppleButton>
        </Link>
        
        <Link to="/">
          <AppleButton variant="outline" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Voltar para a loja
          </AppleButton>
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;
