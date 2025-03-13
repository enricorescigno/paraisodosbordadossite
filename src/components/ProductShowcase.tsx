
import { useEffect, useState } from 'react';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
  portfolioType: string;
}

// Updated products to match portfolio categories from MenubarNav
const products: Product[] = [{
  id: 301,
  name: "Boné Personalizado Empresarial",
  image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
  category: "Bordado em Boné",
  rating: 4.8,
  portfolioType: "bordado-bone"
}, {
  id: 310,
  name: "Necessaire Floral Bordada",
  image: "/lovable-uploads/7c55472e-acf8-4000-8adc-9fe6b6c3a396.png",
  category: "Bordado em Necessaire",
  rating: 4.9,
  portfolioType: "bordado-necessaire"
}, {
  id: 320,
  name: "Bolsa Tote com Bordado",
  image: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop",
  category: "Bordado em Bolsa",
  rating: 4.7,
  portfolioType: "bordado-bolsa"
}, {
  id: 330,
  name: "Jaleco Médico Personalizado",
  image: "https://images.unsplash.com/photo-1524901548305-08eeddc35080?q=80&w=500&auto=format&fit=crop",
  category: "Bordado em Jaleco",
  rating: 5.0,
  portfolioType: "bordado-jaleco"
}];

// Gerador de mensagens personalizadas para WhatsApp
const generateWhatsAppMessage = (productName: string): string => {
  return encodeURIComponent(`Olá! Vi o produto ${productName.toLowerCase()} e gostaria de fazer um orçamento!`);
};

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [animateProducts, setAnimateProducts] = useState(false);
  const {
    ref: sectionRef,
    inView: sectionInView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Extract unique portfolio categories for tabs
  const categories = ["all", ...new Set(products.map(product => product.portfolioType))];
  const categoryLabels: {
    [key: string]: string;
  } = {
    "all": "Todos",
    "bordado-bone": "Bordado em Boné",
    "bordado-necessaire": "Bordado em Necessaire",
    "bordado-bolsa": "Bordado em Bolsa",
    "bordado-jaleco": "Bordado em Jaleco",
    "bordado-infantis": "Bordado Infantil",
    "bordado-toalha-banho": "Bordado em Toalha"
  };

  useEffect(() => {
    setAnimateProducts(false);
    setTimeout(() => {
      if (activeTab === "all") {
        setVisibleProducts(products);
      } else {
        const filtered = products.filter(product => product.portfolioType === activeTab);
        setVisibleProducts(filtered);
      }
      setAnimateProducts(true);
    }, 300);
  }, [activeTab]);

  const whatsappNumber = "+5581995970776";

  return (
    <section 
      ref={sectionRef} 
      className="section-padding bg-[#f5f5f7] transition-all duration-500 py-12 md:py-20"
    >
      <div className="container-custom">
        <div className={`text-center mb-8 transform transition-all duration-700 ${sectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Nosso Portfólio de Bordados</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Conheça nossos trabalhos de bordado personalizados para diversas aplicações, feitos com qualidade e atenção aos detalhes.
          </p>
        </div>
        
        {/* Category Tabs - Apple Style */}
        <div className={`flex justify-center mb-10 overflow-x-auto pb-2 transform transition-all duration-700 delay-100 ${sectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex gap-2 md:gap-3 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-sm">
            {categories.map(category => (
              <button 
                key={category} 
                onClick={() => setActiveTab(category)} 
                className={`px-4 py-2 whitespace-nowrap rounded-full transition-all duration-300
                  ${activeTab === category 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'bg-transparent text-brand-dark hover:bg-brand-red/10'}`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
            {visibleProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                animateProducts={animateProducts} 
                whatsappNumber={whatsappNumber} 
              />
            ))}
          </div>
        </div>
        
        {/* Mobile Carousel - Apple Style */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {visibleProducts.map((product, index) => (
                <CarouselItem key={product.id} className="basis-full sm:basis-1/2">
                  <ProductCard 
                    product={product} 
                    index={index} 
                    animateProducts={animateProducts} 
                    whatsappNumber={whatsappNumber} 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.min(5, Math.ceil(visibleProducts.length / 2)) }).map((_, index) => (
                <div key={index} className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-brand-red' : 'bg-gray-300'}`}></div>
              ))}
            </div>
          </Carousel>
        </div>
        
        {/* View All Link */}
        <div className={`flex justify-center mt-12 transform transition-all duration-700 delay-300 ${sectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-brand-dark font-medium hover:bg-brand-red hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Ver Todo o Portfólio
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Apple-style Product Card Component
const ProductCard = ({ 
  product, 
  index, 
  animateProducts, 
  whatsappNumber 
}: { 
  product: Product, 
  index: number, 
  animateProducts: boolean, 
  whatsappNumber: string 
}) => {
  return (
    <Card 
      className={`rounded-xl overflow-hidden border-0 bg-white shadow-sm transition-all duration-500 
        ${animateProducts 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'}
        hover:shadow-md hover:-translate-y-1 hover:scale-[1.02] group`} 
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      <Link to={`/produto/${product.id}`} className="block">
        <AspectRatio ratio={1/1} className="relative bg-[#f8f8f8]">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply p-4"
            onError={(e) => {
              // Fallback image based on category
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.category)}`;
            }}
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        </AspectRatio>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">{product.rating.toFixed(1)}</span>
        </div>
        <h3 className="font-semibold text-base md:text-lg mb-3 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(product.name)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs md:text-sm text-gray-600 hover:text-brand-red flex items-center gap-1 transition-all duration-300 group-hover:translate-x-1"
          >
            <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span>Solicitar orçamento</span>
          </a>
          <Link 
            to={`/produto/${product.id}`}
            className="text-brand-dark hover:text-brand-red transition-all duration-300 group-hover:translate-x-1"
          >
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductShowcase;
