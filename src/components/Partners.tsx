
import { useEffect, useRef } from 'react';

const partners = [
  {
    name: "Cotton Brasil",
    logo: "https://placehold.co/200x80/white/333333?text=Cotton+Brasil&font=montserrat"
  },
  {
    name: "Fios Premium",
    logo: "https://placehold.co/200x80/white/333333?text=Fios+Premium&font=montserrat"
  },
  {
    name: "Agulha & Arte",
    logo: "https://placehold.co/200x80/white/333333?text=Agulha+%26+Arte&font=montserrat"
  },
  {
    name: "Bordado Master",
    logo: "https://placehold.co/200x80/white/333333?text=Bordado+Master&font=montserrat"
  },
  {
    name: "Tecidos Deluxe",
    logo: "https://placehold.co/200x80/white/333333?text=Tecidos+Deluxe&font=montserrat"
  },
  {
    name: "Linhas & Cia",
    logo: "https://placehold.co/200x80/white/333333?text=Linhas+%26+Cia&font=montserrat"
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
