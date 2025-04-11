
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { allProducts } from '../utils/productUtils';
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
  'bordado-infantis': 'Roupões Infantis',
  'bordado-toalha-banho': 'Toalhas Infantis'
};

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'bordado-bone': 'Bordado em Boné',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Bordado em Jaleco',
  'bordado-infantis': 'Bordado Infantil',
  'bordado-toalha-banho': 'Bordado em Toalha de Banho'
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
      // Obter produtos do productUtils.ts que correspondem à categoria do portfólio
      const matchingCategory = PORTFOLIO_CATEGORIES[categoryPath] || '';
      let categoryItems: Product[] = [];
      
      if (categoryPath) {
        // Filtra produtos com base na categoria da URL
        categoryItems = allProducts.filter(product => 
          // Excluir produto 204 explicitamente
          Number(product.id) !== 204 && 
          // Incluir apenas produtos de portfólio
          (product.type === 'portfolio') && 
          // Verificar se a categoria corresponde ao caminho da URL
          (product.category.toLowerCase().includes(categoryTitle.toLowerCase()) ||
           (categoryPath === 'bordado-bolsa' && product.category.includes('Bolsa')) ||
           (categoryPath === 'bordado-necessaire' && product.category.includes('Necessaire')) ||
           (categoryPath === 'bordado-bone' && (product.category.includes('Boné') || product.category.includes('Bone'))) ||
           (categoryPath === 'bordado-jaleco' && 
            (product.category.includes('Jaleco') || product.category.includes('Vestuário'))) ||
           (categoryPath === 'bordado-infantis' && product.category.includes('Infantil')) ||
           (categoryPath === 'bordado-toalha-banho' && product.category.includes('Toalha')))
        );
      }

      // Se não encontrar itens de portfólio, buscar como produtos normais relacionados a bordado
      if (categoryItems.length === 0) {
        categoryItems = allProducts.filter(product => 
          Number(product.id) !== 204 &&
          (product.category.toLowerCase().includes('bordado') || 
           product.category.toLowerCase().includes('bonés')) &&
          (product.category === categoryTitles[categoryPath] || 
           product.category.toLowerCase().includes(categoryTitles[categoryPath]?.toLowerCase() || ''))
        );
      }

      setPortfolioItems(categoryItems);
      setFilteredItems(categoryItems);
      setLoading(false);
    }, 300);
  }, [location.pathname, categoryPath, categoryTitle]);
  
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
