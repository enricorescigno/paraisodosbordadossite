
import React from 'react';
import { Truck, RefreshCw, ShieldCheck, ChevronRight } from 'lucide-react';

const ProductBenefits = () => {
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-8">
      <div className="flex flex-col items-center text-center">
        <Truck className="h-8 w-8 text-brand-red mb-2" />
        <h4 className="font-medium text-sm mb-1">Entrega rápida ou retirada</h4>
        <p className="text-xs text-gray-500">Escolha a opção mais conveniente</p>
        <a href="#" className="text-xs text-brand-red mt-2 flex items-center hover:underline">
          Saiba mais <ChevronRight className="h-3 w-3" />
        </a>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <RefreshCw className="h-8 w-8 text-brand-red mb-2" />
        <h4 className="font-medium text-sm mb-1">Devolução fácil e gratuita</h4>
        <p className="text-xs text-gray-500">Até 7 dias após o recebimento</p>
        <a href="#" className="text-xs text-brand-red mt-2 flex items-center hover:underline">
          Saiba mais <ChevronRight className="h-3 w-3" />
        </a>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <ShieldCheck className="h-8 w-8 text-brand-red mb-2" />
        <h4 className="font-medium text-sm mb-1">Compre com segurança</h4>
        <p className="text-xs text-gray-500">Pagamentos criptografados</p>
        <a href="#" className="text-xs text-brand-red mt-2 flex items-center hover:underline">
          Saiba mais <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default ProductBenefits;
