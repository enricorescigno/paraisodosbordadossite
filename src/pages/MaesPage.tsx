
import { useRef, useEffect } from 'react';
import { Heart, Gift, ArrowDown } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppleButton } from '@/components/ui/apple-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ProductsCarousel from '@/components/product/ProductsCarousel';
import { Product } from '@/types/product';
import { bonesProducts, bordadosProducts } from '@/utils/productUtils';
import { getImageLoading } from '@/utils/imageUtils';
import { useScrollToTop } from '@/hooks/useScrollToTop';

// Use the actual available products for Mother's Day with preloaded state
const mothersProducts: Product[] = [
  ...bonesProducts.slice(0, 3),
  ...bordadosProducts.slice(0, 3)
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const MaesPage = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  useScrollToTop();
  
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Preload critical images
  useEffect(() => {
    // Preload hero image
    const heroImage = new Image();
    heroImage.src = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    
    // Preload first few product images
    mothersProducts.slice(0, 2).forEach((product) => {
      const img = new Image();
      img.src = product.imageUrl;
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - Optimized */}
      <section 
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-[80vh] flex items-center"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundPosition: '75% center' 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/60"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-red mb-4"
              variants={fadeInUp}
            >
              Celebre o Dia das Mães com um presente único!
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8"
              variants={fadeInUp}
            >
              Ofereça um toque de elegância e carinho com nossos produtos exclusivos para essa data especial.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <AppleButton 
                size="lg" 
                className="group bg-[#E30613] hover:bg-[#c00510] text-white px-6 md:px-8 py-3 md:py-4"
                onClick={scrollToProducts}
              >
                <span>Ver Produtos</span>
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </AppleButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section 
        ref={productsRef} 
        className="py-12 md:py-16 bg-gray-50"
      >
        <motion.div 
          className="container mx-auto px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Presentes Especiais</h2>
              <p className="text-gray-600">Seleção exclusiva para o Dia das Mães</p>
            </div>
            
            <Heart className="text-[#E30613] h-6 w-6 md:h-8 md:w-8" />
          </div>
          
          {/* Products Carousel - optimized with skeleton loading */}
          <ProductsCarousel 
            products={mothersProducts} 
            whatsappNumber="5511999999999"
          />
          
          {/* Featured Products Grid (for larger screens) - with progressive loading */}
          <div className="hidden lg:block mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Destaques para Presente</h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {mothersProducts.slice(0, 3).map((product, index) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading={getImageLoading(index < 2)}
                        width={400}
                        height={400}
                      />
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-red font-medium">Solicitar Orçamento</span>
                        
                        {product.isNew && (
                          <span className="bg-[#006400] text-white text-xs px-2 py-1 rounded-full">
                            Novo
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link 
                        to={`/produto/${product.id}`} 
                        className="w-full"
                      >
                        <AppleButton 
                          variant="outline" 
                          className="w-full border-2 border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white"
                        >
                          <Gift className="h-4 w-4" />
                          <span>Ver Detalhes</span>
                        </AppleButton>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Message Section */}
      <section className="py-12 md:py-16 bg-white">
        <motion.div 
          className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="p-6 md:p-8 lg:p-12 rounded-2xl"
            style={{ 
              background: "linear-gradient(to right, rgba(227, 6, 19, 0.05), rgba(0, 100, 0, 0.05))" 
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Mensagem Especial</h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 italic mb-6 md:mb-8">
              "Neste Dia das Mães, ofereça o presente que demonstra o seu carinho. 
              Personalize e surpreenda com o Paraíso dos Bordados."
            </p>
            
            <Link to="/produtos">
              <AppleButton 
                size="lg" 
                className="mt-4 bg-[#006400] hover:bg-[#005000] text-white"
              >
                Explore Nossa Coleção
              </AppleButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MaesPage;
