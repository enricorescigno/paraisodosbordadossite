
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrowseByCategory from './BrowseByCategory';
import BrowseByProduct from './BrowseByProduct';
import { motion } from 'framer-motion';

interface BrowseNavigationProps {
  activeCategory?: string;
  activeProduct?: string;
}

const BrowseNavigation = ({ activeCategory, activeProduct }: BrowseNavigationProps) => {
  const [activeTab, setActiveTab] = useState<'category' | 'product'>('category');

  return (
    <motion.div 
      className="w-full mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Tabs 
        defaultValue="category" 
        onValueChange={(value) => setActiveTab(value as 'category' | 'product')}
        className="w-full flex flex-col items-center justify-center"
      >
        <TabsList className="mb-8 bg-white/80 backdrop-blur-sm shadow-sm rounded-full">
          <TabsTrigger 
            value="category" 
            className="text-base data-[state=active]:bg-brand-red data-[state=active]:text-white px-8 py-2 rounded-full"
          >
            Navegar por Categoria
          </TabsTrigger>
          <TabsTrigger 
            value="product" 
            className="text-base data-[state=active]:bg-brand-red data-[state=active]:text-white px-8 py-2 rounded-full"
          >
            Navegar por Produto
          </TabsTrigger>
        </TabsList>

        {activeTab === 'category' ? (
          <BrowseByCategory activeCategory={activeCategory} />
        ) : (
          <BrowseByProduct activeProduct={activeProduct} />
        )}
      </Tabs>
    </motion.div>
  );
};

export default BrowseNavigation;
