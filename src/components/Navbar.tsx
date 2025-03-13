
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import MenubarNav from './MenubarNav';
import SearchBox from './SearchBox';
import { useIsMobile } from '../hooks/use-mobile';

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
      className={`apple-navbar ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <nav className="container-custom h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-serif font-medium tracking-tight text-brand-dark"
        >
          Paraíso dos Bordados
        </Link>

        {!isMobile && (
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5 text-brand-dark" />
            </button>
          </div>
        )}
      </nav>

      {!isMobile && <MenubarNav />}
      {isSearchOpen && (
        <SearchBox onClose={() => setIsSearchOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;
