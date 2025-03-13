import { Link } from 'react-router-dom';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar";
const MenubarNav = () => {
  return <Menubar className="w-full border-none bg-brand-light rounded-none py-[8px] my-0 mx-[240px]">
      <MenubarMenu>
        <MenubarTrigger className="font-medium">Início</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link to="/">Página Inicial</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="font-medium">Todas as Categorias</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Cama, Mesa e Banho</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem asChild>
                <Link to="/categoria/cama">Cama</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link to="/categoria/mesa-cozinha">Mesa e Cozinha</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link to="/categoria/tapete-cortinas">Tapete e Cortinas</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link to="/categoria/banho">Banho</Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem asChild>
            <Link to="/categoria/infantil">Infantil</Link>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>Vestuário</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem asChild>
                <Link to="/categoria/camisa">Camisa</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link to="/categoria/jaleco">Jaleco</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link to="/categoria/pantufa">Pantufa</Link>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem asChild>
            <Link to="/produtos">Ver Todos os Produtos</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="font-medium">Portfólio Bordado</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link to="/portfolio/bordado-bone">Bordado em Boné</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link to="/portfolio/bordado-necessaire">Bordado em Necessaire</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link to="/portfolio/bordado-bolsa">Bordado em Bolsa</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link to="/portfolio/bordado-jaleco">Bordado em Jaleco</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link to="/portfolio/bordado-infantis">Bordado Infantis</Link>
          </MenubarItem>
          <MenubarItem asChild>
            <Link to="/portfolio/bordado-toalha-banho">Bordado em Toalha de Banho</Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem asChild>
            <Link to="/portfolio">Ver Todo o Portfólio</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="font-medium">Sobre Nós</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Link to="/sobre">Nossa História</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>;
};
export default MenubarNav;