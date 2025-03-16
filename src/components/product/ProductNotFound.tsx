
import React from 'react';
import { Link } from 'react-router-dom';
import { AppleButton } from '@/components/ui/apple-button';

const ProductNotFound = () => {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
      <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
      <Link to="/">
        <AppleButton>
          Voltar para a loja
        </AppleButton>
      </Link>
    </div>
  );
};

export default ProductNotFound;
