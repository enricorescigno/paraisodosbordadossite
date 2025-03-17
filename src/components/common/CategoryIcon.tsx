
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CategoryIconProps {
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryIcon = ({ name, icon, isActive = false, onClick }: CategoryIconProps) => {
  // Function to add line breaks at the right spots in category names
  const formatCategoryName = (name: string) => {
    // Words that should trigger a line break after them
    const breakAfterWords = ['em', 'e', 'de'];
    
    const words = name.split(' ');
    
    // If there's only one word or less than 3 characters, just return it
    if (words.length <= 1 || name.length < 3) {
      return name;
    }
    
    // Check if any of the words should trigger a line break
    for (let i = 0; i < words.length - 1; i++) {
      const lowerCaseWord = words[i].toLowerCase();
      if (breakAfterWords.includes(lowerCaseWord)) {
        // Return the first part + line break + second part
        return (
          <>
            {words.slice(0, i + 1).join(' ')}
            <br />
            {words.slice(i + 1).join(' ')}
          </>
        );
      }
    }
    
    // If no trigger words found but we have multiple words,
    // default to breaking after the middle word
    const middleIndex = Math.floor(words.length / 2);
    return (
      <>
        {words.slice(0, middleIndex).join(' ')}
        <br />
        {words.slice(middleIndex).join(' ')}
      </>
    );
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-1 cursor-pointer min-w-[80px] md:min-w-[85px]"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className={cn(
          "w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white shadow-sm",
          "transition-all duration-300 hover:shadow-md",
          isActive ? "ring-2 ring-brand-red bg-red-50" : "border border-gray-100"
        )}
      >
        {icon}
      </div>
      <span className={cn(
        "text-xs md:text-sm text-center font-medium mt-1 w-full px-1",
        "whitespace-normal break-words leading-tight",
        isActive ? "text-brand-red" : "text-gray-700"
      )}>
        {formatCategoryName(name)}
      </span>
    </motion.div>
  );
};

export default CategoryIcon;
