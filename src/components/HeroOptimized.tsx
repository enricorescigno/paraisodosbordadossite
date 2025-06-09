
import { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppleButton } from '@/components/ui/apple-button';
import { usePerformanceOptimized } from '@/hooks/usePerformanceOptimized';

const HeroOptimized = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHighQuality, setIsHighQuality] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { throttle } = usePerformanceOptimized({ throttleMs: 16 });

  // Memoize animation variants to prevent recreation on every render
  const animationVariants = useMemo(() => ({
    button: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    },
    glassCard: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }
      }
    }
  }), []);

  // Optimized video loading with network detection
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    const onLoadedData = () => {
      setIsVideoLoaded(true);
      console.log("Video loaded successfully");
    };
    
    const onError = (e: Event) => {
      console.error("Video loading error:", e);
    };
    
    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('error', onError);
    
    // Optimize video loading based on connection
    const connection = (navigator as any).connection;
    if (connection) {
      if (connection.effectiveType === '4g' || connection.downlink > 1.5) {
        video.preload = "metadata";
        // Enable higher quality after initial load
        video.addEventListener('canplay', () => {
          setTimeout(() => setIsHighQuality(true), 3000);
        }, { once: true });
      } else {
        video.preload = "none";
      }
    }
    
    video.load();
    
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log("Video playing"))
        .catch(err => console.error("Video play error:", err));
    }
    
    return () => {
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('error', onError);
    };
  }, []);

  // Optimized scroll handler with throttling
  useEffect(() => {
    const handleScroll = () => {
      throttle(() => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 50);

        // Optimize parallax effect - only apply if element is in viewport
        if (scrollPosition < window.innerHeight && videoRef.current) {
          const yValue = scrollPosition * 0.4;
          videoRef.current.style.transform = `scale(1.01) translateY(${yValue}px)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttle]);
  
  // Lazy load high quality video
  useEffect(() => {
    if (isHighQuality && videoRef.current) {
      videoRef.current.preload = "auto";
    }
  }, [isHighQuality]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Optimized Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: isVideoLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          willChange: 'transform' // Optimize for animations
        }}
        preload="metadata"
        poster="/lovable-uploads/paraiso-agulha-poster.jpg"
      >
        <source 
          src="/lovable-uploads/paraiso-agulha.mp4" 
          type="video/mp4" 
        />
        Seu navegador não suporta vídeos HTML5.
      </video>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="container-custom text-center">
          {/* Optimized Glass Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants.glassCard}
            className="inline-block mx-auto px-8 py-10 md:px-12 md:py-12 bg-white/40 backdrop-blur-[12px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60"
          >
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
              initial="hidden"
              animate="visible"
              variants={animationVariants.button}
            >
              <AppleButton size="lg" className="w-full sm:w-auto">
                <Link to="/produtos" className="flex items-center gap-2">
                  Explorar Produtos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </AppleButton>

              <AppleButton variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/portfolio" className="my-0 py-[12px]">
                  Ver Portfólio de Bordados
                </Link>
              </AppleButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Optimized Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <motion.div
          className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
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
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroOptimized;
