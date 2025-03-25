import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { allProducts } from '../utils/productUtils';
import { mesaCozinhaProducts } from '../utils/categoryProducts';
import { Product } from '../types/product';
import { useScrollToTop } from '../hooks/useScrollToTop';
import PageHeader from './common/PageHeader';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';
import BrowseByCategory from './common/BrowseByCategory';

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'cama-mesa-banho': 'Cama, Mesa e Banho',
  'cama': 'Cama',
  'mesa-cozinha': 'Mesa e Cozinha',
  'tapete-cortinas': 'Tapete e Cortinas',
  'banho': 'Banho',
  'infantil': 'Infantil',
  'vestuario': 'Vestuário',
  'camisa': 'Camisa',
  'jaleco': 'Jaleco',
  'pantufa': 'Pantufa'
};

// Mapping from URL paths to product categories
const CATEGORY_MAPPINGS: Record<string, string> = {
  'cama-mesa-banho': 'Cama, Mesa e Banho',
  'cama': 'Cama',
  'mesa-cozinha': 'Mesa e Cozinha',
  'tapete-cortinas': 'Tapete e Cortinas',
  'banho': 'Banho',
  'infantil': 'Infantil',
  'vestuario': 'Vestuário',
  'camisa': 'Camisa',
  'jaleco': 'Jaleco',
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
      let categoryProducts: Product[] = [];
      
      // Special handling for mesa-cozinha category to ensure product 204 is included
      if (categoryPath === 'mesa-cozinha') {
        // Certifique-se de incluir apenas produtos reais, não de portfólio
        let regularProducts = allProducts.filter(p => 
          p.type === 'product' && 
          !p.category.toLowerCase().includes('bordado') && 
          !p.category.toLowerCase().includes('bonés') &&
          (p.category.toLowerCase().includes('mesa') || 
           p.category.toLowerCase().includes('cozinha')) && 
          Number(p.id) !== 204
        );
        
        // Obter o produto 204 do array mesaCozinhaProducts
        const product204 = mesaCozinhaProducts.find(p => Number(p.id) === 204);
        
        if (product204) {
          categoryProducts = [product204, ...regularProducts];
        } else {
          categoryProducts = regularProducts;
        }
      } else {
        // Get the corresponding category name from the URL path
        const categoryName = CATEGORY_MAPPINGS[categoryPath] || categoryTitles[categoryPath] || '';
        
        // For other categories, filter normally, excluding portfolio items
        categoryProducts = allProducts.filter(product => 
          product.type === 'product' && 
          !product.category.toLowerCase().includes('bordado') && 
          !product.category.toLowerCase().includes('bonés') &&
          (product.category === categoryName || 
           product.category.toLowerCase().includes(categoryName.toLowerCase()) ||
           categoryName.toLowerCase().includes(product.category.toLowerCase()))
        );
        
        // If still no products found, try partial matching
        if (categoryProducts.length === 0) {
          categoryProducts = allProducts.filter(product => 
            product.type === 'product' && 
            !product.category.toLowerCase().includes('bordado') && 
            !product.category.toLowerCase().includes('bonés') &&
            (categoryPath.includes(product.category.toLowerCase().replace(/\s+/g, '-')) ||
             product.category.toLowerCase().includes(categoryPath.replace(/-/g, ' ')))
          );
        }
      }
      
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
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
      <Navbar />
      
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
