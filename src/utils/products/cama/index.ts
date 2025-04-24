
import { Product } from '../../../types/product';
import { jogoCamaProducts } from './jogoCamaProducts';
import { travesseirosProtetoresProducts } from './travesseirosProtetoresProducts';

export const camaProducts: Product[] = [
  ...jogoCamaProducts,
  ...travesseirosProtetoresProducts
];

export {
  jogoCamaProducts,
  travesseirosProtetoresProducts
};
