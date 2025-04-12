import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBox from './SearchBox';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'apple-navbar shadow-md py-3' : 'bg-white/90 py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-brand-red flex items-center">
          Paraíso dos Bordados
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'text-brand-red after:w-full' : ''}`}
          >
            Início
          </Link>
          <Link
            to="/produtos"
            className={`nav-link ${isActive('/produtos') || isActive('/categoria') ? 'text-brand-red after:w-full' : ''}`}
          >
            Produtos
          </Link>
          <Link
            to="/portfolio"
            className={`nav-link ${isActive('/portfolio') ? 'text-brand-red after:w-full' : ''}`}
          >
            Portfólio
          </Link>
          <Link
            to="/dia-das-maes"
            className={`nav-link ${isActive('/dia-das-maes') ? 'text-brand-red after:w-full' : ''}`}
          >
            <span className="flex items-center">
              Dia das Mães
              <Heart className="ml-1 w-4 h-4 text-brand-red" />
            </span>
          </Link>
          <Link
            to="/sobre"
            className={`nav-link ${isActive('/sobre') ? 'text-brand-red after:w-full' : ''}`}
          >
            Sobre
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Pesquisar"
          >
            <Search size={20} />
          </button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/carrinho">
              <ShoppingBag size={20} />
              <span className="sr-only">Carrinho</span>
            </Link>
          </Button>
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </div>
      </div>

      {isSearchOpen && (
        <div className="container mx-auto px-4 py-3">
          <SearchBox onClose={() => setIsSearchOpen(false)} />
        </div>
      )}

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link
              to="/"
              className={`p-3 rounded-md ${isActive('/') ? 'bg-brand-red/10 text-brand-red font-medium' : ''}`}
            >
              Início
            </Link>
            <Link
              to="/produtos"
              className={`p-3 rounded-md ${isActive('/produtos') || isActive('/categoria') ? 'bg-brand-red/10 text-brand-red font-medium' : ''}`}
            >
              Produtos
            </Link>
            <Link
              to="/portfolio"
              className={`p-3 rounded-md ${isActive('/portfolio') ? 'bg-brand-red/10 text-brand-red font-medium' : ''}`}
            >
              Portfólio
            </Link>
            <Link
              to="/dia-das-maes"
              className={`p-3 rounded-md ${isActive('/dia-das-maes') ? 'bg-brand-red/10 text-brand-red font-medium' : ''}`}
            >
              <span className="flex items-center">
                Dia das Mães
                <Heart className="ml-1 w-4 h-4 text-brand-red" />
              </span>
            </Link>
            <Link
              to="/sobre"
              className={`p-3 rounded-md ${isActive('/sobre') ? 'bg-brand-red/10 text-brand-red font-medium' : ''}`}
            >
              Sobre
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
