
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

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
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Extract the category from the URL path
    const pathParts = location.pathname.split('/');
    const categoryPath = pathParts[pathParts.length - 1];
    
    // In a real application, this would be an API call
    setLoading(true);
    setTimeout(() => {
      const items = allPortfolioItems[categoryPath] || [];
      setPortfolioItems(items);
      setFilteredItems(items);
      setLoading(false);
    }, 500); // Simulate network request
  }, [location.pathname]);
  
  // Filter items based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(portfolioItems);
    } else {
      const filtered = portfolioItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, portfolioItems]);
  
  // Extract the category from the URL path for title
  const pathParts = location.pathname.split('/');
  const categoryPath = pathParts[pathParts.length - 1];
  const categoryTitle = categoryTitles[categoryPath] || categoryPath;

  const whatsappNumber = "+5581995970776";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-10 md:py-16 bg-[#f5f5f7]">
        <div className="container-custom">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">{categoryTitle}</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto">
              Explore nossa coleção de {categoryTitle.toLowerCase()} feitos com qualidade e atenção aos detalhes.
            </p>
            
            {/* Search Bar */}
            {portfolioItems.length > 2 && (
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder={`Buscar em ${categoryTitle}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="apple-input pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-brand-red focus:ring focus:ring-brand-red/20 transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="rounded-xl overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]"
                >
                  <Link to={`/produto/${item.id}`} className="block">
                    <AspectRatio ratio={4/3} className="relative bg-[#f5f5f7]">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          // Fallback image based on category
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite loop
                          target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.category)}`;
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </AspectRatio>
                  </Link>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <a 
                        href={`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage(item.title)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-brand-red flex items-center gap-1 transition-all duration-300 hover:translate-x-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Solicitar orçamento</span>
                      </a>
                      <Link 
                        to={`/produto/${item.id}`}
                        className="text-brand-dark hover:text-brand-red transition-all duration-300 hover:translate-x-1"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
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
          
          {/* Navigation arrows (for carousel on desktop) */}
          {filteredItems.length > 3 && (
            <div className="hidden lg:flex justify-between mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
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
