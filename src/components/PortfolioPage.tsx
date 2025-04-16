import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { allProducts } from '../utils/productUtils';
import { bordadosProducts, bordadosInfantisProducts, bordadoVestuarioProducts } from '../utils/products';
import { bonesProducts } from '../utils/products/bonesProducts';
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
  'bordado-vestuario': 'Bordado em Vestuário',
  'bordado-infantis': 'Bordados Infantis',
  'bordado-toalha-banho': 'Bordado em Toalha',
  'vestuario': 'Bordados em Vestuário'
};

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'bordado-bone': 'Bordado em Boné',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-vestuario': 'Bordado em Vestuário',
  'bordado-infantis': 'Bordado Infantil',
  'bordado-toalha-banho': 'Bordado em Toalha',
  'vestuario': 'Bordados em Vestuário'
};

const PortfolioPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    // Redirect from old "bordado-toalha" path to "bordado-toalha-banho"
    if (categoryPath === 'bordado-toalha') {
      navigate('/portfolio/bordado-toalha-banho', { replace: true });
      return;
    }
    
    setLoading(true);
    console.log("Categoria atual:", categoryPath);
    
    setTimeout(() => {
      // Start with empty collection
      let categoryItems: Product[] = [];
      
      // Handle specific categories first
      if (categoryPath === 'bordado-vestuario') {
        categoryItems = bordadoVestuarioProducts;
      } else if (categoryPath === 'bordado-infantis') {
        categoryItems = bordadosInfantisProducts;
      } else if (categoryPath === 'bordado-bone') {
        // Use the bonesProducts directly for this category
        categoryItems = bonesProducts;
      } else if (categoryPath === 'bordado-toalha-banho') {
        // Filter specifically for toalha de banho items
        categoryItems = bordadosProducts.filter(product => 
          product.type === 'portfolio' &&
          product.category === 'Bordado em Toalha de Banho'
        );
        
        // Also add products from allProducts with appropriate categories
        const additionalItems = allProducts.filter(product => 
          product.type === 'portfolio' &&
          (product.category === 'Bordado em Toalha de Banho' || 
           product.name.toLowerCase().includes('toalha de banho') ||
           product.category.toLowerCase().includes('toalha de banho'))
        );
        
        // Combine the items, removing duplicates based on id
        const combinedItems = [...categoryItems, ...additionalItems];
        const uniqueItems = Array.from(new Map(combinedItems.map(item => [item.id, item])).values());
        categoryItems = uniqueItems;
      } else {
        // For other categories, filter from allProducts
        const matchingCategory = PORTFOLIO_CATEGORIES[categoryPath] || '';
        
        if (matchingCategory) {
          // Filter products that match the mapped category
          categoryItems = allProducts.filter(product => 
            product.type === 'portfolio' &&
            (product.category === matchingCategory || 
             product.category.toLowerCase().includes(matchingCategory.toLowerCase()))
          );
        }
        
        // If no specific items found, try broader matching
        if (categoryItems.length === 0) {
          categoryItems = allProducts.filter(product => {
            const productCategory = product.category.toLowerCase();
            const searchTitle = categoryTitles[categoryPath]?.toLowerCase() || '';
            const searchPath = categoryPath.toLowerCase();
            
            return (
              product.type === 'portfolio' &&
              productCategory.includes('bordado') && 
              (productCategory.includes(searchPath) || 
               (searchTitle && productCategory.includes(searchTitle)))
            );
          });
        }
      }

      console.log("Itens encontrados:", categoryItems.length);
      setPortfolioItems(categoryItems);
      setFilteredItems(categoryItems);
      setLoading(false);
    }, 300);
  }, [location.pathname, categoryPath, navigate]);
  
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
