
import { Link } from 'react-router-dom';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar";

const MenubarNav = () => {
  return <Menubar className="w-full border-none bg-brand-light rounded-none py-[8px] my-0 mx-4">
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
        <MenubarMenu>
          <MenubarTrigger className="font-medium text-left mx-0 transition-all duration-300 hover:scale-105">Início</MenubarTrigger>
          <MenubarContent className="animate-fade-in">
            <MenubarItem asChild>
              <Link to="/" className="transition-colors duration-200 hover:bg-brand-red/10">Página Inicial</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-medium text-center mx-0 transition-all duration-300 hover:scale-105">Todas as Categorias</MenubarTrigger>
          <MenubarContent className="animate-fade-in">
            <MenubarSub>
              <MenubarSubTrigger className="transition-colors duration-200 hover:bg-brand-red/10">Cama, Mesa e Banho</MenubarSubTrigger>
              <MenubarSubContent className="animate-slide-in-right">
                <MenubarItem asChild>
                  <Link to="/categoria/cama" className="transition-colors duration-200 hover:bg-brand-red/10">Cama</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to="/categoria/mesa-cozinha" className="transition-colors duration-200 hover:bg-brand-red/10">Mesa e Cozinha</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to="/categoria/tapete-cortinas" className="transition-colors duration-200 hover:bg-brand-red/10">Tapete e Cortinas</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to="/categoria/banho" className="transition-colors duration-200 hover:bg-brand-red/10">Banho</Link>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem asChild>
              <Link to="/categoria/infantil" className="transition-colors duration-200 hover:bg-brand-red/10">Infantil</Link>
            </MenubarItem>
            <MenubarSub>
              <MenubarSubTrigger className="transition-colors duration-200 hover:bg-brand-red/10">Vestuário</MenubarSubTrigger>
              <MenubarSubContent className="animate-slide-in-right">
                <MenubarItem asChild>
                  <Link to="/categoria/camisa" className="transition-colors duration-200 hover:bg-brand-red/10">Camisa</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to="/categoria/jaleco" className="transition-colors duration-200 hover:bg-brand-red/10">Jaleco</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link to="/categoria/pantufa" className="transition-colors duration-200 hover:bg-brand-red/10">Pantufa</Link>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem asChild>
              <Link to="/produtos" className="transition-colors duration-200 hover:bg-brand-red/10">Ver Todos os Produtos</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-medium text-center mx-0 transition-all duration-300 hover:scale-105">Portfólio Bordado</MenubarTrigger>
          <MenubarContent className="animate-fade-in">
            <MenubarItem asChild>
              <Link to="/portfolio/bordado-bone" className="transition-colors duration-200 hover:bg-brand-red/10">Bordado em Boné</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/portfolio/bordado-necessaire" className="transition-colors duration-200 hover:bg-brand-red/10">Bordado em Necessaire</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/portfolio/bordado-bolsa" className="transition-colors duration-200 hover:bg-brand-red/10">Bordado em Bolsa</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/portfolio/bordado-jaleco" className="transition-colors duration-200 hover:bg-brand-red/10">Bordado em Jaleco</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/portfolio/bordado-infantis" className="transition-colors duration-200 hover:bg-brand-red/10">Bordado Infantis</Link>
            </MenubarItem>
            <MenubarItem asChild>
              <Link to="/portfolio/bordado-toalha-banho" className="transition-colors duration-200 hover:bg-brand-red/10">Bordado em Toalha de Banho</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem asChild>
              <Link to="/portfolio" className="transition-colors duration-200 hover:bg-brand-red/10">Ver Todo o Portfólio</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-medium text-center mx-0 transition-all duration-300 hover:scale-105">Sobre Nós</MenubarTrigger>
          <MenubarContent className="animate-fade-in">
            <MenubarItem asChild>
              <Link to="/sobre" className="transition-colors duration-200 hover:bg-brand-red/10">Nossa História</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>;
};
export default MenubarNav;
