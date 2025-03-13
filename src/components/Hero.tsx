
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.4, 
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        loop 
        playsInline 
        className={`absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform' }}
      >
        <source src="/videos/bordado-background.mp4" type="video/mp4" />
        <source src="https://i.imgur.com/OeHLvJP.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="container-custom text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            Paraíso em Ponto Cruz
          </motion.h1>
          
          <motion.p 
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8"
            initial="hidden"
            animate="visible"
            variants={descriptionVariants}
          >
            Transformamos linhas e agulhas em verdadeiras obras de arte. Conheça nossa coleção exclusiva de bordados feitos com paixão e maestria.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <motion.div whileHover="hover" variants={buttonVariants}>
              <Link to="/produtos" className="btn-primary flex items-center gap-2 px-6 py-3 shadow-md">
                Explorar Produtos
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={buttonVariants}>
              <Link to="/portfolio" className="btn-secondary px-6 py-3 shadow-sm">Ver Portfólio de Bordados</Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator with smoother animation */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
        <motion.div 
          className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center p-1"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-white/60 rounded-full mt-1"
            animate={{ 
              opacity: [0.6, 1, 0.6],
              y: [0, 6, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
