
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { allProducts } from '../utils/productUtils';
import { Product } from '../types/product';
import PageHeader from './common/PageHeader';
import CategoryTabs from './common/CategoryTabs';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';

// Portfolio categories mapping
const PORTFOLIO_CATEGORIES = {
  'Bordado em Boné': 'bordado-bone',
  'Bordado em Necessaire': 'bordado-necessaire',
  'Bordado em Bolsa': 'bordado-bolsa',
  'Bordado em Jaleco': 'bordado-jaleco',
  'Bordado Infantis': 'bordado-infantis',
  'Bordado em Toalha de Banho': 'bordado-toalha-banho',
  'Bonés Bordados': 'bordado-bone',
  'Camisetas': 'vestuario',
  'Camisas Polo': 'vestuario',
  'Jalecos': 'bordado-jaleco',
  'Pantufas': 'vestuario',
  'Roupões Infantis': 'bordado-infantis',
  'Toalhas Infantis': 'bordado-toalha-banho'
};

const AllPortfolioPage = () => {
  const [loading, setLoading] = useState(true);
  const [allPortfolioItems, setAllPortfolioItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  
  useEffect(() => {
    // Simular carregamento para melhorar UX
    setLoading(true);
    setTimeout(() => {
      // Usar os produtos do nosso arquivo productUtils.ts
      const portfolioItems = allProducts.filter(product => 
        product.type === 'product' && product.category in PORTFOLIO_CATEGORIES
      );
      setAllPortfolioItems(portfolioItems);
      setFilteredItems(portfolioItems);
      setLoading(false);
    }, 300);
  }, []);

  // Filtrar itens com base na categoria
  useEffect(() => {
    let result = [...allPortfolioItems];
    
    // Aplicar filtro de categoria
    if (activeCategory !== 'all') {
      result = result.filter(item => {
        // Mapear categoria do produto para o slug da rota
        const categorySlug = PORTFOLIO_CATEGORIES[item.category as keyof typeof PORTFOLIO_CATEGORIES];
        return categorySlug === activeCategory;
      });
    }
    
    setFilteredItems(result);
  }, [activeCategory, allPortfolioItems]);

  // Extrair categorias únicas para filtros
  const getUniqueCategories = () => {
    const categories = ['all'];
    const uniqueSlugs = new Set();
    
    allPortfolioItems.forEach(item => {
      const categorySlug = PORTFOLIO_CATEGORIES[item.category as keyof typeof PORTFOLIO_CATEGORIES];
      if (categorySlug && !uniqueSlugs.has(categorySlug)) {
        uniqueSlugs.add(categorySlug);
        categories.push(categorySlug);
      }
    });
    
    return categories;
  };

  const categories = getUniqueCategories();

  // Função para obter nome de exibição da categoria
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'all': 'Todos',
      'bordado-bone': 'Bordado em Boné',
      'bordado-necessaire': 'Bordado em Necessaire',
      'bordado-bolsa': 'Bordado em Bolsa',
      'bordado-jaleco': 'Bordado em Jaleco',
      'bordado-infantis': 'Bordado Infantil',
      'bordado-toalha-banho': 'Bordado em Toalha',
      'vestuario': 'Vestuário'
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className={`py-16 md:py-24 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
        <div className="container-custom">
          <PageHeader 
            title="Nosso Portfólio"
            description="Conheça nossos trabalhos de bordado personalizados para diversas aplicações, feitos com qualidade e atenção aos detalhes."
          />
          
          <CategoryTabs 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            getCategoryDisplayName={getCategoryDisplayName}
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
              message="Nenhum item encontrado no portfólio."
              buttonText="Voltar para página inicial"
              buttonLink="/"
            />
          )}
        </div>
      </section>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default AllPortfolioPage;
