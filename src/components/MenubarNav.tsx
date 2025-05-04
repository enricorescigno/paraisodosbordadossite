import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useIsMobile } from '@/hooks/useMobile'; // Updated import path
import { cn } from '@/lib/utils';

const MenubarNav = () => {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <div className="flex justify-center pb-2">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-6">
          <NavigationMenuItem>
            <Link to="/" className="text-sm text-brand-dark hover:text-brand-red transition-colors duration-200">
              Início
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm text-brand-dark hover:text-brand-red bg-transparent hover:bg-transparent focus:bg-transparent">
              Categorias
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white rounded-xl p-6 shadow-lg min-w-[400px] grid grid-cols-2 gap-4">
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
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm text-brand-dark hover:text-brand-red bg-transparent hover:bg-transparent focus:bg-transparent">
              Portfólio
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white rounded-xl p-6 shadow-lg min-w-[400px] grid grid-cols-2 gap-4">
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
                    <Link to="/portfolio/bordado-vestuario" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                      Bordado em Vestuário
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
                    
                  </li>
                  <li>
                    <Link to="/portfolio/bordado-toalha" className="block text-sm text-gray-700 hover:text-brand-red transition-colors">
                      Bordado em Toalha
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-2 mt-4 pt-4 border-t border-gray-100">
                <Link to="/portfolio" className="text-brand-red text-sm font-medium hover:text-brand-red/80 transition-colors">
                  Ver Todo o Portfólio →
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/sobre" className="text-sm text-brand-dark hover:text-brand-red transition-colors duration-200">
              Sobre Nós
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>;
};
export default MenubarNav;
