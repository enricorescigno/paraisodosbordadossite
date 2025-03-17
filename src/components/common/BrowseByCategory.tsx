
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, ChefHat, Shirt, Paintbrush, Baby, Briefcase, ShoppingBag, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import CategoryIcon from './CategoryIcon';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
  type: 'product' | 'portfolio';
}

// Combined list of all categories
const allCategories: Category[] = [
  // Product categories
  { id: 'cama', name: 'Cama', icon: <Bed className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/categoria/cama', type: 'product' },
  { id: 'mesa-cozinha', name: 'Mesa e Cozinha', icon: <ChefHat className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/categoria/mesa-cozinha', type: 'product' },
  { id: 'banho', name: 'Banho', icon: <Bath className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/categoria/banho', type: 'product' },
  { id: 'pantufa', name: 'Pantufas', icon: <Palette className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/categoria/pantufa', type: 'product' },
  
  // Portfolio categories
  { id: 'all', name: 'Todos', icon: <Paintbrush className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/portfolio', type: 'portfolio' },
  { id: 'bordado-bone', name: 'Bordado em Boné', icon: <Shirt className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/portfolio/bordado-bone', type: 'portfolio' },
  { id: 'bordado-jaleco', name: 'Bordado em Jaleco', icon: <Shirt className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/portfolio/bordado-jaleco', type: 'portfolio' },
  { id: 'bordado-infantis', name: 'Bordado Infantil', icon: <Baby className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/portfolio/bordado-infantis', type: 'portfolio' },
  { id: 'bordado-bolsa', name: 'Bordado em Bolsa', icon: <ShoppingBag className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/portfolio/bordado-bolsa', type: 'portfolio' },
  { id: 'bordado-necessaire', name: 'Bordado em Necessaire', icon: <Briefcase className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/portfolio/bordado-necessaire', type: 'portfolio' },
  { id: 'bordado-toalha-banho', name: 'Bordado em Toalha', icon: <Bath className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />, path: '/portfolio/bordado-toalha-banho', type: 'portfolio' }
];

interface BrowseByCategoryProps {
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  showOnlyProducts?: boolean;
  showOnlyPortfolio?: boolean;
}

const BrowseByCategory = ({ 
  activeCategory, 
  onCategoryChange,
  showOnlyProducts = false,
  showOnlyPortfolio = false
}: BrowseByCategoryProps) => {
  const navigate = useNavigate();

  // Filter categories based on the showOnly props
  const filteredCategories = allCategories.filter(category => {
    if (showOnlyProducts) return category.type === 'product';
    if (showOnlyPortfolio) return category.type === 'portfolio';
    return true;
  });

  const handleCategoryClick = (category: Category) => {
    if (onCategoryChange) {
      onCategoryChange(category.id);
    } else {
      navigate(category.path);
    }
  };

  return (
    <div className="w-full mb-8 md:mb-12">
      <div className="flex justify-center">
        <motion.div 
          className="categories-wrapper flex gap-0.5 md:gap-6 pb-4 px-0.5 md:px-0 w-full overflow-x-auto hide-scrollbar md:flex-wrap md:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {filteredCategories.map((category) => (
            <div 
              key={category.id} 
              className="category-item flex-shrink-0 px-0.5"
              style={{ scrollSnapAlign: 'start' }}
            >
              <CategoryIcon
                name={category.name}
                icon={category.icon}
                isActive={activeCategory === category.id}
                onClick={() => handleCategoryClick(category)}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrowseByCategory;
