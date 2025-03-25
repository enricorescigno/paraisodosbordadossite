
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { AppleButton } from '@/components/ui/apple-button';
import { motion } from 'framer-motion';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Toaster } from 'sonner';

// Importing our product components
import ProductImageGallery from './product/ProductImageGallery';
import ProductFeatures from './product/ProductFeatures';
import ColorSelector from './product/ColorSelector';
import SizeSelector from './product/SizeSelector';
import QuantitySelector from './product/QuantitySelector';
import ProductNotFound from './product/ProductNotFound';
import ProductHeader from './product/ProductHeader';

/**
 * ProductDetailPage component
 * Displays detailed information about a product with Apple-inspired UI/UX
 */
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
      <Toaster position="top-center" />
      
      <main className="container-custom pt-24 pb-24 md:pb-16 px-3 md:px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0071E3]"></div>
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
              className="inline-flex items-center text-[#1D1D1F]/80 hover:text-[#0071E3] mb-6 transition-colors"
              aria-label={`Voltar para ${product.type === 'portfolio' ? 'o portfólio' : 'a loja'}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              {product.type === 'portfolio' ? 'Voltar para o portfólio' : 'Voltar para a loja'}
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
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
                
                {product.colors && product.colors.length > 0 && (
                  <ColorSelector 
                    colors={product.colors} 
                    selectedColor={selectedColor} 
                    onColorChange={setSelectedColor} 
                  />
                )}
                
                {product.sizes && product.sizes.length > 0 && (
                  <SizeSelector 
                    sizes={product.sizes} 
                    selectedSize={selectedSize} 
                    onSizeChange={setSelectedSize} 
                  />
                )}
                
                <QuantitySelector 
                  quantity={quantity} 
                  onIncrement={incrementQuantity} 
                  onDecrement={decrementQuantity} 
                />
                
                <ProductFeatures features={product.features || []} />
                
                {/* CTA Button - Desktop */}
                {!isMobile && (
                  <div className="mt-6 mb-10">
                    <a 
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full md:max-w-[320px]"
                      aria-label="Solicitar orçamento via WhatsApp"
                    >
                      <AppleButton 
                        size="lg" 
                        className="w-full h-14 rounded-lg flex items-center justify-center gap-2 bg-[#C00] hover:bg-[#B00] transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" aria-hidden="true" />
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
                <h2 className="text-2xl font-semibold mb-4 text-[#1D1D1F]">Descrição</h2>
                <p className="text-lg text-[#1D1D1F]/80 max-w-[95%]">{product.description}</p>
              </div>
            )}
          </motion.div>
        ) : (
          <ProductNotFound />
        )}
      </main>
      
      {/* Mobile Fixed CTA Button */}
      {isMobile && product && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-lg z-10">
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
            aria-label="Solicitar orçamento via WhatsApp"
          >
            <AppleButton 
              size="lg" 
              className="w-[95%] mx-auto h-14 rounded-lg flex items-center justify-center gap-2 bg-[#C00] hover:bg-[#B00] transition-colors"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
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
