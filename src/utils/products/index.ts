
import { Product } from '../../types/product';
import { bonesProducts } from './bonesProducts';
import { bordadosProducts } from './bordadosProducts';
import { bordadosInfantisProducts } from './bordadosInfantisProducts';
import { vestuarioProducts } from './vestuarioProducts';
import { banhoProducts } from './banhoProducts';
import { 
  camaProducts,
  mesaCozinhaProducts,
  tapeteCortinasProducts,
  infantilProducts,
  pantufaProducts,
  camisetasProducts,
  camisasPoloProducts,
  jalecosProducts,
  roupoesProducts,
  toalhasProducts
} from './emptyProducts';

// Export all product collections for backward compatibility
export {
  bonesProducts,
  bordadosProducts,
  bordadosInfantisProducts,
  vestuarioProducts,
  banhoProducts,
  camaProducts,
  mesaCozinhaProducts,
  tapeteCortinasProducts,
  infantilProducts,
  pantufaProducts,
  camisetasProducts,
  camisasPoloProducts,
  jalecosProducts,
  roupoesProducts,
  toalhasProducts
};

// Create the combined collection of all products
export const allProducts: Product[] = [
  ...bonesProducts,
  ...bordadosProducts,
  ...bordadosInfantisProducts,
  ...vestuarioProducts,
  ...banhoProducts
];
