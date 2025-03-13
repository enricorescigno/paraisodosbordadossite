
import { 
  Medal, 
  Truck, 
  CreditCard, 
  HeadphonesIcon 
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: Medal,
    title: "Qualidade Garantida",
    description: "Todos os nossos produtos são cuidadosamente confeccionados com materiais de primeira linha."
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Enviamos seu pedido com rapidez e segurança para todo o Brasil."
  },
  {
    icon: CreditCard,
    title: "Pagamento Seguro",
    description: "Diversas opções de pagamento com total segurança para suas compras."
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte Especializado",
    description: "Nossa equipe está sempre pronta para auxiliar em qualquer dúvida ou necessidade."
  }
];

const Features = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all duration-500 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              } apple-card`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-red/10 text-brand-red mb-4 transition-all duration-300 hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 hover:text-brand-red">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
