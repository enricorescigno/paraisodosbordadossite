import { Product } from '../../types/product';
import { bonesProducts } from './bonesProducts';
import { bordadosProducts } from './bordadosProducts';
import { bordadosInfantisProducts } from './bordadosInfantisProducts';
import { vestuarioProducts, bordadoVestuarioProducts } from './vestuarioProducts';
import { banhoProducts } from './banhoProducts';
import { camaProducts } from './cama';
import { mesaCozinhaProducts } from './mesaCozinhaProducts';
import { tapeteCortinasProducts } from './tapeteCortinasProducts';
import { 
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
  bordadoVestuarioProducts,
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
  ...bordadoVestuarioProducts,
  ...banhoProducts,
  ...camaProducts,
  ...mesaCozinhaProducts,
  ...tapeteCortinasProducts,
  ...infantilProducts
];
