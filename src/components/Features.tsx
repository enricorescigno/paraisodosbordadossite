
import { Medal, Headphones, Scale, ClipboardCheck } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [{
  icon: Medal,
  title: "Qualidade Garantida",
  description: "Todos os nossos produtos são cuidadosamente confeccionados com materiais de primeira linha."
}, {
  icon: Headphones,
  title: "Atendimento Especializado",
  description: "Nossa equipe de especialistas está pronta para tirar suas dúvidas e oferecer um atendimento personalizado."
}, {
  icon: Scale,
  title: "Preço Justo",
  description: "Garantimos preços competitivos sem abrir mão da qualidade dos nossos bordados e serviços."
}, {
  icon: ClipboardCheck,
  title: "Clique aqui e faça seu orçamento",
  description: "Solicite seu orçamento personalizado agora mesmo e descubra como podemos bordar seus sonhos!",
  isClickable: true,
  link: "https://api.whatsapp.com/send?phone=5581995970776&text=Olá!%20Vi%20o%20site%20de%20vocês%20e%20gostaria%20de%20um%20orçamento!%0A%0A%5Bnão%20apague%20essa%20mensagem,%20por%20gentileza%5D"
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
    <section ref={ref} className="py-16 bg-white px-[10px]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{
            opacity: 0,
            y: 20
          }} 
          animate={inView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 20
          }} 
          transition={{
            duration: 0.5
          }} 
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-medium tracking-tight text-red-600 font-sans">Por que escolher a Paraíso dos Bordados?</h2>
          <p className="text-gray-600 font-light mt-4 max-w-2xl mx-auto">
            Oferecemos uma experiência de compra completa com produtos de qualidade e atendimento personalizado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            const FeatureContent = () => (
              <>
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-50 text-brand-red mb-5">
                  <Icon size={30} />
                </div>
                <h3 className="text-brand-dark mb-3 text-xl font-medium tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 text-center text-sm font-light">{feature.description}</p>
              </>
            );
            
            const cardClass = "flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 px-[5px] py-[5px]";
            
            return (
              <motion.div 
                key={index} 
                initial={{
                  opacity: 0,
                  y: 30
                }} 
                animate={inView ? {
                  opacity: 1,
                  y: 0
                } : {
                  opacity: 0,
                  y: 30
                }} 
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }} 
                className={feature.isClickable ? "cursor-pointer" : ""}
              >
                {feature.isClickable ? (
                  <a 
                    href={feature.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${cardClass} hover:bg-red-50/50`} 
                    aria-label={`Link para ${feature.title}`}
                  >
                    <FeatureContent />
                  </a>
                ) : (
                  <div className={cardClass}>
                    <FeatureContent />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
