
import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { products } from '../utils/searchUtils';

// Gerador de mensagens personalizadas para WhatsApp
const generateWhatsAppMessage = (itemTitle: string): string => {
  return encodeURIComponent(`Olá! Vi o ${itemTitle.toLowerCase()} e gostaria de fazer um orçamento!`);
};

const AllPortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, this would be an API call
    setLoading(true);
    setTimeout(() => {
      // Filter only portfolio items
      const portfolioProducts = products.filter(product => product.type === 'portfolio');
      setPortfolioItems(portfolioProducts);
      setLoading(false);
    }, 300); // Simulate network request
  }, []);
  
  const whatsappNumber = "+5581995970776";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-10 md:py-16 bg-brand-light">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Portfólio de Bordados</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : portfolioItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow animate-scale-in">
                  <Link to={`/produto/${item.id}`} className="block">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={item.imageUrl || "https://via.placeholder.com/300x240?text=Sem+Imagem"} 
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    <h3 className="font-semibold text-xl mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex flex-wrap items-center justify-between">
                      <span className="inline-block bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-sm mb-2">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(item.name)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-brand-red flex items-center gap-1"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Solicitar orçamento
                        </a>
                        <Link 
                          to={`/produto/${item.id}`}
                          className="text-brand-dark hover:text-brand-red transition-colors duration-300"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">Nenhum item de portfólio encontrado.</p>
              <Link to="/" className="inline-block mt-4 btn-primary">
                Voltar para o início
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

export default AllPortfolioPage;
