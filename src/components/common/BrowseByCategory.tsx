import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shirt, Paintbrush, Baby, Briefcase, ShoppingBag, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import CategoryIcon from './CategoryIcon';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
  type: 'product' | 'portfolio';
}

// Combined list of all categories - Removed Cama, Mesa e Cozinha, and Banho
const allCategories: Category[] = [
  // Product categories
  { id: 'pantufa', name: 'Pantufas', icon: <Palette className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/categoria/pantufa', type: 'product' },
  
  // Portfolio categories
  { id: 'all', name: 'Todos', icon: <Paintbrush className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio', type: 'portfolio' },
  { id: 'bordado-bone', name: 'Bordado em Boné', icon: <Shirt className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-bone', type: 'portfolio' },
  { id: 'bordado-jaleco', name: 'Bordado em Jaleco', icon: <Shirt className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-jaleco', type: 'portfolio' },
  { id: 'bordado-infantis', name: 'Bordado Infantil', icon: <Baby className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-infantis', type: 'portfolio' },
  { id: 'bordado-bolsa', name: 'Bordado em Bolsa', icon: <ShoppingBag className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-bolsa', type: 'portfolio' },
  { id: 'bordado-necessaire', name: 'Bordado em Necessaire', icon: <Briefcase className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-necessaire', type: 'portfolio' }
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
  const location = useLocation();

  // Determine activeCategory from URL if not provided
  const derivedActiveCategory = activeCategory || (() => {
    const path = location.pathname;
    // Find category ID based on current path
    const category = allCategories.find(cat => cat.path === path);
    return category ? category.id : 'all';
  })();

  // Filter categories based on the showOnly props
  const filteredCategories = allCategories.filter(category => {
    if (showOnlyProducts) return category.type === 'product';
    if (showOnlyPortfolio) return category.type === 'portfolio';
    return true;
  });

  const handleCategoryClick = (category: Category) => {
    if (onCategoryChange) {
      // If onCategoryChange is provided, use it (for local filtering)
      onCategoryChange(category.id);
    } else {
      // Otherwise, navigate to the category page
      navigate(category.path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, category: Category) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategoryClick(category);
    }
  };

  return (
    <nav className="w-full mb-8 md:mb-10" aria-label="Categorias de produtos">
      <div className="flex justify-center">
        <motion.div 
          className="categories-wrapper flex gap-2 md:gap-6 pb-4 px-0.5 md:px-0 w-full overflow-x-auto hide-scrollbar md:flex-wrap md:justify-center"
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
              role="button"
              tabIndex={0}
              aria-label={`Categoria ${category.name}`}
              aria-pressed={derivedActiveCategory === category.id}
              onKeyDown={(e) => handleKeyDown(e, category)}
              onClick={() => handleCategoryClick(category)}
            >
              <CategoryIcon
                name={category.name}
                icon={category.icon}
                isActive={derivedActiveCategory === category.id}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </nav>
  );
};

export default BrowseByCategory;
