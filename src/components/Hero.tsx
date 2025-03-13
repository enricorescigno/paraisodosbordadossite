
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', () => {
          setIsVideoLoaded(true);
        });
      }
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="https://vod-progressive.akamaized.net/exp=1722441531~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4501%2F8%2F222507966%2F780368530.mp4~hmac=2d60aefd3b5bf0ceabdc45cd27e7b1c4ac3bcc3bed3267714613ffd08f61feb4/vimeo-prod-skyfire-std-us/01/4501/8/222507966/780368530.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="container-custom text-center">
          <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <span className="bg-brand-white/90 backdrop-blur-sm text-brand-red px-4 py-1 rounded-full text-sm font-medium">
              Arte em Cada Ponto
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-6 max-w-4xl mx-auto leading-tight animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            Descubra a Beleza dos Bordados Artesanais
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            Transformamos linhas e agulhas em verdadeiras obras de arte. Conheça nossa coleção exclusiva de bordados feitos com paixão e maestria.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            <Link to="/produtos" className="btn-primary flex items-center gap-2 px-6 py-3">
              Explorar Produtos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/portfolio" className="btn-secondary px-6 py-3">
              Ver Portfólio
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-1 animate-pulse-soft"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
