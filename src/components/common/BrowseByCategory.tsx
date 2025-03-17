
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, ChefHat, Shirt, Paintbrush, BookOpenCheck, Baby, Briefcase, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import CategoryIcon from './CategoryIcon';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
}

const categories: Category[] = [
  { id: 'cama', name: 'Cama', icon: <Bed className="w-8 h-8 text-gray-700" />, path: '/categoria/cama' },
  { id: 'mesa-cozinha', name: 'Mesa e Cozinha', icon: <ChefHat className="w-8 h-8 text-gray-700" />, path: '/categoria/mesa-cozinha' },
  { id: 'banho', name: 'Banho', icon: <Bath className="w-8 h-8 text-gray-700" />, path: '/categoria/banho' },
  { id: 'bordado-bone', name: 'Bordado em Boné', icon: <Shirt className="w-8 h-8 text-gray-700" />, path: '/portfolio/bordado-bone' },
  { id: 'bordado-toalha-banho', name: 'Bordado em Toalha', icon: <Paintbrush className="w-8 h-8 text-gray-700" />, path: '/portfolio/bordado-toalha-banho' },
  { id: 'bordado-jaleco', name: 'Bordado em Jaleco', icon: <BookOpenCheck className="w-8 h-8 text-gray-700" />, path: '/portfolio/bordado-jaleco' },
  { id: 'bordado-infantis', name: 'Bordado Infantil', icon: <Baby className="w-8 h-8 text-gray-700" />, path: '/portfolio/bordado-infantis' },
  { id: 'bordado-necessaire', name: 'Bordado em Necessaire', icon: <Briefcase className="w-8 h-8 text-gray-700" />, path: '/portfolio/bordado-necessaire' },
  { id: 'bordado-bolsa', name: 'Bordado em Bolsa', icon: <ShoppingBag className="w-8 h-8 text-gray-700" />, path: '/portfolio/bordado-bolsa' },
];

interface BrowseByCategoryProps {
  activeCategory?: string;
}

const BrowseByCategory = ({ activeCategory }: BrowseByCategoryProps) => {
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
          {categories.map((category) => (
            <CategoryIcon
              key={category.id}
              name={category.name}
              icon={category.icon}
              isActive={activeCategory === category.id}
              onClick={() => navigate(category.path)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
