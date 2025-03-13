
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  User
} from 'lucide-react';

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

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${isScrolled ? 'bg-white shadow-sm py-2' : 'bg-white py-2'}`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-10">
          <img 
            src="/lovable-uploads/5db187fa-df04-492a-883f-c007af693e55.png" 
            alt="Paraíso dos Bordados" 
            className="h-14 md:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-12">
          <Link to="/" className="nav-link text-brand-dark">
            Início
          </Link>
          <div className="relative group">
            <button className="nav-link text-brand-dark flex items-center gap-1">
              Todas as Categorias
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-60 glass rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-lg">
              <div className="py-2 px-3">
                <Link 
                  to="/categoria/bordados-maquina" 
                  className="block py-2 px-3 hover:bg-brand-red/5 rounded-md"
                >
                  Bordados à Máquina
                </Link>
                <Link 
                  to="/categoria/bordados-manuais" 
                  className="block py-2 px-3 hover:bg-brand-red/5 rounded-md"
                >
                  Bordados Manuais
                </Link>
                <Link 
                  to="/categoria/kits" 
                  className="block py-2 px-3 hover:bg-brand-red/5 rounded-md"
                >
                  Kits de Bordado
                </Link>
                <Link 
                  to="/categoria/acessorios" 
                  className="block py-2 px-3 hover:bg-brand-red/5 rounded-md"
                >
                  Acessórios
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

        {/* Right Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/login" className="nav-link text-brand-dark flex items-center gap-1">
            <User className="h-5 w-5" />
            Login
          </Link>
          <Link to="/carrinho" className="relative">
            <ShoppingCart className="h-6 w-6 text-brand-dark hover:text-brand-red transition-colors duration-300" />
            <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="lg:hidden relative z-10"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-brand-dark" />
          ) : (
            <Menu className="h-6 w-6 text-brand-dark" />
          )}
        </button>

        {/* Mobile menu */}
        <div 
          className={`fixed inset-0 bg-white z-[45] transform transition-transform duration-300 lg:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>
              <div className="py-2 border-b border-gray-100">
                <div className="text-lg font-medium mb-2">Todas as Categorias</div>
                <div className="pl-4 flex flex-col space-y-2">
                  <Link 
                    to="/categoria/bordados-maquina" 
                    className="text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Bordados à Máquina
                  </Link>
                  <Link 
                    to="/categoria/bordados-manuais" 
                    className="text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Bordados Manuais
                  </Link>
                  <Link 
                    to="/categoria/kits" 
                    className="text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Kits de Bordado
                  </Link>
                  <Link 
                    to="/categoria/acessorios" 
                    className="text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Acessórios
                  </Link>
                </div>
              </div>
              <Link 
                to="/portfolio" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfólio Bordado
              </Link>
              <Link 
                to="/sobre" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link 
                to="/login" 
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/carrinho" 
                className="text-lg font-medium py-2 border-b border-gray-100 flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                Carrinho (0)
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
