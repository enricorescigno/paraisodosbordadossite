import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, User } from 'lucide-react';
import SearchBox from './SearchBox';
import MenubarNav from './MenubarNav';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <header className="w-full bg-white z-50">
      {/* Top bar with account, language, etc. */}
      

      {/* Main navbar with logo, search and cart */}
      <div className={`py-3 ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <img alt="Paraíso dos Bordados" src="/lovable-uploads/01c74faa-daf1-4918-a69a-9de345d8901d.png" className="h-14 md:h-16 object-scale-down" />
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-xl mx-6">
            <SearchBox />
          </div>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            
            <Link to="/carrinho" className="flex flex-col items-center text-brand-dark group relative">
              <ShoppingCart className="h-6 w-6 group-hover:text-brand-red transition-colors" />
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                0
              </span>
              <span className="text-xs mt-1">Carrinho</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden relative z-10">
            {isMobileMenuOpen ? <X className="h-6 w-6 text-brand-dark" /> : <Menu className="h-6 w-6 text-brand-dark" />}
          </button>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-brand-light border-t border-b border-gray-200 hidden lg:flex justify-center">
        <div className="container max-w-4xl mx-auto">
          <MenubarNav />
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-white z-[45] transform transition-transform duration-300 lg:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 px-6 overflow-y-auto">
          {/* Mobile search */}
          <div className="mb-6">
            <SearchBox mobileView={true} />
          </div>

          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
              Início
            </Link>
            
            {/* Cama, Mesa e Banho - Mobile */}
            <div className="py-2 border-b border-gray-100">
              <Link to="/categoria/cama-mesa-banho" className="text-lg font-medium mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                Cama, Mesa e Banho
              </Link>
              <div className="pl-4 flex flex-col space-y-2 mt-2">
                <Link to="/categoria/cama" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Cama
                </Link>
                <Link to="/categoria/mesa-cozinha" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Mesa e Cozinha
                </Link>
                <Link to="/categoria/tapete-cortinas" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Tapete e Cortinas
                </Link>
                <Link to="/categoria/banho" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Banho
                </Link>
              </div>
            </div>
            
            {/* Infantil - Mobile */}
            <Link to="/categoria/infantil" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
              Infantil
            </Link>
            
            {/* Vestuário - Mobile */}
            <div className="py-2 border-b border-gray-100">
              <Link to="/categoria/vestuario" className="text-lg font-medium mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                Vestuário
              </Link>
              <div className="pl-4 flex flex-col space-y-2 mt-2">
                <Link to="/categoria/camisa" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Camisa
                </Link>
                <Link to="/categoria/jaleco" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Jaleco
                </Link>
                <Link to="/categoria/pantufa" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Pantufa
                </Link>
              </div>
            </div>
            
            {/* Portfolio Bordado - Mobile */}
            <div className="py-2 border-b border-gray-100">
              <Link to="/portfolio" className="text-lg font-medium mb-2" onClick={() => setIsMobileMenuOpen(false)}>
                Portfólio Bordado
              </Link>
              <div className="pl-4 flex flex-col space-y-2 mt-2">
                <Link to="/portfolio/bordado-bone" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Bordado em Boné
                </Link>
                <Link to="/portfolio/bordado-necessaire" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Bordado em Necessaire
                </Link>
                <Link to="/portfolio/bordado-bolsa" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Bordado em Bolsa
                </Link>
                <Link to="/portfolio/bordado-jaleco" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Bordado em Jaleco
                </Link>
                <Link to="/portfolio/bordado-infantis" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Bordado Infantis
                </Link>
                <Link to="/portfolio/bordado-toalha-banho" className="text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
                  Bordado em Toalha de Banho
                </Link>
              </div>
            </div>
            
            <Link to="/sobre" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
              Sobre Nós
            </Link>
            <Link to="/login" className="text-lg font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
            <Link to="/carrinho" className="text-lg font-medium py-2 border-b border-gray-100 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              <ShoppingCart className="h-5 w-5" />
              Carrinho (0)
            </Link>
          </nav>
        </div>
      </div>
    </header>;
};
export default Navbar;