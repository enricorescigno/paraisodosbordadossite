
import { 
  Palette, 
  BedDouble, 
  ShoppingBag, 
  Utensils, 
  Home, 
  Baby, 
  Paintbrush, 
  Shirt, 
  Briefcase 
} from 'lucide-react';
import React from 'react';

// Define the Category type
export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
  type: 'product' | 'portfolio';
}

// Combined list of all categories
export const allCategories: Category[] = [
  // Product categories
  { 
    id: 'pantufa', 
    name: 'Pantufas', 
    icon: <Palette className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/categoria/pantufa', 
    type: 'product' 
  },
  { 
    id: 'cama', 
    name: 'Cama', 
    icon: <BedDouble className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/categoria/cama', 
    type: 'product' 
  },
  { 
    id: 'banho', 
    name: 'Banho', 
    icon: <ShoppingBag className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/categoria/banho', 
    type: 'product' 
  },
  { 
    id: 'mesa-cozinha', 
    name: 'Mesa e Cozinha', 
    icon: <Utensils className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/categoria/mesa-cozinha', 
    type: 'product' 
  },
  { 
    id: 'tapete-cortinas', 
    name: 'Tapete e Cortinas', 
    icon: <Home className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/categoria/tapete-cortinas', 
    type: 'product' 
  },
  { 
    id: 'infantil', 
    name: 'Infantil', 
    icon: <Baby className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/categoria/infantil', 
    type: 'product' 
  },
  
  // Portfolio categories
  { 
    id: 'all', 
    name: 'Todos', 
    icon: <Paintbrush className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/portfolio', 
    type: 'portfolio' 
  },
  { 
    id: 'bordado-bone', 
    name: 'Bordado em Boné', 
    icon: <Shirt className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/portfolio/bordado-bone', 
    type: 'portfolio' 
  },
  { 
    id: 'bordado-vestuario', 
    name: 'Bordado em Vestuário', 
    icon: <Shirt className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/portfolio/bordado-vestuario', 
    type: 'portfolio' 
  },
  { 
    id: 'bordado-infantis', 
    name: 'Bordado Infantil', 
    icon: <Baby className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/portfolio/bordado-infantis', 
    type: 'portfolio' 
  },
  { 
    id: 'bordado-bolsa', 
    name: 'Bordado em Bolsa', 
    icon: <ShoppingBag className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/portfolio/bordado-bolsa', 
    type: 'portfolio' 
  },
  { 
    id: 'bordado-necessaire', 
    name: 'Bordado em Necessaire', 
    icon: <Briefcase className="w-5 h-5 md:w-7 md:h-7 text-gray-700" aria-hidden="true" />, 
    path: '/portfolio/bordado-necessaire', 
    type: 'portfolio' 
  }
];
