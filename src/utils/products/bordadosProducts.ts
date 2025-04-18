
import { Product } from '../../types/product';
import { bordadoNecessaireProducts } from './bordadoNecessaireProducts';
import { bordadoBolsaProducts } from './bordadoBolsaProducts';
import { bordadoToalhaProducts } from './bordadoToalhaProducts';

// Combine all bordados products
export const bordadosProducts: Product[] = [
  ...bordadoNecessaireProducts,
  ...bordadoBolsaProducts,
  ...bordadoToalhaProducts
];
