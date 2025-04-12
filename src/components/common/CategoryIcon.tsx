import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
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
  return;
};
export default CategoryIcon;