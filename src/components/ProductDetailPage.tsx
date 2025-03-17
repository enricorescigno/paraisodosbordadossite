
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { AppleButton } from '@/components/ui/apple-button';
import { motion } from 'framer-motion';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useIsMobile } from '../hooks/use-mobile';
import { useScrollToTop } from '../hooks/useScrollToTop';

// Importing our product components
import ProductImageGallery from './product/ProductImageGallery';
import ProductFeatures from './product/ProductFeatures';
import ColorSelector from './product/ColorSelector';
import SizeSelector from './product/SizeSelector';
import QuantitySelector from './product/QuantitySelector';
import ProductNotFound from './product/ProductNotFound';
import ProductHeader from './product/ProductHeader';

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
      
      <div className="container-custom pt-24 pb-24 md:pb-16 px-4">
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
          </div>
        ) : product ? (
          <motion.div 
            className="animate-scale-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to={getBackLink()} 
              className="inline-flex items-center text-gray-600 hover:text-brand-red mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {product.type === 'portfolio' ? 'Voltar para o portfólio' : 'Voltar para a loja'}
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Mobile: Image gallery on top */}
              {isMobile && (
                <ProductImageGallery 
                  images={currentImages} 
                  productName={product.name} 
                  selectedColor={selectedColor}
                  placeholder={placeholder}
                  category={product.category}
                />
              )}
              
              {/* Left column - Product Info (Desktop: Left, Mobile: Below image) */}
              <div className="flex flex-col">
                <ProductHeader product={product} />
                
                <ProductFeatures features={product.features || []} />
                
                <ColorSelector 
                  colors={product.colors || []} 
                  selectedColor={selectedColor} 
                  onColorChange={setSelectedColor} 
                />
                
                <SizeSelector 
                  sizes={product.sizes || []} 
                  selectedSize={selectedSize} 
                  onSizeChange={setSelectedSize} 
                />
                
                <QuantitySelector 
                  quantity={quantity} 
                  onIncrement={incrementQuantity} 
                  onDecrement={decrementQuantity} 
                />
                
                {/* CTA Button - Desktop */}
                {!isMobile && (
                  <div className="mt-6 mb-10">
                    <a 
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full md:max-w-[320px]"
                    >
                      <AppleButton 
                        size="lg" 
                        className="w-full h-14 rounded-lg flex items-center justify-center gap-2 bg-[#C32E2E] hover:bg-[#990000] transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Solicitar Orçamento
                      </AppleButton>
                    </a>
                  </div>
                )}
              </div>
              
              {/* Right column - Product Image (Desktop only) */}
              {!isMobile && (
                <ProductImageGallery 
                  images={currentImages} 
                  productName={product.name} 
                  selectedColor={selectedColor}
                  placeholder={placeholder}
                  category={product.category}
                />
              )}
            </div>
            
            {/* Product Description - Full width below */}
            {product.description && (
              <div className="mt-12 border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-semibold mb-4">Descrição</h2>
                <p className="text-lg text-gray-700">{product.description}</p>
              </div>
            )}
          </motion.div>
        ) : (
          <ProductNotFound />
        )}
      </div>
      
      {/* Mobile Fixed CTA Button */}
      {isMobile && product && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-lg z-10">
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <AppleButton 
              size="lg" 
              className="w-[90%] mx-auto h-14 rounded-lg flex items-center justify-center gap-2 bg-[#C32E2E] hover:bg-[#990000] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar Orçamento
            </AppleButton>
          </a>
        </div>
      )}
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default ProductDetailPage;
