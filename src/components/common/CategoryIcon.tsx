
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
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-2 cursor-pointer min-w-[100px]"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className={cn(
          "w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-white shadow-sm",
          "transition-all duration-300 hover:shadow-md",
          isActive ? "ring-2 ring-brand-red bg-red-50" : "border border-gray-100"
        )}
      >
        {icon}
      </div>
      <span className={cn(
        "text-sm md:text-sm text-center font-medium mt-1 w-full px-1",
        "whitespace-normal break-words",
        isActive ? "text-brand-red" : "text-gray-700"
      )}>
        {name}
      </span>
    </motion.div>
  );
};

export default CategoryIcon;
