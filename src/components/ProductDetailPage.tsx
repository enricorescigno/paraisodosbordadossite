
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { AppleButton } from '@/components/ui/apple-button';
import { motion } from 'framer-motion';
import { useProductDetail } from '@/hooks/useProductDetail';

// Importing our new components
import ProductImageGallery from './product/ProductImageGallery';
import ProductFeatures from './product/ProductFeatures';
import ColorSelector from './product/ColorSelector';
import SizeSelector from './product/SizeSelector';
import QuantitySelector from './product/QuantitySelector';
import ProductBenefits from './product/ProductBenefits';
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container-custom pt-24 pb-16">
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
          </div>
        ) : product ? (
          <div className="animate-scale-in">
            <Link 
              to={getBackLink()} 
              className="inline-flex items-center text-gray-600 hover:text-brand-red mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {product.type === 'portfolio' ? 'Voltar para o portfólio' : 'Voltar para a loja'}
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <ProductImageGallery 
                images={currentImages} 
                productName={product.name} 
                selectedColor={selectedColor}
                placeholder={placeholder}
                category={product.category}
              />
              
              <div className="flex flex-col justify-center">
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
                
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-10"
                >
                  <AppleButton 
                    size="lg" 
                    className="w-full rounded-lg flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red/90"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Solicitar Orçamento
                  </AppleButton>
                </a>
                
                <ProductBenefits />
              </div>
            </div>
          </div>
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
