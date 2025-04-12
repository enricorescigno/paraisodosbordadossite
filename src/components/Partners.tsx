
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getImageLoading } from '../utils/imageUtils';

// Updated partner list with new images
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
  },
  {
    name: "Parceiro 10",
    logo: "/lovable-uploads/0a4859ea-7a2a-45c7-ac73-e7f7a709aab4.png"
  },
  {
    name: "Parceiro 11",
    logo: "/lovable-uploads/01c74faa-daf1-4918-a69a-9de345d8901d.png"
  },
  {
    name: "Parceiro 12",
    logo: "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png"
  },
  {
    name: "Parceiro 13",
    logo: "/lovable-uploads/008350e4-cc5b-4f6d-b585-c95707eef535.png"
  }
];

interface PartnersProps {
  showTitle?: boolean;
  fullPage?: boolean;
  maxDisplay?: number;
}

const Partners = ({ showTitle = true, fullPage = false, maxDisplay = fullPage ? partners.length : 8 }: PartnersProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [displayPartners, setDisplayPartners] = useState(partners.slice(0, maxDisplay));

  // Lazy load partners for better performance
  useEffect(() => {
    setDisplayPartners(partners.slice(0, maxDisplay));
  }, [maxDisplay]);

  useEffect(() => {
    if (fullPage) return; // Don't animate on full page view
    
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only start animation when in view
        if (entry.isIntersecting) {
          setIsInView(true);
          
          // Now start auto-scroll if needed
          if (scrollElement.scrollWidth > scrollElement.clientWidth) {
            startAutoScroll(scrollElement);
          }
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(scrollElement);
    
    return () => {
      observer.disconnect();
    };
  }, [fullPage]);
  
  const startAutoScroll = (element: HTMLDivElement) => {
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;
    
    let direction = 1;
    let position = 0;
    const speed = 0.3; // Reduced speed for better UX
    
    const scroll = () => {
      if (!element || !isInView) return;
      
      position += speed * direction;
      
      if (position >= scrollWidth - clientWidth) {
        direction = -1;
      } else if (position <= 0) {
        direction = 1;
      }
      
      element.scrollLeft = position;
      requestAnimationFrame(scroll);
    };
    
    const animationId = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  return (
    <section className={`bg-brand-light py-8 ${fullPage ? 'rounded-xl' : ''}`}>
      <div className="container-custom">
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-brand-dark">Nossos Parceiros</h2>
            <p className="text-gray-600 mt-2">Empresas que confiam em nossos produtos</p>
          </div>
        )}
        
        {fullPage ? (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayPartners.map((partner, index) => (
              <motion.div 
                key={index} 
                variants={item}
                className="glass rounded-lg p-6 flex flex-col items-center justify-center h-48 md:h-56 transition-transform hover:scale-105 hover:shadow-md"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-24 max-w-full mb-4" 
                  width={120}
                  height={80}
                  loading={getImageLoading(index < 4)}
                  decoding={index < 4 ? "sync" : "async"}
                />
                <h3 className="text-lg font-medium text-brand-dark text-center">{partner.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="relative overflow-hidden">
            <div 
              className="flex space-x-6 py-4 overflow-x-auto hide-scrollbar transition-opacity duration-500" 
              ref={scrollRef}
              style={{ scrollBehavior: 'smooth' }}
            >
              {displayPartners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 glass rounded-lg px-6 py-5 flex items-center justify-center min-w-[180px] h-24 hover:shadow-md transition-shadow"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-12 max-w-full" 
                    width={100}
                    height={60}
                    loading={getImageLoading(index < 4)}
                  />
                </div>
              ))}
              
              {/* Only add duplicates if we're not showing all partners */}
              {!fullPage && displayPartners.slice(0, 4).map((partner, index) => (
                <div 
                  key={`duplicate-${index}`} 
                  className="flex-shrink-0 glass rounded-lg px-6 py-5 flex items-center justify-center min-w-[180px] h-24 hover:shadow-md transition-shadow"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-12 max-w-full" 
                    width={100}
                    height={60}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-brand-light to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-brand-light to-transparent pointer-events-none"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
