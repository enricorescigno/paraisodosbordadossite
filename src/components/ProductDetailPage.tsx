
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useIsMobile } from '@/hooks/useMobile';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Toaster } from 'sonner';

// Importing our refactored components
import ProductImageGallery from './product/ProductImageGallery';
import ProductFeatures from './product/ProductFeatures';
import ProductNotFound from './product/ProductNotFound';
import ProductInfo from './product/ProductInfo';
import ProductPrice from './product/ProductPrice';
import ProductVariantSelector from './product/ProductVariantSelector';
import BuyButton from './product/BuyButton';

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
  
  // Prepare SEO data
  const getSeoDescription = () => {
    if (!product) return "";
    
    let description = product.shortDescription || product.description || "";
    
    if (product.features && product.features.length > 0) {
      description += ` Benefícios: ${product.features.slice(0, 3).join(', ')}.`;
    }
    
    return description.slice(0, 160); // Keep description under 160 chars
  };
  
  const getSeoImage = () => {
    if (!product) return "";
    
    // Use first image from gallery or main product image
    return (currentImages && currentImages.length > 0) 
      ? currentImages[0]
      : (product.images && product.images.length > 0 ? product.images[0] : '');
  };
  
  return (
    <div className="min-h-screen bg-white">
      {product && (
        <Helmet>
          <title>{product.name} | Paraíso dos Bordados</title>
          <meta name="description" content={getSeoDescription()} />
          
          {/* Open Graph tags */}
          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={getSeoDescription()} />
          <meta property="og:image" content={getSeoImage()} />
          <meta property="og:type" content="product" />
          
          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={product.name} />
          <meta name="twitter:description" content={getSeoDescription()} />
          <meta name="twitter:image" content={getSeoImage()} />
          
          {/* Additional product metadata */}
          {product.price && <meta property="product:price:amount" content={product.price.toString()} />}
          {product.category && <meta property="product:category" content={product.category} />}
          {product.isAvailable !== false && <meta property="product:availability" content="in stock" />}
        </Helmet>
      )}
      
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
                  images={currentImages || []} 
                  productName={product.name} 
                  selectedColor={selectedColor}
                  placeholder={placeholder}
                  category={product.category}
                />
              )}
              
              {/* Left column - Product Info (Desktop: Left, Mobile: Below image) */}
              <div className="flex flex-col">
                <ProductInfo product={product} />
                
                <ProductPrice product={product} />
                
                <ProductVariantSelector
                  product={product}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  quantity={quantity}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                />
                
                <ProductFeatures features={product.features || []} />
                
                {/* CTA Button - Desktop */}
                {!isMobile && <BuyButton getWhatsAppLink={getWhatsAppLink} isMobile={isMobile} />}
              </div>
              
              {/* Right column - Product Image (Desktop only) */}
              {!isMobile && (
                <ProductImageGallery 
                  images={currentImages || []} 
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
          <BuyButton getWhatsAppLink={getWhatsAppLink} isMobile={isMobile} />
        </div>
      )}
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default ProductDetailPage;
