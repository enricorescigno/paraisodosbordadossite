
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { useIsMobile } from '../hooks/use-mobile';
import { cn } from '@/lib/utils';

const MenubarNav = () => {
  const isMobile = useIsMobile();
  
  // For mobile, we'll return null as the mobile menu is handled in Navbar.tsx
  if (isMobile) return null;
  
  return (
    <div className="flex justify-center pb-2">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-6">
          <NavigationMenuItem>
            <Link 
              to="/" 
              className="text-sm text-brand-dark/90 hover:text-brand-dark transition-colors duration-200"
            >
              Início
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm text-brand-dark/90 hover:text-brand-dark bg-transparent hover:bg-transparent focus:bg-transparent">
              Categorias
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white rounded-xl p-4 shadow-lg min-w-[220px]">
              <div className="grid gap-3">
                <Link 
                  to="/produtos" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Ver Todos os Produtos
                </Link>
                <hr className="my-1" />
                <h4 className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Cama, Mesa e Banho</h4>
                <Link 
                  to="/categoria/cama" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Cama
                </Link>
                <Link 
                  to="/categoria/mesa-cozinha" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Mesa e Cozinha
                </Link>
                <Link 
                  to="/categoria/tapete-cortinas" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Tapete e Cortinas
                </Link>
                <Link 
                  to="/categoria/banho" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Banho
                </Link>
                <hr className="my-1" />
                <h4 className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Outras Categorias</h4>
                <Link 
                  to="/categoria/infantil" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Infantil
                </Link>
                <Link 
                  to="/categoria/vestuario" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Vestuário
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm text-brand-dark/90 hover:text-brand-dark bg-transparent hover:bg-transparent focus:bg-transparent">
              Portfólio
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white rounded-xl p-4 shadow-lg min-w-[220px]">
              <div className="grid gap-3">
                <Link 
                  to="/portfolio" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Ver Todo o Portfólio
                </Link>
                <hr className="my-1" />
                <Link 
                  to="/portfolio/bordado-bone" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Bordado em Boné
                </Link>
                <Link 
                  to="/portfolio/bordado-necessaire" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Bordado em Necessaire
                </Link>
                <Link 
                  to="/portfolio/bordado-bolsa" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Bordado em Bolsa
                </Link>
                <Link 
                  to="/portfolio/bordado-jaleco" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Bordado em Jaleco
                </Link>
                <Link 
                  to="/portfolio/bordado-infantis" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Bordado Infantis
                </Link>
                <Link 
                  to="/portfolio/bordado-toalha-banho" 
                  className="block px-2 py-1.5 text-sm text-brand-dark/80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Bordado em Toalha de Banho
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/sobre" 
              className="text-sm text-brand-dark/90 hover:text-brand-dark transition-colors duration-200"
            >
              Sobre Nós
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MenubarNav;
