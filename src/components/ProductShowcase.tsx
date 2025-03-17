
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import BrowseByCategory from './common/BrowseByCategory';
import ProductsCarousel from './product/ProductsCarousel';
import { Product } from '@/types/product';

// Estrutura de produtos para showcase que representa o portfólio
const portfolioProducts: Product[] = [
  {
    id: 301,
    name: "Boné Personalizado Empresarial",
    description: "Bonés personalizados com bordado de alta qualidade para sua empresa",
    imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
    category: "Bordado em Boné",
    rating: 4.8,
    type: 'portfolio'
  }, {
    id: 310,
    name: "Necessaire Floral Bordada",
    description: "Necessaire com bordado floral personalizado",
    imageUrl: "/lovable-uploads/7c55472e-acf8-4000-8adc-9fe6b6c3a396.png",
    category: "Bordado em Necessaire",
    rating: 4.9,
    type: 'portfolio'
  }, {
    id: 320,
    name: "Bolsa Tote com Bordado",
    description: "Bolsa tote com bordado personalizado para o dia a dia",
    imageUrl: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop",
    category: "Bordado em Bolsa",
    rating: 4.7,
    type: 'portfolio'
  }, {
    id: 330,
    name: "Jaleco Médico Personalizado",
    description: "Jaleco médico com bordado personalizado para profissionais da saúde",
    imageUrl: "https://images.unsplash.com/photo-1524901548305-08eeddc35080?q=80&w=500&auto=format&fit=crop",
    category: "Bordado em Jaleco",
    rating: 5.0,
    type: 'portfolio'
  }
];

// Mapeamento entre categorias de portfólio e rotas
const PORTFOLIO_CATEGORIES: Record<string, string> = {
  'all': '/portfolio',
  'bordado-bone': '/portfolio/bordado-bone',
  'bordado-necessaire': '/portfolio/bordado-necessaire',
  'bordado-bolsa': '/portfolio/bordado-bolsa',
  'bordado-jaleco': '/portfolio/bordado-jaleco',
  'bordado-infantis': '/portfolio/bordado-infantis',
  'bordado-toalha-banho': '/portfolio/bordado-toalha-banho'
};

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(portfolioProducts);
  const whatsappNumber = "+5581995970776";
  
  const {
    ref: sectionRef,
    inView: sectionInView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Filtrar produtos por categoria
  useEffect(() => {
    // Implementação do filtro quando as categorias estiverem definidas completamente
    // Por enquanto mostra todos os produtos
    setFilteredProducts(portfolioProducts);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <section 
      ref={sectionRef} 
      className="section-padding bg-[#f5f5f7] transition-all duration-500 py-12 md:py-20"
    >
      <div className="container-custom">
        <div className={`text-center mb-8 transform transition-all duration-700 ${sectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nosso Portfólio de Bordados</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
            Conheça nossos trabalhos de bordado personalizados para diversas aplicações, feitos com qualidade e atenção aos detalhes.
          </p>
        </div>
        
        {/* Componente BrowseByCategory unificado */}
        <div className={`transform transition-all duration-700 delay-100 ${sectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <BrowseByCategory
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            showOnlyPortfolio={true}
          />
        </div>
        
        {/* Carrossel de produtos unificado */}
        <div className={`transform transition-all duration-700 delay-200 ${sectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <ProductsCarousel 
            products={filteredProducts}
            whatsappNumber={whatsappNumber}
            isPortfolio={true}
          />
        </div>
        
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

export default ProductShowcase;
