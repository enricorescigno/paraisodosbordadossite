
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { products } from '../utils/searchUtils';
import { mesaCozinhaProducts } from '../utils/categoryProducts';
import PageHeader from './common/PageHeader';
import CategoryTabs from './common/CategoryTabs';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';

const AllProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allProductsList, setAllProductsList] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('mesa-cozinha');  // Default to mesa-cozinha
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  
  // Extract unique categories for filtering - excluding "all"
  const categories = [...new Set(['banho', 'jaleco', 'infantil', 'cama', 'mesa-cozinha', 'pantufas'])];

  // Function to get category display name
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'cama': 'Cama',
      'mesa-cozinha': 'Mesa-cozinha',
      'banho': 'Banho',
      'infantil': 'Infantil',
      'pantufas': 'Pantufas',
      'jaleco': 'Jaleco'
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  // Load all products
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Get all products (excluding portfolio items)
      let productItems = products.filter(product => 
        product.type === 'product' && 
        !product.category.toLowerCase().includes('bordado') && 
        !product.category.toLowerCase().includes('bonés')
      );
      
      setAllProductsList(productItems);
      setLoading(false);
    }, 300);
  }, []);

  // Filter products based on active category with special handling for mesa-cozinha
  useEffect(() => {
    if (allProductsList.length === 0) return;
    
    let result: any[] = [];
    
    // Special handling for mesa-cozinha to ensure product 204 is included
    if (activeCategory === 'mesa-cozinha') {
      // Get products for this category (excluding product 204)
      const regularProducts = allProductsList.filter(product => 
        (product.category.toLowerCase().includes('mesa') || 
        product.category.toLowerCase().includes('cozinha')) &&
        Number(product.id) !== 204
      );
      
      // Get product 204 directly from mesaCozinhaProducts
      const product204 = mesaCozinhaProducts.find(p => Number(p.id) === 204);
      
      if (product204) {
        // Put product 204 at the beginning
        result = [product204, ...regularProducts];
      } else {
        result = regularProducts;
      }
    } else {
      // For other categories, filter normally
      result = allProductsList.filter(product => {
        const productCategory = product.category.toLowerCase();
        const searchCategory = activeCategory.toLowerCase();
        
        return productCategory.includes(searchCategory) || 
               searchCategory.includes(productCategory);
      });
    }
    
    setFilteredProducts(result);
  }, [activeCategory, allProductsList]);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className={`py-16 md:py-24 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
        <div className="container-custom">
          <PageHeader 
            title="Nossos Produtos"
            description="Explore nossa coleção de produtos feitos com qualidade e atenção aos detalhes."
          />
          
          <CategoryTabs 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            getCategoryDisplayName={getCategoryDisplayName}
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
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default AllProductsPage;
