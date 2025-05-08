
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '@/hooks/useMobile';
import { allProducts, bordadosProducts, bordadosInfantisProducts } from '../utils/productUtils';
import { bordadoVestuarioProducts } from '../utils/products/vestuarioProducts';
import { bonesProducts } from '../utils/products/bonesProducts';
import { Product } from '../types/product';
import PageHeader from './common/PageHeader';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';
import BrowseByCategory from './common/BrowseByCategory';
import useMountedState from '@/hooks/useMountedState';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackErrorComponent from './common/FallbackErrorComponent';
import { Button } from '@/components/ui/button';

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
  const [error, setError] = useState<Error | null>(null);
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  const isMounted = useMountedState();
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const timer = setTimeout(() => {
      if (!isMounted.current) return;
      
      try {
        // Safely handle product arrays
        const safeAllProducts = Array.isArray(allProducts) ? allProducts : [];
        const safeBordadosProducts = Array.isArray(bordadosProducts) ? bordadosProducts : [];
        const safeBordadosInfantisProducts = Array.isArray(bordadosInfantisProducts) ? bordadosInfantisProducts : [];
        const safeBordadoVestuarioProducts = Array.isArray(bordadoVestuarioProducts) ? bordadoVestuarioProducts : [];
        const safeBonesProducts = Array.isArray(bonesProducts) ? bonesProducts : [];
        
        // Use both the existing allProducts filter and the specific category products
        const portfolioItems = [
          // Original portfolio items
          ...safeAllProducts.filter(product => 
            // Safely check properties
            product && 
            product.id !== 204 && 
            (
              // Include items explicitly marked as portfolio type
              (product.type === 'portfolio') ||
              // Or include items with category related to embroidery/bordado
              (product.category && 
              typeof product.category === 'string' &&
              (product.category.toLowerCase().includes('bordado') || 
                product.category.toLowerCase().includes('bonés')))
            )
          ),
          // Add our specific category products explicitly 
          ...safeBordadosProducts,
          ...safeBordadosInfantisProducts,
          ...safeBordadoVestuarioProducts,
          ...safeBonesProducts
        ];
        
        // Create a unique set of products by id
        const uniqueProducts = Array.from(
          new Map(
            portfolioItems
              .filter(item => item && item.id) // Make sure item and item.id exist
              .map(item => [item.id, item])
          ).values()
        );
        
        // Filter out the product with ID 2003 and 902 (Bordado em Necessaire + Toalha de Rosto)
        const filteredProducts = uniqueProducts.filter(product => 
          product && 
          product.id !== 2003 && 
          product.id !== 902 && 
          (product.name ? !product.name.toLowerCase().includes('necessaire + toalha') : true)
        );
        
        if (isMounted.current) {
          setAllPortfolioItems(filteredProducts);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted.current) {
          console.error("Error loading portfolio items:", err);
          setError(err instanceof Error ? err : new Error("Unknown error loading portfolio items"));
          setLoading(false);
        }
      }
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ErrorBoundary 
      FallbackComponent={FallbackErrorComponent}
      onError={(error) => console.error("Error in AllPortfolioPage:", error)}
    >
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
            <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
              <BrowseByCategory 
                activeCategory="all"
                showOnlyPortfolio={true}
              />
            </ErrorBoundary>
            
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6 text-center">
                <p className="text-red-700">
                  Ocorreu um erro ao carregar o portfólio. Por favor, tente novamente mais tarde.
                </p>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="mt-2"
                >
                  Tentar Novamente
                </Button>
              </div>
            ) : loading ? (
              <LoadingSpinner />
            ) : allPortfolioItems && allPortfolioItems.length > 0 ? (
              <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
                <ProductsCarousel 
                  products={allPortfolioItems}
                  whatsappNumber={whatsappNumber}
                  isPortfolio={true}
                />
              </ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default AllPortfolioPage;
