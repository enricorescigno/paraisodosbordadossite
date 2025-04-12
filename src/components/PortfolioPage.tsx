
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { allProducts, bordadosProducts, bordadosInfantisProducts } from '../utils/productUtils';
import { Product } from '../types/product';
import PageHeader from './common/PageHeader';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';
import { useScrollToTop } from '../hooks/useScrollToTop';
import BrowseByCategory from './common/BrowseByCategory';

// Portfolio categories mapping
const PORTFOLIO_CATEGORIES: Record<string, string> = {
  'bordado-bone': 'Bonés Bordados',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Jalecos',
  'bordado-infantis': 'Bordados Infantis',
  'bordado-toalha-banho': 'Toalhas Infantis',
  'vestuario': 'Bordados em Vestuário'
};

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'bordado-bone': 'Bordado em Boné',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Bordado em Jaleco',
  'bordado-infantis': 'Bordado Infantil',
  'bordado-toalha-banho': 'Bordado em Toalha de Banho',
  'vestuario': 'Bordado em Vestuário'
};

const PortfolioPage = () => {
  const location = useLocation();
  const [portfolioItems, setPortfolioItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const whatsappNumber = "+5581995970776";
  useScrollToTop();
  
  // Extract the category from the URL path for active category and title
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Combine all potential portfolio items
      let allPotentialItems = [
        ...allProducts.filter(product => 
          Number(product.id) !== 204 && 
          (product.type === 'portfolio' || 
           product.category.toLowerCase().includes('bordado') || 
           product.category.toLowerCase().includes('bonés'))
        ),
        ...bordadosProducts,
        ...bordadosInfantisProducts
      ];
      
      // Make sure we have unique items
      const uniqueItems = Array.from(
        new Map(allPotentialItems.map(item => [item.id, item])).values()
      );
      
      // Filter by the selected category
      const matchingCategory = PORTFOLIO_CATEGORIES[categoryPath] || '';
      let categoryItems: Product[] = [];
      
      if (matchingCategory) {
        // Filter products that match the mapped category
        categoryItems = uniqueItems.filter(product => 
          (product.category === matchingCategory || 
           product.category.toLowerCase().includes(matchingCategory.toLowerCase()))
        );
      }

      // If no specific items found, try broader matching
      if (categoryItems.length === 0) {
        categoryItems = uniqueItems.filter(product => {
          const productCategory = product.category.toLowerCase();
          const searchTitle = categoryTitles[categoryPath]?.toLowerCase() || '';
          const searchPath = categoryPath.toLowerCase();
          
          return (
            productCategory.includes('bordado') && 
            (productCategory.includes(searchPath) || 
             (searchTitle && productCategory.includes(searchTitle)))
          );
        });
      }

      // Special handling for "bordado-infantis" category
      if (categoryPath === 'bordado-infantis') {
        categoryItems = bordadosInfantisProducts;
      }

      setPortfolioItems(categoryItems);
      setFilteredItems(categoryItems);
      setLoading(false);
    }, 300);
  }, [location.pathname, categoryPath]);
  
  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="py-12 md:py-20 bg-[#f5f5f7]">
        <div className="container-custom">
          <PageHeader 
            title={categoryTitle}
            description={`Explore nossos trabalhos de ${categoryTitle.toLowerCase()} feitos com qualidade e atenção aos detalhes.`}
          />
          
          {/* Show only the portfolio categories */}
          <BrowseByCategory
            activeCategory={categoryPath}
            showOnlyPortfolio={true}
          />
          
          {loading ? (
            <LoadingSpinner />
          ) : filteredItems.length > 0 ? (
            <ProductsCarousel 
              products={filteredItems}
              whatsappNumber={whatsappNumber}
              isPortfolio={true}
            />
          ) : (
            <EmptyState 
              message="Nenhum item encontrado nesta categoria."
              buttonText="Ver todas as categorias"
              buttonLink="/portfolio"
            />
          )}
        </div>
      </section>
      
      <Footer />
      <WhatsAppSupport />
    </motion.div>
  );
};

export default PortfolioPage;
