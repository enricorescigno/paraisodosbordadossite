
import { Rocket, Shield, Truck } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductDescriptionProps {
  product: Product;
}

const ProductDescription = ({ product }: ProductDescriptionProps) => {
  return (
    <div className="mt-8 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Descrição</h2>
        <p className="text-gray-700 leading-relaxed">
          {product.description || "Eleve sua experiência à mesa com o jogo americano Requinte Ondulado. Com uma composição inteligente de 75% polipropileno e 25% poliéster, este jogo americano é sinônimo de resistência e praticidade. Sua durabilidade o torna perfeito para o uso diário, e a limpeza é simples, graças à sua fácil lavagem. Além disso, seca rapidamente, estando pronto para ser usado sempre que você precisar. Com um diâmetro de 38cm, o formato redondo complementa sua mesa de maneira elegante. Adicione estilo e conveniência à sua refeição com este elegante jogo americano."}
        </p>
      </div>
      
      {product.features && product.features.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Características</h2>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-red mt-2"></span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="pt-8 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-brand-red/10 flex items-center justify-center mb-3">
              <Truck className="h-6 w-6 text-brand-red" />
            </div>
            <h3 className="font-medium mb-1">Entrega Rápida</h3>
            <p className="text-sm text-gray-500">Enviamos para todo o Brasil</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-brand-red/10 flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-brand-red" />
            </div>
            <h3 className="font-medium mb-1">Qualidade Garantida</h3>
            <p className="text-sm text-gray-500">Materiais de primeira linha</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-brand-red/10 flex items-center justify-center mb-3">
              <Rocket className="h-6 w-6 text-brand-red" />
            </div>
            <h3 className="font-medium mb-1">Personalização</h3>
            <p className="text-sm text-gray-500">Atendemos projetos sob medida</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
