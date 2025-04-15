
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shirt, Paintbrush, Baby, Briefcase, ShoppingBag, Palette, BedDouble, Utensils, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the Category type
interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
  type: 'product' | 'portfolio';
}

interface CategoryIconProps {
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryIcon = ({
  name,
  icon,
  isActive = false,
  onClick
}: CategoryIconProps) => {
  // Function to format category names with line breaks
  const formatCategoryName = (name: string) => {
    // Words that should trigger a line break after them
    const breakAfterWords = ['em', 'e', 'de', 'Mesa', 'para'];
    const words = name.split(' ');

    // If there's only one word or less than 3 characters, just return it
    if (words.length <= 1 || name.length < 3) {
      return name;
    }

    // Check if any of the words should trigger a line break
    for (let i = 0; i < words.length - 1; i++) {
      const lowerCaseWord = words[i].toLowerCase();
      if (breakAfterWords.includes(lowerCaseWord) || breakAfterWords.includes(words[i])) {
        // Return the first part + line break + second part
        return <>
            {words.slice(0, i + 1).join(' ')}
            <br />
            {words.slice(i + 1).join(' ')}
          </>;
      }
    }

    // If no trigger words found but we have multiple words,
    // default to breaking after the middle word
    const middleIndex = Math.floor(words.length / 2);
    return <>
        {words.slice(0, middleIndex).join(' ')}
        <br />
        {words.slice(middleIndex).join(' ')}
      </>;
  };

  return (
    <div 
      className={cn(
        "category-icon flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl min-w-[72px] md:min-w-[100px] transition-all duration-300 hover:scale-105 bg-white border md:mx-1",
        isActive 
          ? "border-brand-red shadow-md" 
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick && onClick();
        }
      }}
      aria-pressed={isActive}
    >
      <div className={cn(
        "icon-wrapper rounded-full p-2 md:p-3 mb-2",
        isActive ? "bg-brand-red/10 text-brand-red" : "bg-gray-100 text-gray-600"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-center text-xs md:text-sm font-medium w-full text-gray-700",
        isActive && "text-gray-900"
      )}>
        {formatCategoryName(name)}
      </span>
    </div>
  );
};

// Combined list of all categories
const allCategories: Category[] = [
  // Product categories
  { id: 'vestuario', name: 'Vestuário', icon: <Shirt className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/categoria/vestuario', type: 'product' },
  { id: 'infantil', name: 'Infantil', icon: <Baby className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/categoria/infantil', type: 'product' },
  { id: 'cama', name: 'Cama', icon: <BedDouble className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/categoria/cama', type: 'product' },
  { id: 'banho', name: 'Banho', icon: <ShoppingBag className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/categoria/banho', type: 'product' },
  { id: 'mesa-cozinha', name: 'Mesa e Cozinha', icon: <Utensils className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/categoria/mesa-cozinha', type: 'product' },
  { id: 'tapete-cortinas', name: 'Tapete e Cortinas', icon: <Home className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/categoria/tapete-cortinas', type: 'product' },
  
  // Portfolio categories
  { id: 'all', name: 'Todos', icon: <Paintbrush className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio', type: 'portfolio' },
  { id: 'bordado-bone', name: 'Bordado em Boné', icon: <Shirt className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-bone', type: 'portfolio' },
  { id: 'bordado-vestuario', name: 'Bordado em Vestuário', icon: <Shirt className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-vestuario', type: 'portfolio' },
  { id: 'bordado-infantis', name: 'Bordado Infantil', icon: <Baby className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-infantis', type: 'portfolio' },
  { id: 'bordado-bolsa', name: 'Bordado em Bolsa', icon: <ShoppingBag className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-bolsa', type: 'portfolio' },
  { id: 'bordado-necessaire', name: 'Bordado em Necessaire', icon: <Briefcase className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-necessaire', type: 'portfolio' },
  { id: 'bordado-toalha', name: 'Bordado em Toalha', icon: <Paintbrush className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, path: '/portfolio/bordado-toalha', type: 'portfolio' }
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
