
import { Product } from '../types/product';

// Import infantilProducts from emptyProducts
import { infantilProducts } from './products/emptyProducts';

// Empty collections for product categories that we're removing
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

// Create the combined collection of all products - include the infantil products
export const allCategoryProducts: Product[] = [
  ...bonesProducts,
  ...bordadosProducts,
  ...bordadosInfantisProducts,
  ...vestuarioProductsImport,
  ...banhoProducts,
  ...camaProducts,
  ...mesaCozinhaProducts,
  ...tapeteCortinasProducts,
  ...infantilProducts
];
