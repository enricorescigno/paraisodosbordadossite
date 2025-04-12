
import { useState, useEffect } from 'react';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { products } from '../utils/searchUtils';
import PageHeader from './common/PageHeader';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';
import BrowseByCategory from './common/BrowseByCategory';
import { Skeleton } from './ui/skeleton';

const AllProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [allProductsList, setAllProductsList] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('infantil');  // Changed from 'pantufa' to 'infantil'
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  
  // Load all products with improved loading states for better UX
  useEffect(() => {
    setLoading(true);
    
    // Show skeleton loader initially
    let initialTimer: number;
    if (initialLoading) {
      initialTimer = window.setTimeout(() => {
        setInitialLoading(false);
      }, 300);
    }
    
    // Load products with minimal delay for better UX
    const timer = setTimeout(() => {
      // Get all products (excluding portfolio items)
      let productItems = products.filter(product => 
        product.type === 'product' && 
        !product.category.toLowerCase().includes('bordado') && 
        !product.category.toLowerCase().includes('bonés')
      );
      
      setAllProductsList(productItems);
      setLoading(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
      if (initialTimer) clearTimeout(initialTimer);
    };
  }, [initialLoading]);

  // Filter products based on active category
  useEffect(() => {
    if (allProductsList.length === 0) return;
    
    let result: any[] = [];
    
    // Filter by the selected category
    if (activeCategory === 'infantil') {
      // Special case for infantil to exclude "Kit Infantil Bordado"
      result = allProductsList.filter(product => {
        const productCategory = product.category.toLowerCase();
        return productCategory.includes('infantil') && 
               !product.name.toLowerCase().includes('kit infantil bordado');
      });
    } else {
      result = allProductsList.filter(product => {
        const productCategory = product.category.toLowerCase();
        const searchCategory = activeCategory.toLowerCase();
        
        // Normalize category names for matching
        if (searchCategory === 'mesa-cozinha') {
          return productCategory.includes('mesa') || productCategory.includes('cozinha');
        } else if (searchCategory === 'tapete-cortinas') {
          return productCategory.includes('tapete') || productCategory.includes('cortina');
        }
        
        return productCategory.includes(searchCategory) || 
               searchCategory.includes(productCategory);
      });
    }
    
    setFilteredProducts(result);
  }, [activeCategory, allProductsList]);
  
  // Skeleton for initial loading
  const renderLoadingSkeleton = () => (
    <div className={`py-16 md:py-24 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
      <div className="container-custom">
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
    <div className="min-h-screen bg-white">
      {initialLoading ? (
        renderLoadingSkeleton()
      ) : (
        <section className={`py-16 md:py-24 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
          <div className="container-custom">
            <PageHeader 
              title="Nossos Produtos"
              description="Explore nossa coleção de produtos feitos com qualidade e atenção aos detalhes."
            />
            
            {/* Using only the category icons menu */}
            <BrowseByCategory 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
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
                buttonText="Voltar para página inicial"
                buttonLink="/"
              />
            )}
          </div>
        </section>
      )}
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default AllProductsPage;
