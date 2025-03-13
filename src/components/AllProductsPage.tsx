
import { useState, useEffect } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { products } from '../utils/searchUtils';
import { useIsMobile } from '../hooks/use-mobile';

const AllProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    setTimeout(() => {
      // Filter only products (not portfolio items)
      const productItems = products.filter(product => product.type === 'product');
      setAllProducts(productItems);
      setLoading(false);
    }, 300); // Simulate network request
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className={`py-10 md:py-16 bg-brand-light ${isMobile ? 'pt-20' : ''}`}>
        <div className="container-custom">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-6">Todos os Produtos</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : allProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {allProducts.map((product) => (
                <div key={product.id} className="product-card bg-white rounded-lg overflow-hidden shadow-md animate-scale-in">
                  <Link to={`/produto/${product.id}`} className="block">
                    <div className="relative overflow-hidden aspect-square">
                      <img 
                        src={product.imageUrl || "https://via.placeholder.com/300x300?text=Sem+Imagem"} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-brand-red text-white text-xs px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-3 md:p-4">
                    <div className="flex items-center gap-1 mb-1 md:mb-2">
                      <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs md:text-sm text-gray-700">4.8</span>
                    </div>
                    <h3 className="font-medium text-sm md:text-lg mb-2 md:mb-3 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-600">Solicite um orçamento</span>
                      <Link 
                        to={`/produto/${product.id}`}
                        className="text-brand-dark hover:text-brand-red transition-colors duration-300"
                      >
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">Nenhum produto encontrado.</p>
              <Link to="/" className="inline-block mt-4 btn-primary">
                Voltar para página inicial
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default AllProductsPage;
