
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { allProducts } from '../utils/productUtils';
import { Product } from '../types/product';
import { useScrollToTop } from '../hooks/useScrollToTop';
import PageHeader from './common/PageHeader';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';
import BrowseByCategory from './common/BrowseByCategory';

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'banho': 'Banho',
  'pantufa': 'Pantufa'
};

// Mapping from URL paths to product categories
const CATEGORY_MAPPINGS: Record<string, string> = {
  'banho': 'Banho',
  'pantufa': 'Pantufa',
};

const ProductPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const whatsappNumber = "+5581995970776";
  useScrollToTop();
  
  // Extract the category from the URL path for title and active category
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Get the corresponding category name from the URL path
      const categoryName = CATEGORY_MAPPINGS[categoryPath] || categoryTitles[categoryPath] || '';
      
      // Filter for products in this category, excluding portfolio items
      const categoryProducts = allProducts.filter(product => 
        product.type === 'product' && 
        !product.category.toLowerCase().includes('bordado') && 
        !product.category.toLowerCase().includes('bonés') &&
        (product.category === categoryName || 
          product.category.toLowerCase().includes(categoryName.toLowerCase()) ||
          categoryName.toLowerCase().includes(product.category.toLowerCase()))
      );
      
      // If still no products found, try partial matching
      let finalProducts = categoryProducts;
      if (categoryProducts.length === 0) {
        finalProducts = allProducts.filter(product => 
          product.type === 'product' && 
          !product.category.toLowerCase().includes('bordado') && 
          !product.category.toLowerCase().includes('bonés') &&
          (categoryPath.includes(product.category.toLowerCase().replace(/\s+/g, '-')) ||
            product.category.toLowerCase().includes(categoryPath.replace(/-/g, ' ')))
        );
      }
      
      setProducts(finalProducts);
      setFilteredProducts(finalProducts);
      setLoading(false);
    }, 500);
  }, [location.pathname, categoryPath]);

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="py-12 md:py-20 bg-[#f5f5f7]">
        <div className="container-custom px-4">
          <PageHeader 
            title={categoryTitle}
            description={`Explore nossa coleção de ${categoryTitle.toLowerCase()} feitos com qualidade e atenção aos detalhes.`}
          />
          
          {/* Show only the product categories */}
          <BrowseByCategory 
            activeCategory={categoryPath}
            showOnlyProducts={true}
          />
          
          {loading ? (
            <LoadingSpinner />
          ) : filteredProducts.length > 0 ? (
            <ProductsCarousel 
              products={filteredProducts}
              whatsappNumber={whatsappNumber}
            />
          ) : (
            <EmptyState 
              message="Nenhum produto encontrado nesta categoria."
              buttonText="Ver todos os produtos"
              buttonLink="/produtos"
            />
          )}
        </div>
      </section>
      
      <Footer />
      <WhatsAppSupport />
    </motion.div>
  );
};

export default ProductPage;

