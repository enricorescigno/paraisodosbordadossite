import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const partners = [
  {
    name: "Doutor Pet",
    logo: "/lovable-uploads/2621c87d-6ff0-42bb-9c13-0598532a29ba.png"
  },
  {
    name: "Locar House",
    logo: "/lovable-uploads/ab58fe55-29a7-473f-85f5-12b906a493de.png"
  },
  {
    name: "Tomaselli",
    logo: "/lovable-uploads/681f2ac7-f2d7-4f75-814e-9279195db99b.png"
  },
  {
    name: "Gerson Parisio",
    logo: "/lovable-uploads/d4081c14-99d1-497a-93ea-81600e2314fd.png"
  },
  {
    name: "NX Boats",
    logo: "/lovable-uploads/7c55472e-acf8-4000-8adc-9fe6b6c3a396.png"
  },
  {
    name: "Centraltur Viagens",
    logo: "/lovable-uploads/40314056-8e46-4b7f-9d75-f18c107911d8.png"
  },
  {
    name: "Clínicas Mimo",
    logo: "/lovable-uploads/f55e926e-0886-406b-bde4-551e93196365.png"
  },
  {
    name: "JV Contabilidade",
    logo: "/lovable-uploads/602557a9-37de-472f-ab79-5a67b62be92e.png"
  },
  {
    name: "Aeroclube de Pernambuco",
    logo: "/lovable-uploads/b70c7185-64f1-4f7e-99d4-ebc8cfd42aae.png"
  }
];

interface PartnersProps {
  showTitle?: boolean;
  fullPage?: boolean;
}

const Partners = ({ showTitle = true, fullPage = false }: PartnersProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fullPage) return; // Don't animate on full page view
    
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    
    const scrollWidth = scrollElement.scrollWidth;
    const clientWidth = scrollElement.clientWidth;
    
    if (scrollWidth <= clientWidth) return;
    
    let direction = 1;
    let position = 0;
    const speed = 0.5;
    
    const scroll = () => {
      if (!scrollElement) return;
      position += speed * direction;
      
      if (position >= scrollWidth - clientWidth) {
        direction = -1;
      } else if (position <= 0) {
        direction = 1;
      }
      
      scrollElement.scrollLeft = position;
      requestAnimationFrame(scroll);
    };
    
    const animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [fullPage]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className={`bg-brand-light py-8 ${fullPage ? 'rounded-xl' : ''}`}>
      <div className="container-custom">
        {showTitle && (
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-brand-dark">Nossos Parceiros</h2>
          </div>
        )}
        
        {fullPage ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {partners.map((partner, index) => (
              <motion.div 
                key={index} 
                variants={item}
                className="glass rounded-lg p-8 flex flex-col items-center justify-center h-64 transition-transform hover:scale-105"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-32 max-w-full mb-4" 
                />
                <h3 className="text-xl font-medium text-brand-dark">{partner.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="flex space-x-8 py-4 overflow-x-auto scrollbar-hide" ref={scrollRef}>
              {partners.map((partner, index) => (
                <div key={index} className="flex-shrink-0 glass rounded-lg px-8 py-6 flex items-center justify-center min-w-[220px] h-28">
                  <img src={partner.logo} alt={partner.name} className="max-h-16 max-w-full" />
                </div>
              ))}
              
              {partners.map((partner, index) => (
                <div key={`duplicate-${index}`} className="flex-shrink-0 glass rounded-lg px-8 py-6 flex items-center justify-center min-w-[220px] h-28">
                  <img src={partner.logo} alt={partner.name} className="max-h-16 max-w-full" />
                </div>
              ))}
            </div>
            
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-brand-light to-transparent"></div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-brand-light to-transparent"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
