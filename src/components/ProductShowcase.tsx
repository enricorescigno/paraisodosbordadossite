
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import BrowseByCategory from './common/BrowseByCategory';
import ProductsCarousel from './product/ProductsCarousel';
import { Product } from '@/types/product';
import { bonesProducts, bordadosProducts } from '@/utils/productUtils';

// Updated portfolio products showcase using actual products from our collection
const portfolioProducts: Product[] = [
  ...bonesProducts,
  ...bordadosProducts.slice(0, 2)  // Only take 2 items from bordados to avoid overwhelming the showcase
];

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const whatsappNumber = "+5581995970776";
  
  const {
    ref: sectionRef,
    inView: sectionInView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
        
        {/* BrowseByCategory configurado para redirecionamento */}
        <div className={`transform transition-all duration-700 delay-100 ${sectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <BrowseByCategory
            activeCategory={activeCategory}
            showOnlyPortfolio={true}
            // Removemos onCategoryChange para utilizar o comportamento de navegação padrão
          />
        </div>
        
        {/* Carrossel de produtos */}
        <div className={`transform transition-all duration-700 delay-200 ${sectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <ProductsCarousel 
            products={portfolioProducts}
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
