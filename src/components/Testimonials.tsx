
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Mariana Silva",
    role: "Cliente Fiel",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Os bordados da Paraíso são verdadeiras obras de arte. Comprei um conjunto para presente e todos ficaram encantados com a qualidade e beleza. Superou todas as minhas expectativas!",
    rating: 5
  },
  {
    id: 2,
    name: "João Pereira",
    role: "Cliente Novo",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Mesmo sendo iniciante no bordado, encontrei kits perfeitos para começar. O atendimento foi excepcional e me ajudaram a escolher os materiais ideais para meu nível.",
    rating: 5
  },
  {
    id: 3,
    name: "Carla Mendes",
    role: "Bordadeira Profissional",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    content: "Como profissional da área, sou exigente com a qualidade dos materiais. A Paraíso dos Bordados oferece sem dúvida os melhores produtos do mercado. Sou cliente há anos!",
    rating: 5
  },
  {
    id: 4,
    name: "Paulo Nascimento",
    role: "Cliente",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    content: "Comprei um kit de bordado para minha esposa e ela adorou. A entrega foi rápida e o produto chegou em perfeitas condições. Certamente compraremos mais vezes!",
    rating: 4
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const goToPrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <section className="py-20 bg-brand-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-brand-dark tracking-tight font-sans mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-base text-brand-dark/80 font-light max-w-2xl mx-auto">
            A satisfação de nossos clientes é nossa maior recompensa. Confira alguns depoimentos.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonials Carousel */}
          <div className="relative h-[340px] md:h-[280px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-500 
                ${index === currentIndex 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentIndex || (currentIndex === 0 && index === testimonials.length - 1)
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic font-light">&quot;{testimonial.content}&quot;</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium text-brand-dark">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 font-light">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-brand-red transition-colors duration-300 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-brand-red transition-colors duration-300 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          {/* Dots indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => {
                    setIsAnimating(false);
                  }, 500);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                ${index === currentIndex ? 'bg-brand-red scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
