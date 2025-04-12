import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryIcon from './CategoryIcon';
import { Category, allCategories } from '@/utils/categoryData';

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
