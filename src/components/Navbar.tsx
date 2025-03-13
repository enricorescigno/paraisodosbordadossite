
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown, User, Search } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Search query:', searchQuery);
  };

  return <header className="w-full bg-white z-50">
      {/* Top bar with account, language, etc. */}
      <div className="bg-brand-light py-2 border-b border-gray-200">
        <div className="container-custom flex justify-end items-center">
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/minha-conta" className="hover:text-brand-red transition-colors">
              Minha Conta
            </Link>
            <Link to="/favoritos" className="hover:text-brand-red transition-colors">
              Favoritos
            </Link>
            <Link to="/ajuda" className="hover:text-brand-red transition-colors">
              Central de Ajuda
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar with logo, search and cart */}
      <div className={`py-3 ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-10">
            <img alt="Paraíso dos Bordados" className="h-14 md:h-16" src="/lovable-uploads/620a0828-61e3-409b-8639-64b8d65f538c.png" />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input type="text" placeholder="O que você procura?" className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-brand-red rounded-r-full">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/login" className="flex flex-col items-center text-brand-dark group">
              <User className="h-6 w-6 group-hover:text-brand-red transition-colors" />
              <span className="text-xs mt-1">Entrar</span>
            </Link>
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
      <div className="bg-brand-light border-t border-b border-gray-200 hidden lg:block">
        <div className="container-custom">
          <nav className="flex items-center justify-between py-3">
            <Link to="/" className="nav-link text-brand-dark">
              Início
            </Link>
            
            {/* Todas as Categorias with subcategories */}
            <div className="relative group">
              <button className="nav-link text-brand-dark flex items-center gap-1">
                Todas as Categorias
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-60 glass rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg z-50">
                <div className="py-2 px-3">
                  {/* Cama, Mesa e Banho submenu */}
                  <div className="relative group/sub">
                    <Link to="/categoria/cama-mesa-banho" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md flex items-center justify-between">
                      Cama, Mesa e Banho
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Link>
                    <div className="absolute top-0 left-full ml-1 w-60 glass rounded-lg overflow-hidden opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 shadow-lg">
                      <div className="py-2 px-3">
                        <Link to="/categoria/cama" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                          Cama
                        </Link>
                        <Link to="/categoria/mesa-cozinha" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                          Mesa e Cozinha
                        </Link>
                        <Link to="/categoria/tapete-cortinas" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                          Tapete e Cortinas
                        </Link>
                        <Link to="/categoria/banho" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                          Banho
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Infantil submenu */}
                  <Link to="/categoria/infantil" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                    Infantil
                  </Link>
                  
                  {/* Vestuário submenu */}
                  <div className="relative group/sub">
                    <Link to="/categoria/vestuario" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md flex items-center justify-between">
                      Vestuário
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Link>
                    <div className="absolute top-0 left-full ml-1 w-60 glass rounded-lg overflow-hidden opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 shadow-lg">
                      <div className="py-2 px-3">
                        <Link to="/categoria/camisa" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                          Camisa
                        </Link>
                        <Link to="/categoria/jaleco" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                          Jaleco
                        </Link>
                        <Link to="/categoria/pantufa" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                          Pantufa
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Portifólio Bordado with subcategories */}
            <div className="relative group">
              <button className="nav-link text-brand-dark flex items-center gap-1">
                Portfólio Bordado
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-72 glass rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg z-50">
                <div className="py-2 px-3">
                  <Link to="/portfolio/bordado-bone" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                    Bordado em Boné
                  </Link>
                  <Link to="/portfolio/bordado-necessaire" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                    Bordado em Necessaire
                  </Link>
                  <Link to="/portfolio/bordado-bolsa" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                    Bordado em Bolsa
                  </Link>
                  <Link to="/portfolio/bordado-jaleco" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                    Bordado em Jaleco
                  </Link>
                  <Link to="/portfolio/bordado-infantis" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                    Bordado Infantis
                  </Link>
                  <Link to="/portfolio/bordado-toalha-banho" className="block py-2 px-3 hover:bg-brand-red/5 rounded-md">
                    Bordado em Toalha de Banho
                  </Link>
                </div>
              </div>
            </div>
            
            <Link to="/portfolio" className="nav-link text-brand-dark">
              Portfólio Bordado
            </Link>
            <Link to="/sobre" className="nav-link text-brand-dark">
              Sobre Nós
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`fixed inset-0 bg-white z-[45] transform transition-transform duration-300 lg:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-20 px-6 overflow-y-auto">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="mb-6">
            <div className="relative w-full">
              <input type="text" placeholder="O que você procura?" className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-brand-red rounded-r-full">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

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
