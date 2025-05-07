
import { Product } from '../../../types/product';
import { toAbsoluteURL } from '../../imageUtils';

export const protetoresProducts: Product[] = [
  {
    id: "C006",
    name: "Protetor de Travesseiro",
    type: "product",
    category: "Cama",
    price: "R$ 12,00",
    description: "Protetor de travesseiro de alta qualidade para maior durabilidade e higiene.",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=500&auto=format&fit=crop",
    keywords: ["cama", "protetor", "travesseiro", "higiene"]
  },
  {
    id: "C007",
    name: "Protetor de Colchão Comfort",
    type: "product",
    category: "Cama",
    price: "A partir de R$ 120,00",
    description: "Protetor de colchão linha Comfort, disponível em diversos tamanhos para maior proteção e conforto.",
    imageUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=500&auto=format&fit=crop",
    keywords: ["cama", "protetor", "colchão", "conforto", "comfort"]
  }
];
