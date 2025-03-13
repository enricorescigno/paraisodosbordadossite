
import { useEffect, useRef } from 'react';

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
    name: "Paraíso dos Bordados",
    logo: "/lovable-uploads/620a0828-61e3-409b-8639-64b8d65f538c.png"
  }
];

const Partners = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
      
      // Change direction when reaching ends
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
  }, []);

  return (
    <section className="py-12 bg-brand-light">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-brand-dark">Nossos Parceiros</h2>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex space-x-8 py-4 overflow-x-auto scrollbar-hide"
            ref={scrollRef}
          >
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex-shrink-0 glass rounded-lg px-6 py-4 flex items-center justify-center min-w-[180px] h-20"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-12 max-w-full"
                />
              </div>
            ))}
            
            {/* Duplicate partners for infinite scroll effect */}
            {partners.map((partner, index) => (
              <div 
                key={`duplicate-${index}`}
                className="flex-shrink-0 glass rounded-lg px-6 py-4 flex items-center justify-center min-w-[180px] h-20"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-12 max-w-full"
                />
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for fading effect */}
          <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-brand-light to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-brand-light to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
