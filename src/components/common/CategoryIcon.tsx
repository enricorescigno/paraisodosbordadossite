
import React from 'react';
import { motion } from 'framer-motion';

interface CategoryIconProps {
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ name, icon, isActive }) => {
  return (
    <motion.div
      className={`category-icon flex flex-col items-center justify-center py-2 px-3 md:px-4 rounded-lg transition-colors cursor-pointer ${
        isActive 
          ? 'bg-primary-500 text-white' 
          : 'bg-white hover:bg-gray-100 text-gray-700'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-wrapper mb-1">
        {icon}
      </div>
      <span className="text-xs md:text-sm font-medium text-center truncate max-w-20">
        {name}
      </span>
    </motion.div>
  );
};

export default CategoryIcon;
