
import { Product } from '../../../types/product';
import { dohlerRoupoes } from './roupoes/dohlerProducts';
import { tekaRoupoes } from './roupoes/tekaProducts';
import { outrosBrandsRoupoes } from './roupoes/outrosBrandsProducts';
import { infantilRoupoes } from './roupoes/infantilRoupoes';

export const roupoesProducts: Product[] = [
  ...infantilRoupoes,
  ...dohlerRoupoes,
  ...tekaRoupoes,
  ...outrosBrandsRoupoes
];
