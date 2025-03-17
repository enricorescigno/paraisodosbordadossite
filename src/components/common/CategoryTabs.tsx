
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  getCategoryDisplayName: (category: string) => string;
}

const CategoryTabs = ({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  getCategoryDisplayName 
}: CategoryTabsProps) => {
  return (
    <div className="mb-16 justify-center flex flex-col items-center">
      <Tabs 
        value={activeCategory} 
        onValueChange={onCategoryChange}
        className="w-full max-w-3xl"
      >
        <TabsList className="bg-white rounded-full shadow-sm overflow-x-auto py-1 px-1 w-auto flex flex-nowrap justify-center">
          {categories.map((category) => (
            <TabsTrigger 
              key={category}
              value={category}
              className="px-6 py-2 rounded-full data-[state=active]:bg-brand-red data-[state=active]:text-white text-base whitespace-nowrap"
            >
              {getCategoryDisplayName(category)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
