import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

// Sample portfolio data - in a real app this would come from an API
const allPortfolioItems: Record<string, PortfolioItem[]> = {
  'bordado-bone': [
    {
      id: 301,
      title: "Boné Personalizado Empresarial",
      description: "Bordado com logotipo empresarial, feito com linha de alta durabilidade.",
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Boné"
    },
    {
      id: 302,
      title: "Boné Esportivo Bordado",
      description: "Bordado com símbolos esportivos, perfeito para equipes e torcedores.",
      image: "https://images.unsplash.com/photo-1580880783109-4d9daf311df5?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Boné"
    }
  ],
  'bordado-necessaire': [
    {
      id: 310,
      title: "Necessaire Floral Bordada",
      description: "Bordado floral feito à mão, com detalhes em cores vibrantes.",
      image: "/lovable-uploads/7258c407-8a22-427b-a486-5e2bc2170d5f.png",
      category: "Bordado em Necessaire"
    },
    {
      id: 311,
      title: "Necessaire com Monograma",
      description: "Bordado elegante com monograma personalizado, ideal para presentes.",
      image: "https://images.unsplash.com/photo-1502741126161-b048400d085d?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Necessaire"
    }
  ],
  'bordado-bolsa': [
    {
      id: 320,
      title: "Bolsa Tote com Bordado",
      description: "Bolsa resistente com bordado personalizado, feita para o dia a dia.",
      image: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Bolsa"
    },
    {
      id: 321,
      title: "Bolsa de Praia Bordada",
      description: "Bordado temático marinho, ideal para dias de sol e mar.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Bolsa"
    }
  ],
  'bordado-jaleco': [
    {
      id: 330,
      title: "Jaleco Médico Personalizado",
      description: "Bordado com nome e especialidade, feito com tecido antimicrobiano.",
      image: "https://images.unsplash.com/photo-1524901548305-08eeddc35080?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Jaleco"
    },
    {
      id: 331,
      title: "Jaleco para Dentistas",
      description: "Modelo exclusivo com bordado personalizado para profissionais da odontologia.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Jaleco"
    }
  ],
  'bordado-infantis': [
    {
      id: 340,
      title: "Babador Bordado",
      description: "Bordado temático infantil, feito com material hipoalergênico.",
      image: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=500&auto=format&fit=crop",
      category: "Bordado Infantis"
    },
    {
      id: 341,
      title: "Manta Infantil Personalizada",
      description: "Bordado com nome da criança, feito com algodão macio.",
      image: "https://images.unsplash.com/photo-1616627561839-074385245934?q=80&w=500&auto=format&fit=crop",
      category: "Bordado Infantis"
    }
  ],
  'bordado-toalha-banho': [
    {
      id: 350,
      title: "Toalha de Banho Premium",
      description: "Bordado elegante em toalha de alta absorção e durabilidade.",
      image: "https://images.unsplash.com/photo-1585229259017-e527151ac558?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Toalha de Banho"
    },
    {
      id: 351,
      title: "Kit Toalhas Personalizadas",
      description: "Conjunto de toalhas com bordado uniforme, ideal para presentes.",
      image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e7?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Toalha de Banho"
    }
  ]
};

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'bordado-bone': 'Bordado em Boné',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Bordado em Jaleco',
  'bordado-infantis': 'Bordado Infantis',
  'bordado-toalha-banho': 'Bordado em Toalha de Banho'
};

// Gerador de mensagens personalizadas para WhatsApp
const generateWhatsAppMessage = (itemTitle: string): string => {
  return encodeURIComponent(`Olá! Vi o ${itemTitle.toLowerCase()} e gostaria de fazer um orçamento!`);
};

const PortfolioPage = () => {
  const location = useLocation();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Extract the category from the URL path
    const pathParts = location.pathname.split('/');
    const categoryPath = pathParts[pathParts.length - 1];
    
    // In a real application, this would be an API call
    setLoading(true);
    setTimeout(() => {
      const items = allPortfolioItems[categoryPath] || [];
      setPortfolioItems(items);
      setLoading(false);
    }, 500); // Simulate network request
  }, [location.pathname]);
  
  // Extract the category from the URL path for title
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;

  const whatsappNumber = "+5581995970776";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-10 md:py-16 bg-brand-light">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{categoryTitle}</h1>
          
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
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex flex-wrap items-center justify-between">
                      <span className="inline-block bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-sm mb-2">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <a 
                          href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(item.title)}`}
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
              <p className="text-lg text-gray-600">Nenhum item encontrado nesta categoria.</p>
              <Link to="/portfolio" className="inline-block mt-4 btn-primary">
                Voltar para o portfólio
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

export default PortfolioPage;
