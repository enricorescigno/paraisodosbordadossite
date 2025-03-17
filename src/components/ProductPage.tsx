
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  'pantufa': 'Pantufa',
  'bordado-bone': 'Bordado em Boné',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Bordado em Jaleco',
  'bordado-infantis': 'Bordado Infantil',
  'bordado-toalha-banho': 'Bordado em Toalha de Banho'
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
  
  useEffect(() => {
    // Extract the category from the URL path
    const pathParts = location.pathname.split('/');
    const categoryPath = pathParts[pathParts.length - 1];
    
    // In a real application, this would be an API call
    setLoading(true);
    setTimeout(() => {
      console.log("Current category path:", categoryPath);
      
      let categoryProducts: Product[] = [];
      
      // Special handling for mesa-cozinha category to ensure all products are included
      if (categoryPath === 'mesa-cozinha') {
        console.log("Processing mesa-cozinha category");
        
        // Filter out portfolio products from mesaCozinhaProducts
        categoryProducts = mesaCozinhaProducts.filter(p => 
          p.type === 'product' && 
          !p.category.toLowerCase().includes('bordado') && 
          !p.category.toLowerCase().includes('bonés')
        );
        
        console.log("Mesa-cozinha category - Products count:", categoryProducts.length);
        console.log("Products IDs:", categoryProducts.map(p => p.id).join(', '));
      } else {
        // Get the corresponding category name from the URL path
        const categoryName = CATEGORY_MAPPINGS[categoryPath] || categoryTitles[categoryPath] || '';
        
        // For other categories, filter normally
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
  }, [location.pathname]);
  
  // Extract the category from the URL path for title
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-16 md:py-24 bg-[#f5f5f7]">
        <div className="container-custom px-4">
          <PageHeader 
            title={categoryTitle}
            description={`Explore nossa coleção de ${categoryTitle.toLowerCase()} feitos com qualidade e atenção aos detalhes.`}
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
    </div>
  );
};

export default ProductPage;
