
import { Product } from '../../../types/product';
import { toalhasProducts } from './toalhasProducts';
import { roupoesProducts } from './roupoesProducts';
import { toalhasVariasProducts } from './toalhasVariasProducts';
import { toalhasPraiaProducts } from './toalhasPraiaProducts';

// Combine all banho products
export const banhoProducts: Product[] = [
  ...toalhasProducts,
  ...roupoesProducts,
  ...toalhasVariasProducts,
  ...toalhasPraiaProducts
];

// Export individual collections for more granular imports if needed
export {
  toalhasProducts,
  roupoesProducts,
  toalhasVariasProducts,
  toalhasPraiaProducts
};
