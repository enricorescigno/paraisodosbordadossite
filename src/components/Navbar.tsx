
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import MenubarNav from './MenubarNav';
import SearchBox from './SearchBox';
import { useIsMobile } from '../hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "z-50 fixed top-0 left-0 right-0 w-full transition-all duration-300",
        isScrolled 
          ? "backdrop-blur-xl bg-white/90 shadow-sm" 
          : "backdrop-blur-none bg-white"
      )}
    >
      <div className="container-custom mx-auto">
        <nav className="h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-serif font-medium tracking-tight text-brand-dark"
          >
            Paraíso dos Bordados
          </Link>

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
            
            <Link 
              to="/carrinho" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative"
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5 text-brand-dark" />
              <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-brand-red text-white rounded-full">0</span>
            </Link>
          </div>
        </nav>
        
        {!isMobile && (
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="py-3"
              >
                <SearchBox onClose={() => setIsSearchOpen(false)} />
              </motion.div>
            ) : (
              <MenubarNav />
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
  );
};

export default Navbar;
