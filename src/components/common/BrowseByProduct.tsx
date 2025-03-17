
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryIcon from './CategoryIcon';
import { 
  Shirt, Bed, Bath, ChefHat, Bookmark, Shapes, Baby
} from 'lucide-react';

interface ProductType {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
}

const productTypes: ProductType[] = [
  { id: 'jogo-americano', name: 'Jogo Americano', icon: <ChefHat className="w-8 h-8 text-gray-700" />, path: '/categoria/mesa-cozinha' },
  { id: 'toalha-banho', name: 'Toalha de Banho', icon: <Bath className="w-8 h-8 text-gray-700" />, path: '/categoria/banho' },
  { id: 'lencol', name: 'Lençol', icon: <Bed className="w-8 h-8 text-gray-700" />, path: '/categoria/cama' },
  { id: 'bordado-bone', name: 'Boné Bordado', icon: <Bookmark className="w-8 h-8 text-gray-700" />, path: '/portfolio/bordado-bone' },
  { id: 'jaleco', name: 'Jaleco', icon: <Shirt className="w-8 h-8 text-gray-700" />, path: '/categoria/jaleco' },
  { id: 'bordado-infantil', name: 'Toalha Infantil', icon: <Baby className="w-8 h-8 text-gray-700" />, path: '/portfolio/bordado-infantis' },
  { id: 'pantufa', name: 'Pantufas', icon: <Shapes className="w-8 h-8 text-gray-700" />, path: '/categoria/pantufa' },
];

interface BrowseByProductProps {
  activeProduct?: string;
}

const BrowseByProduct = ({ activeProduct }: BrowseByProductProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mb-8 md:mb-12">
      <div className="overflow-x-auto hide-scrollbar pb-4">
        <motion.div 
          className="flex space-x-4 md:space-x-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {productTypes.map((product) => (
            <CategoryIcon
              key={product.id}
              name={product.name}
              icon={product.icon}
              isActive={activeProduct === product.id}
              onClick={() => navigate(product.path)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseByProduct;
