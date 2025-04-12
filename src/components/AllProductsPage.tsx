
import { useState, useEffect } from 'react';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useIsMobile } from '../hooks/use-mobile';
import { products } from '../utils/searchUtils';
import { bonesProducts } from '../utils/productUtils';
import PageHeader from './common/PageHeader';
import LoadingSpinner from './common/LoadingSpinner';
import EmptyState from './common/EmptyState';
import ProductsCarousel from './product/ProductsCarousel';
import BrowseByCategory from './common/BrowseByCategory';

const AllProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allProductsList, setAllProductsList] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('bones');  // Default to bones instead of mesa-cozinha
  const isMobile = useIsMobile();
  const whatsappNumber = "+5581995970776";
  
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

  // Filter products based on active category
  useEffect(() => {
    if (allProductsList.length === 0) return;
    
    // Since we only have bonés products now, just show those
    if (activeCategory === 'bones') {
      setFilteredProducts(bonesProducts);
    } else {
      // For other categories (which shouldn't be accessible anymore)
      setFilteredProducts([]);
    }
  }, [activeCategory, allProductsList]);
  
  return (
    <div className="min-h-screen bg-white">
      <section className={`py-16 md:py-24 bg-[#f5f5f7] ${isMobile ? 'pt-24' : 'pt-20'}`}>
        <div className="container-custom">
          <PageHeader 
            title="Nossos Produtos"
            description="Explore nossa coleção de produtos feitos com qualidade e atenção aos detalhes."
          />
          
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
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default AllProductsPage;
