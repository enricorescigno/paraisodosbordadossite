
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { allProducts, bordadosProducts, bordadosInfantisProducts } from '../utils/productUtils';
import { Product } from '../types/product';
import PageHeader from './common/PageHeader';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';
import BrowseByCategory from './common/BrowseByCategory';

// Portfolio categories mapping
const PORTFOLIO_CATEGORIES = {
  'Bordado em Boné': 'bordado-bone',
  'Bordado em Necessaire': 'bordado-necessaire',
  'Bordado em Bolsa': 'bordado-bolsa',
  'Bordado em Jaleco': 'bordado-jaleco',
  'Bordado Infantis': 'bordado-infantis',
  'Bordado em Toalha de Banho': 'bordado-toalha-banho',
  'Bonés Bordados': 'bordado-bone',
  'Bordado': 'bordado-bone',
  'Camisetas': 'vestuario',
  'Camisas Polo': 'vestuario',
  'Jalecos': 'bordado-jaleco',
  'Pantufas': 'vestuario',
  'Roupões Infantis': 'bordado-infantis',
  'Toalhas Infantis': 'bordado-toalha-banho',
  'Bordados em Bolsas': 'bordado-bolsa',
  'Bordados em Toalhas': 'bordado-toalha-banho',
  'Bordados em Vestuário': 'vestuario',
  'Bordados Infantis': 'bordado-infantis'
};

const AllPortfolioPage = () => {
  const [loading, setLoading] = useState(true);
  const [allPortfolioItems, setAllPortfolioItems] = useState<Product[]>([]);
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Use both the existing allProducts filter and the new bordadosProducts
      const portfolioItems = [
        // Original portfolio items
        ...allProducts.filter(product => 
          // Exclui explicitamente o produto 204
          Number(product.id) !== 204 && 
          (
            // Include items explicitly marked as portfolio type
            (product.type === 'portfolio') ||
            // Or include items with category related to embroidery/bordado
            (product.category && 
             (product.category.toLowerCase().includes('bordado') || 
              product.category.toLowerCase().includes('bonés')))
          )
        ),
        // Add our new bordados products explicitly 
        ...bordadosProducts,
        // Add our new bordados infantis products explicitly
        ...bordadosInfantisProducts
      ];
      
      // Create a unique set of products by id
      const uniqueProducts = Array.from(
        new Map(portfolioItems.map(item => [item.id, item])).values()
      );
      
      setAllPortfolioItems(uniqueProducts);
      setLoading(false);
    }, 300);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className={`py-12 md:py-20 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
        <div className="container-custom">
          <PageHeader 
            title="Nosso Portfólio de Bordados"
            description="Conheça nossos trabalhos de bordado personalizados para diversas aplicações, feitos com qualidade e atenção aos detalhes."
          />
          
          {/* Using only the category icons menu with portfolio specific icons */}
          <BrowseByCategory 
            activeCategory="all"
            showOnlyPortfolio={true}
          />
          
          {loading ? (
            <LoadingSpinner />
          ) : allPortfolioItems.length > 0 ? (
            <ProductsCarousel 
              products={allPortfolioItems}
              whatsappNumber={whatsappNumber}
              isPortfolio={true}
            />
          ) : (
            <EmptyState 
              message="Nenhum item encontrado no portfólio."
              buttonText="Voltar para página inicial"
              buttonLink="/"
            />
          )}
        </div>
      </section>
      
      <Footer />
      <WhatsAppSupport />
    </motion.div>
  );
};

export default AllPortfolioPage;
