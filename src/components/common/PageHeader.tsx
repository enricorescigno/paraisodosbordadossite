
import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <motion.div 
      className="mb-12 md:mb-16 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans tracking-tight font-medium text-center">
        {title}
      </h1>
      <p className="text-center text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-normal">
        {description}
      </p>
    </motion.div>
  );
};

export default PageHeader;
