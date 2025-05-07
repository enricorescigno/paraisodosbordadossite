
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
import { Skeleton } from './ui/skeleton';

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'banho': 'Banho',
  'cama': 'Cama',
  'mesa-cozinha': 'Mesa e Cozinha',
  'tapete-cortinas': 'Tapete e Cortinas',
  'infantil': 'Infantil',
  'vestuario': 'Vestuário'
};

// Mapping from URL paths to product categories
const CATEGORY_MAPPINGS: Record<string, string> = {
  'banho': 'Banho',
  'cama': 'Cama',
  'mesa-cozinha': 'Mesa e Cozinha',
  'tapete-cortinas': 'Tapete e Cortinas',
  'infantil': 'Infantil',
  'vestuario': 'Vestuário'
};

// Category filter map: defines what filters to apply for each URL category path
const CATEGORY_FILTERS: Record<string, (product: Product) => boolean> = {
  'mesa-cozinha': (product) => (
    product.type === 'product' && 
    !product.category.toLowerCase().includes('bordado') && 
    !product.category.toLowerCase().includes('bonés') &&
    (product.category.toLowerCase().includes('mesa') || 
     product.category.toLowerCase().includes('cozinha'))
  ),
  'tapete-cortinas': (product) => (
    product.type === 'product' && 
    !product.category.toLowerCase().includes('bordado') && 
    !product.category.toLowerCase().includes('bonés') &&
    (product.category.toLowerCase().includes('tapete') || 
     product.category.toLowerCase().includes('cortina'))
  ),
  'infantil': (product) => (
    product.type === 'product' && 
    !product.category.toLowerCase().includes('bordado') && 
    !product.category.toLowerCase().includes('bonés') &&
    product.category.toLowerCase().includes('infantil') &&
    !product.name.toLowerCase().includes('kit infantil bordado')
  ),
  'vestuario': (product) => (
    product.type === 'product' && 
    !product.category.toLowerCase().includes('bordado') && 
    !product.category.toLowerCase().includes('bonés') &&
    product.category.toLowerCase().includes('vestuário')
  )
};

const ProductPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const whatsappNumber = "+5581995970776";
  useScrollToTop();
  
  // Extract the category from the URL path for title and active category
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;
  
  useEffect(() => {
    // Show immediate UI feedback
    setLoading(true);
    
    // Simulate faster initial loading with a skeleton
    let initialTimer: number;
    if (initialLoading) {
      initialTimer = window.setTimeout(() => {
        setInitialLoading(false);
      }, 300);
    }
    
    // Fetch products with a minimal delay for better UX
    const loadProducts = () => {
      // Get the corresponding category name from the URL path
      const categoryName = CATEGORY_MAPPINGS[categoryPath] || categoryTitles[categoryPath] || '';
      
      // Find the appropriate filter for this category or create a default one
      const categoryFilter = CATEGORY_FILTERS[categoryPath] || ((product: Product) => (
        product.type === 'product' && 
        !product.category.toLowerCase().includes('bordado') && 
        !product.category.toLowerCase().includes('bonés') &&
        (product.category === categoryName || 
          product.category.toLowerCase().includes(categoryName.toLowerCase()) ||
          categoryName.toLowerCase().includes(product.category.toLowerCase()))
      ));
      
      // Apply the filter
      const categoryProducts = allProducts.filter(categoryFilter);
      
      // If still no products found, try partial matching as a fallback
      const finalProducts = categoryProducts.length === 0 ? 
        allProducts.filter(product => 
          product.type === 'product' && 
          !product.category.toLowerCase().includes('bordado') && 
          !product.category.toLowerCase().includes('bonés') &&
          (categoryPath.includes(product.category.toLowerCase().replace(/\s+/g, '-')) ||
            product.category.toLowerCase().includes(categoryPath.replace(/-/g, ' ')))
        ) : categoryProducts;
      
      // Add console logging to help debug
      console.log(`Category path: ${categoryPath}, Category name: ${categoryName}`);
      console.log(`Found ${finalProducts.length} products for category ${categoryName}`);
      
      // Make sure each product has an images array
      const productsWithImages = finalProducts.map(product => {
        if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
          return {
            ...product,
            images: [`/lovable-uploads/${product.id}.png`]
          };
        }
        return product;
      });
      
      setProducts(productsWithImages);
      setFilteredProducts(productsWithImages);
      setLoading(false);
    };
    
    // Execute with slight delay to let initial render complete
    const timer = window.setTimeout(loadProducts, 300);
    
    return () => {
      window.clearTimeout(timer);
      if (initialTimer) window.clearTimeout(initialTimer);
    };
  }, [location.pathname, categoryPath, initialLoading]);

  // Skeleton for initial loading
  const renderLoadingSkeleton = () => (
    <div className="py-12 md:py-20 bg-[#f5f5f7]">
      <div className="container-custom px-4">
        <div className="mx-auto text-center max-w-lg mb-8">
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-5 w-full mx-auto" />
        </div>
        
        <div className="mx-auto max-w-xl mb-10">
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {initialLoading ? (
        renderLoadingSkeleton()
      ) : (
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
      )}
      
      <Footer />
      <WhatsAppSupport />
    </motion.div>
  );
};

export default ProductPage;
