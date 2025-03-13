
import { Medal, Truck, CreditCard, HeadphonesIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const features = [{
  icon: Medal,
  title: "Qualidade Garantida",
  description: "Todos os nossos produtos são cuidadosamente confeccionados com materiais de primeira linha."
}, {
  icon: Truck,
  title: "Entrega Rápida",
  description: "Enviamos seu pedido com rapidez e segurança para todo o Brasil."
}, {
  icon: CreditCard,
  title: "Pagamento Seguro",
  description: "Diversas opções de pagamento com total segurança para suas compras."
}, {
  icon: HeadphonesIcon,
  title: "Suporte Especializado",
  description: "Nossa equipe está sempre pronta para auxiliar em qualquer dúvida ou necessidade."
}];

const Features = () => {
  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-brand-dark">Por que escolher a Paraíso dos Bordados?</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Oferecemos uma experiência de compra completa com produtos de qualidade e atendimento personalizado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-50 text-brand-red mb-5">
                  <Icon size={30} />
                </div>
                <h3 className="text-xl font-semibold text-brand-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
