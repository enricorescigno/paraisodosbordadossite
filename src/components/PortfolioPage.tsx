
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { allProducts } from '../utils/productUtils';
import { Product } from '../types/product';
import PageHeader from './common/PageHeader';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';

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
  
  useEffect(() => {
    // Extract the category from the URL path
    const pathParts = location.pathname.split('/');
    const categoryPath = pathParts[pathParts.length - 1];

    // In a real application, this would be an API call
    setLoading(true);
    setTimeout(() => {
      // Obter produtos do productUtils.ts que correspondem à categoria do portfólio
      const matchingCategory = PORTFOLIO_CATEGORIES[categoryPath] || '';
      let categoryItems: Product[] = [];
      if (matchingCategory) {
        // Filtra produtos que correspondem à categoria mapeada
        categoryItems = allProducts.filter(product => product.type === 'portfolio' && product.category === matchingCategory);
      }

      // Se não encontrar itens de portfólio, buscar como produtos normais
      if (categoryItems.length === 0) {
        categoryItems = allProducts.filter(product => product.category === matchingCategory || product.category === categoryTitles[categoryPath]);
      }
      setPortfolioItems(categoryItems);
      setFilteredItems(categoryItems);
      setLoading(false);
    }, 300); // Simulate network request
  }, [location.pathname]);

  // Extract the category from the URL path for title
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-16 md:py-24 bg-[#f5f5f7]">
        <div className="container-custom">
          <PageHeader 
            title={categoryTitle}
            description={`Explore nossos trabalhos de ${categoryTitle.toLowerCase()} feitos com qualidade e atenção aos detalhes.`}
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
    </div>
  );
};

export default PortfolioPage;
