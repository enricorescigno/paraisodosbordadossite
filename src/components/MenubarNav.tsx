
import { Link } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useMainCategories, useSubcategories } from '../hooks/useCategories';

const MenubarNav = () => {
  const { data: productCategories = [] } = useMainCategories('product');
  const { data: portfolioCategories = [] } = useMainCategories('portfolio');
  
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="font-medium cursor-pointer">Produtos</MenubarTrigger>
        <MenubarContent className="min-w-[240px]">
          {productCategories.map((category) => (
            <MenubarSub key={category.id}>
              <MenubarSubTrigger>{category.name}</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <Link to={`/categoria/${category.slug}`} className="w-full">
                    Ver todos
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                
                <DynamicSubcategories parentId={category.id} />
              </MenubarSubContent>
            </MenubarSub>
          ))}
          <MenubarSeparator />
          <MenubarItem>
            <Link to="/produtos" className="w-full">Ver todos os produtos</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="font-medium cursor-pointer">Portfólio</MenubarTrigger>
        <MenubarContent>
          {portfolioCategories.map((category) => (
            <MenubarSub key={category.id}>
              <MenubarSubTrigger>{category.name}</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <Link to={`/portfolio/${category.slug}`} className="w-full">
                    Ver todos
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                
                <DynamicSubcategories parentId={category.id} />
              </MenubarSubContent>
            </MenubarSub>
          ))}
          <MenubarSeparator />
          <MenubarItem>
            <Link to="/portfolio" className="w-full">Ver portfólio completo</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <Link to="/sobre">
          <MenubarTrigger className="font-medium cursor-pointer">Sobre Nós</MenubarTrigger>
        </Link>
      </MenubarMenu>

      <MenubarMenu>
        <Link to="/nossos-parceiros">
          <MenubarTrigger className="font-medium cursor-pointer">Parceiros</MenubarTrigger>
        </Link>
      </MenubarMenu>
    </Menubar>
  );
};

// Helper component to load subcategories dynamically
const DynamicSubcategories = ({ parentId }: { parentId: number | string }) => {
  const { data: subcategories = [] } = useSubcategories(parentId);
  
  if (subcategories.length === 0) {
    return <MenubarItem>Sem subcategorias</MenubarItem>;
  }
  
  return (
    <>
      {subcategories.map((subcategory) => (
        <MenubarItem key={subcategory.id}>
          <Link to={`/categoria/${subcategory.slug}`} className="w-full">
            {subcategory.name}
          </Link>
        </MenubarItem>
      ))}
    </>
  );
};

export default MenubarNav;
