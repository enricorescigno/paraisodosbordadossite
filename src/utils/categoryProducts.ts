import { Product } from '../types/product';

// Empty collections for product categories that we're removing
export const infantilProducts: Product[] = [];
export const vestuarioProducts: Product[] = [];

// Import remaining products that we're keeping from the new modular files
import { 
  bonesProducts,
  bordadosProducts,
  bordadosInfantisProducts,
  vestuarioProducts as vestuarioProductsImport,
  banhoProducts,
  camaProducts,
  mesaCozinhaProducts,
  tapeteCortinasProducts
} from './products';

// Create the combined collection of all products - only with the ones we're keeping
export const allCategoryProducts: Product[] = [
  ...bonesProducts,
  ...bordadosProducts,
  ...bordadosInfantisProducts,
  ...vestuarioProductsImport,
  ...banhoProducts,
  ...camaProducts,
  ...mesaCozinhaProducts,
  ...tapeteCortinasProducts
];
