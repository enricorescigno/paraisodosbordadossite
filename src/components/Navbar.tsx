import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import MenubarNav from './MenubarNav';
import SearchBox from './SearchBox';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  return <header className={cn("z-50 fixed top-0 left-0 right-0 w-full transition-all duration-300", isScrolled ? "backdrop-blur-xl bg-white/90 shadow-sm" : "backdrop-blur-none bg-white")}>
      <div className="container-custom mx-auto">
        <nav className="h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/1b6b8029-a368-4270-a444-57d4aab3676e.png" alt="Paraíso dos Bordados" className="h-16 w-auto" />
            </Link>
            
            {!isMobile && <MenubarNav />}
          </div>

          <div className="flex items-center gap-4">
            {!isMobile && <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300" aria-label="Buscar">
                <Search className="h-5 w-5 text-brand-dark" />
              </button>}
            
            <Link to="/carrinho" className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative" aria-label="Carrinho">
              <ShoppingCart className="h-5 w-5 text-brand-dark" />
              <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-brand-red text-white rounded-full">0</span>
            </Link>

            {isMobile && <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300" aria-label="Menu">
                    <Menu className="h-5 w-5 text-brand-dark" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="mb-4">
                      <SearchBox onClose={() => {}} showCloseButton={false} />
                    </div>
                    <div className="space-y-4">
                      <Link to="/categoria/cama-mesa-banho" className="block py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
                        Cama, Mesa e Banho
                      </Link>
                      <Link to="/categoria/infantil" className="block py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
                        Infantil
                      </Link>
                      <Link to="/categoria/vestuario" className="block py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
                        Vestuário
                      </Link>
                      <Link to="/produtos" className="block py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
                        Todos os Produtos
                      </Link>
                      <Link to="/portfolio" className="block py-2 px-4 hover:bg-brand-red hover:text-white rounded-md font-medium">
                        Portfólio
                      </Link>
                      <Link to="/sobre" className="block py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
                        Sobre Nós
                      </Link>
                      <Link to="/nossos-parceiros" className="block py-2 px-4 hover:bg-gray-100 rounded-md font-medium">
                        Parceiros
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>}
          </div>
        </nav>
        
        {!isMobile && <AnimatePresence>
            {isSearchOpen && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} transition={{
          duration: 0.2
        }} className="py-3">
                <SearchBox onClose={() => setIsSearchOpen(false)} />
              </motion.div>}
          </AnimatePresence>}
      </div>
    </header>;
};
export default Navbar;