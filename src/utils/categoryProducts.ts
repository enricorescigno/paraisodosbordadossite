
import { Product } from '../types/product';

// Import infantilProducts from emptyProducts
import { infantilProducts } from './products/emptyProducts';

// Import vestuario products
import { 
  bonesProducts,
  bordadosProducts,
  bordadosInfantisProducts,
  vestuarioProducts,
  banhoProducts,
  camaProducts,
  mesaCozinhaProducts,
  tapeteCortinasProducts
} from './products';

// Create the combined collection of all products - include the infantil and vestuario products
export const allCategoryProducts: Product[] = [
  ...bonesProducts,
  ...bordadosProducts,
  ...bordadosInfantisProducts,
  ...vestuarioProducts,
  ...banhoProducts,
  ...camaProducts,
  ...mesaCozinhaProducts,
  ...tapeteCortinasProducts,
  ...infantilProducts
];
