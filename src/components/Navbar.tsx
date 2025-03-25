
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import MenubarNav from './MenubarNav';
import SearchBox from './SearchBox';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const [openCategories, setOpenCategories] = useState(false);
  const [openPortfolio, setOpenPortfolio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn("z-50 sticky top-0 left-0 right-0 w-full max-w-full overflow-x-hidden transition-all duration-300", 
      isScrolled ? "backdrop-blur-xl bg-white/90 shadow-sm" : "backdrop-blur-none bg-white")}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <nav className="h-16 flex items-center justify-between w-full max-w-full">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/1b6b8029-a368-4270-a444-57d4aab3676e.png" 
                alt="Paraíso dos Bordados" 
                className="h-14 w-auto" 
              />
            </Link>
            
            {!isMobile && <MenubarNav />}
          </div>

          <div className="flex items-center gap-4">
            {!isMobile && (
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300" 
                aria-label="Buscar"
              >
                <Search className="h-5 w-5 text-brand-dark" />
              </button>
            )}
            
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-100" 
                    aria-label="Menu"
                  >
                    <Menu className="h-5 w-5 text-brand-dark" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full h-full sm:w-[350px] p-4 max-w-full overflow-y-auto">
                  <div className="flex justify-end">
                    <SheetClose className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-100">
                      <X className="h-5 w-5 text-brand-dark" />
                    </SheetClose>
                  </div>
                  <div className="flex flex-col gap-6 mt-2">
                    <div className="mb-4">
                      <SearchBox onClose={() => {}} showCloseButton={false} />
                    </div>
                    <div className="space-y-1 max-w-full">
                      <Link 
                        to="/" 
                        className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium"
                      >
                        Início
                      </Link>
                      
                      <Collapsible 
                        open={openCategories} 
                        onOpenChange={setOpenCategories}
                        className="w-full"
                      >
                        <CollapsibleTrigger className="flex justify-between items-center w-full py-3 px-4 hover:bg-gray-100 rounded-md font-medium text-left">
                          <span>Categorias</span>
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openCategories ? "rotate-180" : ""
                          )} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 py-2 space-y-2">
                          <h3 className="px-4 pt-2 font-medium text-gray-900">Cama, Mesa e Banho</h3>
                          <Link 
                            to="/categoria/cama" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Cama
                          </Link>
                          <Link 
                            to="/categoria/mesa-cozinha" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Mesa e Cozinha
                          </Link>
                          <Link 
                            to="/categoria/tapete-cortinas" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Tapete e Cortinas
                          </Link>
                          <Link 
                            to="/categoria/banho" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Banho
                          </Link>
                          
                          <h3 className="px-4 pt-3 font-medium text-gray-900">Outras Categorias</h3>
                          <Link 
                            to="/categoria/infantil" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Infantil
                          </Link>
                          <Link 
                            to="/categoria/vestuario" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Vestuário
                          </Link>
                          
                          <div className="px-4 pt-3 pb-1">
                            <Link to="/produtos" className="text-brand-red text-sm font-medium hover:text-brand-red/80 transition-colors">
                              Ver Todos os Produtos →
                            </Link>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      
                      <Collapsible 
                        open={openPortfolio} 
                        onOpenChange={setOpenPortfolio}
                        className="w-full"
                      >
                        <CollapsibleTrigger className="flex justify-between items-center w-full py-3 px-4 hover:bg-gray-100 rounded-md font-medium text-left">
                          <span>Portfólio</span>
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openPortfolio ? "rotate-180" : ""
                          )} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 py-2 space-y-2">
                          <Link 
                            to="/portfolio/bordado-bone" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Bordado em Boné
                          </Link>
                          <Link 
                            to="/portfolio/bordado-necessaire" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Bordado em Necessaire
                          </Link>
                          <Link 
                            to="/portfolio/bordado-bolsa" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Bordado em Bolsa
                          </Link>
                          <Link 
                            to="/portfolio/bordado-jaleco" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Bordado em Jaleco
                          </Link>
                          <Link 
                            to="/portfolio/bordado-infantis" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Bordado Infantis
                          </Link>
                          <Link 
                            to="/portfolio/bordado-toalha-banho" 
                            className="block py-2 px-4 hover:bg-gray-100 rounded-md text-sm"
                          >
                            Bordado em Toalha de Banho
                          </Link>
                          
                          <div className="px-4 pt-3 pb-1">
                            <Link to="/portfolio" className="text-brand-red text-sm font-medium hover:text-brand-red/80 transition-colors">
                              Ver Todo o Portfólio →
                            </Link>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      
                      <Link 
                        to="/sobre" 
                        className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium"
                      >
                        Sobre Nós
                      </Link>
                      
                      <Link 
                        to="/nossos-parceiros" 
                        className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium"
                      >
                        Parceiros
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </nav>
        
        {!isMobile && (
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                transition={{ duration: 0.2 }} 
                className="py-3 max-w-full"
              >
                <SearchBox onClose={() => setIsSearchOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
  );
};

export default Navbar;
