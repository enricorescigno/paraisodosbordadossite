
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { allProducts, bordadosProducts, bordadosInfantisProducts } from '../utils/productUtils';
import { bordadoVestuarioProducts } from '../utils/products/vestuarioProducts';
import { bonesProducts } from '../utils/products/bonesProducts';
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
  'Bordado em Vestuário': 'bordado-vestuario',
  'Bordado Infantis': 'bordado-infantis',
  'Bordado em Toalha de Banho': 'bordado-toalha-banho',
  'Bonés Bordados': 'bordado-bone',
  'Bordado': 'bordado-bone',
  'Camisetas': 'bordado-vestuario',
  'Camisas Polo': 'bordado-vestuario',
  'Jalecos': 'bordado-vestuario',
  'Pantufas': 'bordado-vestuario',
  'Roupões Infantis': 'bordado-infantis',
  'Toalhas Infantis': 'bordado-toalha-banho',
  'Bordados em Bolsas': 'bordado-bolsa',
  'Bordados em Toalhas': 'bordado-toalha-banho',
  'Bordados em Vestuário': 'bordado-vestuario',
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
      // Use both the existing allProducts filter and the specific category products
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
        // Add our specific category products explicitly 
        ...bordadosProducts,
        ...bordadosInfantisProducts,
        ...bordadoVestuarioProducts,
        ...bonesProducts
      ];
      
      // Create a unique set of products by id
      const uniqueProducts = Array.from(
        new Map(portfolioItems.map(item => [item.id, item])).values()
      );
      
      // Filter out the product with ID 2003 and 902 (Bordado em Necessaire + Toalha de Rosto)
      const filteredProducts = uniqueProducts.filter(product => 
        product.id !== 2003 && product.id !== 902 && 
        !product.name.toLowerCase().includes('necessaire + toalha')
      );
      
      setAllPortfolioItems(filteredProducts);
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
