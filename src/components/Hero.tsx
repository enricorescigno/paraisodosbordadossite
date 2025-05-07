
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppleButton } from '@/components/ui/apple-button';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackErrorComponent from './common/FallbackErrorComponent';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [fallback, setFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const posterImage = "/lovable-uploads/paraiso-agulha-poster.jpg";

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const onLoadedData = () => {
        setIsVideoLoaded(true);
        console.log("Video loaded successfully");
      };
      
      const onError = (e: Event) => {
        console.error("Video loading error:", e);
        setFallback(true);
      };
      
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('error', onError);
      
      // Force video to load
      try {
        video.load();
      } catch (err) {
        console.error("Error loading video:", err);
        setFallback(true);
      }
      
      // Safety fallback in case video doesn't load within 5 seconds
      const fallbackTimer = setTimeout(() => {
        if (!isVideoLoaded) {
          console.log("Video load timeout, using fallback image");
          setFallback(true);
        }
      }, 5000);
      
      // Preload with metadata only for better performance
      video.preload = "metadata";
      
      // Attempt to play the video
      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => console.log("Video playing"))
            .catch(err => {
              console.error("Video play error:", err);
              // Don't set fallback immediately on play error
              // Some browsers require user interaction before video can play
            });
        }
      } catch (err) {
        console.error("Error playing video:", err);
      }
      
      return () => {
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('error', onError);
        clearTimeout(fallbackTimer);
      };
    }
  }, [isVideoLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Optimize parallax effect - only apply if the element is in viewport
      if (containerRef.current && videoRef.current && scrollPosition < window.innerHeight) {
        try {
          const yValue = scrollPosition * 0.4;
          videoRef.current.style.setProperty('transform', `scale(1.01) translateY(${yValue}px)`);
        } catch (error) {
          console.error("Error applying parallax effect:", error);
        }
      }
    };
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  return (
    <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
      <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
        {/* Video Background with Fallback */}
        {!fallback ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isVideoLoaded ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
            preload="metadata"
            poster={posterImage}
            onError={() => setFallback(true)}
          >
            <source 
              src="/lovable-uploads/paraiso-agulha.mp4" 
              type="video/mp4" 
            />
            Seu navegador não suporta vídeos HTML5.
          </video>
        ) : (
          <img
            src={posterImage}
            alt="Banner institucional Paraíso dos Bordados"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="container-custom text-center">
            {/* Frosted Glass Card - Only the buttons now */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={glassCardVariants}
              className="inline-block mx-auto px-8 py-10 md:px-12 md:py-12 bg-white/40 backdrop-blur-[12px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60"
            >
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
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

        {/* Hidden anchor for scroll detection */}
        <div id="top-anchor" className="absolute top-0 left-0 w-full h-10" aria-hidden="true"></div>

        {/* Scroll indicator with smoother animation */}
        {!isScrolled && (
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 opacity-100"
          >
            <motion.div
              className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center p-1"
              animate={{
                y: [0, 10, 0]
              }}
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
        )}
      </section>
    </ErrorBoundary>
  );
};

export default Hero;
