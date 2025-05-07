
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import MenubarNav from './MenubarNav';
import SearchBox from './SearchBox';
import { useIsMobile } from '@/hooks/useMobile';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn("z-50 sticky top-0 left-0 right-0 w-full transition-all duration-300", 
      isScrolled ? "backdrop-blur-xl bg-white/90 shadow-sm" : "backdrop-blur-none bg-white")}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <nav className="h-16 flex items-center justify-between" role="navigation" aria-label="Navegação principal">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/1b6b8029-a368-4270-a444-57d4aab3676e.png" 
                alt="Paraíso dos Bordados" 
                className="h-14 w-auto"
                loading="lazy"
                decoding="async"
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
                aria-expanded={isSearchOpen}
                aria-controls="searchbar"
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
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <Menu className="h-5 w-5 text-brand-dark" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full h-full sm:w-[350px] p-4" id="mobile-menu">
                  <div className="flex justify-end">
                    <SheetClose className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Fechar menu"
                    >
                      <X className="h-5 w-5 text-brand-dark" />
                    </SheetClose>
                  </div>
                  <div className="flex flex-col gap-6 mt-2">
                    <div className="mb-4">
                      <SearchBox onClose={() => {}} showCloseButton={false} />
                    </div>
                    <div className="space-y-5">
                      <Link 
                        to="/categoria/cama-mesa-banho" 
                        className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium"
                      >
                        Cama, Mesa e Banho
                      </Link>
                      <Link 
                        to="/categoria/infantil" 
                        className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium"
                      >
                        Infantil
                      </Link>
                      <Link 
                        to="/categoria/vestuario" 
                        className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium"
                      >
                        Vestuário
                      </Link>
                      <Link 
                        to="/produtos" 
                        className="block py-3 px-4 hover:bg-gray-100 rounded-md font-medium"
                      >
                        Todos os Produtos
                      </Link>
                      <Link 
                        to="/portfolio" 
                        className="block py-3 px-4 hover:bg-brand-red hover:text-white rounded-md font-medium"
                      >
                        Portfólio
                      </Link>
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
                className="py-3"
                id="searchbar"
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
