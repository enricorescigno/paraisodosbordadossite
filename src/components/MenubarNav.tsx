
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useIsMobile } from '../hooks/use-mobile';

const MenubarNav = () => {
  const isMobile = useIsMobile();

  // For mobile, we'll return null as the mobile menu is handled in Navbar.tsx
  if (isMobile) return null;

  return (
    <div className="flex justify-center pb-2">
      <div className="flex space-x-6">
        <div className="relative">
          <Link to="/" className="text-sm text-brand-dark hover:text-brand-red transition-colors duration-200">
            Início
          </Link>
        </div>

        <div className="relative group">
          <button className="text-sm text-brand-dark hover:text-brand-red bg-transparent hover:bg-transparent focus:bg-transparent transition-colors duration-200 flex items-center gap-1">
            Categorias
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          <div className="absolute left-0 top-full z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[400px] bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 gap-4 transform -translate-y-2 group-hover:translate-y-0">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Cama, Mesa e Banho</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/categoria/cama" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Cama
                  </Link>
                </li>
                <li>
                  <Link to="/categoria/mesa-cozinha" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Mesa e Cozinha
                  </Link>
                </li>
                <li>
                  <Link to="/categoria/tapete-cortinas" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Tapete e Cortinas
                  </Link>
                </li>
                <li>
                  <Link to="/categoria/banho" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Banho
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Outras Categorias</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/categoria/infantil" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Infantil
                  </Link>
                </li>
                <li>
                  <Link to="/categoria/vestuario" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Vestuário
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 mt-4 pt-4 border-t border-gray-100">
              <Link to="/produtos" className="text-brand-red text-sm font-medium hover:text-brand-red/80 transition-colors">
                Ver Todos os Produtos →
              </Link>
            </div>
          </div>
        </div>

        <div className="relative group">
          <button className="text-sm text-brand-dark hover:text-brand-red bg-transparent hover:bg-transparent focus:bg-transparent transition-colors duration-200 flex items-center gap-1">
            Portfólio
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          <div className="absolute left-0 top-full z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[400px] bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 gap-4 transform -translate-y-2 group-hover:translate-y-0">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Portfolio</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/portfolio/bordado-bone" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Bordado em Boné
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/bordado-necessaire" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Bordado em Necessaire
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/bordado-bolsa" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Bordado em Bolsa
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/bordado-jaleco" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Bordado em Jaleco
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Bordado</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/portfolio/bordado-infantis" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Bordado Infantis
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio/bordado-toalha-banho" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                    Bordado em Toalha de Banho
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 mt-4 pt-4 border-t border-gray-100">
              <Link to="/portfolio" className="text-brand-red text-sm font-medium hover:text-brand-red/80 transition-colors">
                Ver Todo o Portfólio →
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <Link to="/sobre" className="text-sm text-brand-dark hover:text-brand-red transition-colors duration-200">
            Sobre Nós
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenubarNav;
