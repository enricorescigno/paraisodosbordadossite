
import React from 'react';
import { Shield, Truck, Clock } from 'lucide-react';

const ProductBenefits = () => {
  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-10 w-10 rounded-full bg-brand-red/10 flex items-center justify-center mb-2">
            <Shield className="h-5 w-5 text-brand-red" />
          </div>
          <h3 className="font-medium text-sm mb-1">Qualidade Garantida</h3>
          <p className="text-xs text-gray-500">Produtos de alta qualidade e durabilidade</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="h-10 w-10 rounded-full bg-brand-red/10 flex items-center justify-center mb-2">
            <Truck className="h-5 w-5 text-brand-red" />
          </div>
          <h3 className="font-medium text-sm mb-1">Entrega para todo Brasil</h3>
          <p className="text-xs text-gray-500">Enviamos seu pedido com rapidez e segurança</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="h-10 w-10 rounded-full bg-brand-red/10 flex items-center justify-center mb-2">
            <Clock className="h-5 w-5 text-brand-red" />
          </div>
          <h3 className="font-medium text-sm mb-1">Personalização</h3>
          <p className="text-xs text-gray-500">Atendemos às suas necessidades específicas</p>
        </div>
      </div>
    </div>
  );
};

export default ProductBenefits;
