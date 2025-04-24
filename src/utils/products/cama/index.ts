
import { Product } from '../../../types/product';
import { lencoisProducts } from './lencois';
import { travesseirosProducts } from './travesseiros';
import { protetoresProducts } from './protetores';
import { almofadasProducts } from './almofadas';

// Combine all bed products
export const camaProducts: Product[] = [
  ...lencoisProducts,
  ...travesseirosProducts,
  ...protetoresProducts,
  ...almofadasProducts
];

// Re-export individual collections
export {
  lencoisProducts,
  travesseirosProducts,
  protetoresProducts,
  almofadasProducts
};
