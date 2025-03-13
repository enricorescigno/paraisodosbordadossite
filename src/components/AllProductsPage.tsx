
import { useState, useEffect } from 'react';
import { ArrowRight, Star, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { products } from '../utils/searchUtils';
import { useIsMobile } from '../hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AllProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);
    setTimeout(() => {
      // Filter only products (not portfolio items)
      const productItems = products.filter(product => product.type === 'product');
      setAllProducts(productItems);
      setFilteredProducts(productItems);
      setLoading(false);
    }, 300); // Simulate network request
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let result = [...allProducts];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter(product => 
        product.category.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [searchQuery, activeCategory, allProducts]);

  // Extract unique categories for filtering
  const categories = ['all', ...new Set(allProducts.map(product => 
    product.category.split(',')[0].trim().toLowerCase()
  ))];

  // Function to get category display name
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'all': 'Todos',
      'cama': 'Cama',
      'mesa': 'Mesa',
      'banho': 'Banho',
      'infantil': 'Infantil',
      'vestuário': 'Vestuário',
      'bordado': 'Bordado'
    };
    
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className={`py-10 md:py-16 bg-[#f5f5f7] ${isMobile ? 'pt-20' : ''}`}>
        <div className="container-custom">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center">Todos os Produtos</h1>
            <p className="text-center text-gray-500 max-w-2xl mx-auto">
              Explore nossa coleção de produtos de bordados feitos com qualidade e atenção aos detalhes.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="apple-input pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-brand-red focus:ring focus:ring-brand-red/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="mb-8 justify-center flex flex-col items-center">
            <TabsList className="bg-transparent overflow-x-auto py-2 w-auto flex flex-nowrap">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-4 py-2 rounded-full data-[state=active]:bg-brand-red data-[state=active]:text-white"
                >
                  {getCategoryDisplayName(category)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="rounded-xl overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:scale-[1.01]"
                >
                  <Link to={`/produto/${product.id}`} className="block">
                    <AspectRatio ratio={1/1} className="relative bg-[#f5f5f7]">
                      <img 
                        src={product.imageUrl || "https://via.placeholder.com/300x300?text=Sem+Imagem"} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {product.isNew && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full font-medium">
                            Novo
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </AspectRatio>
                  </Link>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">4.8</span>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-3 line-clamp-2">{product.name}</h3>
                    
                    {/* Color variants (if applicable) */}
                    {product.colors && (
                      <div className="flex gap-1.5 mb-3">
                        {product.colors.map((color: string, index: number) => (
                          <div 
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-600">Solicite um orçamento</span>
                      <Link 
                        to={`/produto/${product.id}`}
                        className="text-brand-dark hover:text-brand-red transition-colors duration-300"
                      >
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
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
          
          {/* Navigation arrows (for carousel on desktop) */}
          {filteredProducts.length > 4 && !isMobile && (
            <div className="flex justify-between mt-8">
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

export default AllProductsPage;
