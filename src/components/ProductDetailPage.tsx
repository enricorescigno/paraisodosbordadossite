
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { motion } from 'framer-motion';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useIsMobile } from '../hooks/use-mobile';
import { useScrollToTop } from '../hooks/useScrollToTop';

// Importing our components
import ProductGallery from './product-detail/ProductGallery';
import ProductInfo from './product-detail/ProductInfo';
import ProductDescription from './product-detail/ProductDescription';
import ProductNotFound from './product/ProductNotFound';
import AppleCtaButton from './product-detail/AppleCtaButton';

const ProductDetailPage = () => {
  const {
    product,
    loading,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    currentImages,
    getWhatsAppLink,
    getBackLink,
    placeholder
  } = useProductDetail();
  
  const isMobile = useIsMobile();
  useScrollToTop();
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 md:pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
          </div>
        ) : product ? (
          <motion.div 
            className="animate-scale-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Link 
              to={getBackLink()} 
              className="inline-flex items-center text-gray-600 hover:text-brand-red mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {product.type === 'portfolio' ? 'Voltar para o portfólio' : 'Voltar para a loja'}
            </Link>
            
            <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-2 gap-12'}`}>
              {isMobile ? (
                <>
                  <ProductGallery 
                    images={currentImages} 
                    productName={product.name} 
                    selectedColor={selectedColor}
                    placeholder={placeholder}
                    category={product.category}
                  />
                  
                  <ProductInfo 
                    product={product}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    quantity={quantity}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                  />
                  
                  <div className="mt-6 mb-10">
                    <AppleCtaButton 
                      href={getWhatsAppLink()}
                      isMobile={isMobile}
                    />
                  </div>
                  
                  <ProductDescription product={product} />
                </>
              ) : (
                <>
                  <div className="order-2 lg:order-1">
                    <ProductInfo 
                      product={product}
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                      quantity={quantity}
                      incrementQuantity={incrementQuantity}
                      decrementQuantity={decrementQuantity}
                    />
                    
                    <div className="mt-8 mb-10">
                      <AppleCtaButton 
                        href={getWhatsAppLink()}
                        isMobile={isMobile}
                      />
                    </div>
                    
                    <ProductDescription product={product} />
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <ProductGallery 
                      images={currentImages} 
                      productName={product.name} 
                      selectedColor={selectedColor}
                      placeholder={placeholder}
                      category={product.category}
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <ProductNotFound />
        )}
      </div>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default ProductDetailPage;
