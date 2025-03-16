import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppleButton } from '@/components/ui/apple-button';
const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (containerRef.current) {
        setIsScrolled(scrollPosition > 50);

        // Parallax effect on scroll
        const yValue = scrollPosition * 0.4;
        videoRef.current?.style.setProperty('transform', `scale(1.01) translateY(${yValue}px)`);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', () => {
          setIsVideoLoaded(true);
        });
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Apple-like ease curve
      }
    }
  };
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  const glassCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  return <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Image Background with overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <img src="/lovable-uploads/3eac496f-461d-4e47-9cc8-af09ad0873a2.png" alt="Bordado luxuoso com detalhes em vermelho e dourado" className="absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-1000 opacity-100" onError={e => {
      // Fallback to video if image fails to load
      e.currentTarget.style.display = 'none';
      if (videoRef.current) videoRef.current.style.display = 'block';
    }} />
      
      {/* Video Background as fallback */}
      <video ref={videoRef} autoPlay muted loop playsInline className={`absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`} style={{
      display: 'none',
      willChange: 'transform'
    }}>
        <source src="/videos/bordado-background.mp4" type="video/mp4" />
        <source src="https://i.imgur.com/OeHLvJP.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="container-custom text-center">
          {/* Frosted Glass Card */}
          <motion.div initial="hidden" animate="visible" variants={glassCardVariants} className="inline-block mx-auto px-8 py-10 md:px-12 md:py-12 
                       bg-white/40 backdrop-blur-[12px] rounded-2xl 
                       shadow-[0_8px_32px_rgba(0,0,0,0.1)] 
                       border border-white/60">
            <motion.h1 initial="hidden" animate="visible" variants={titleVariants} className="text-4xl md:text-5xl font-sans mb-6 text-red-600 lg:text-6xl tracking-tight font-extrabold">
              Paraíso dos Bordados
            </motion.h1>
            
            <motion.p initial="hidden" animate="visible" variants={descriptionVariants} className="text-brand-dark/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal">
              Transformamos linhas e agulhas em verdadeiras obras de arte. Conheça nossa coleção exclusiva de bordados feitos com paixão e maestria.
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6" initial="hidden" animate="visible" variants={buttonVariants}>
              <AppleButton size="lg" className="w-full sm:w-auto">
                <Link to="/produtos" className="flex items-center gap-2">
                  Explorar Produtos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AppleButton>
              
              <AppleButton variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/portfolio">
                  Ver Portfólio de Bordados
                </Link>
              </AppleButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator with smoother animation */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
        <motion.div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center p-1" animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}>
          <motion.div className="w-1 h-3 bg-white/60 rounded-full mt-1" animate={{
          opacity: [0.6, 1, 0.6],
          y: [0, 6, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
        </motion.div>
      </div>
    </section>;
};
export default Hero;