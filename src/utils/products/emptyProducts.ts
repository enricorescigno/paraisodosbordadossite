
import { Product } from '../../types/product';

// Adding new Infantil products as requested
export const infantilProducts: Product[] = [
  {
    id: "infantil-1",
    name: "Roupão Infantil Cinderella",
    type: "product",
    category: "infantil",
    imageUrl: "/lovable-uploads/c5a5f1e0-a7bb-49d6-bdc5-b6382ccdc453.png", // Using a placeholder image
    description: "Roupão infantil temático da Cinderella, macio e confortável.",
    price: "R$ 153,00",
    keywords: ["infantil", "roupão", "criança", "cinderela", "cinderella", "banho"],
    slug: "roupao-infantil-cinderella",
    isNew: true
  },
  {
    id: "infantil-2",
    name: "Camisa Básica Infantil",
    type: "product",
    category: "infantil",
    imageUrl: "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png", // Using a placeholder image
    description: "Camisa básica infantil, confortável e de alta qualidade.",
    price: "R$ 24,00",
    keywords: ["infantil", "camisa", "básica", "criança", "vestuário"],
    slug: "camisa-basica-infantil"
  },
  {
    id: "infantil-3",
    name: "Toalha de Banho Lila",
    type: "product",
    category: "infantil",
    imageUrl: "/lovable-uploads/1bb354e7-598f-421d-9f97-f716da838757.png", // Using a placeholder image
    description: "Toalha de banho infantil modelo Lila, macia e absorvente.",
    price: "R$ 72,00",
    keywords: ["infantil", "toalha", "banho", "lila", "criança"],
    slug: "toalha-de-banho-lila"
  },
  {
    id: "infantil-4",
    name: "Toalha de Banho Baby Classic",
    type: "product",
    category: "infantil",
    imageUrl: "/lovable-uploads/120d7ca4-3d83-432d-81df-5bcf1993da75.png", // Using a placeholder image
    description: "Toalha de banho para bebês modelo clássico, super macia e absorvente.",
    price: "R$ 62,00",
    keywords: ["infantil", "toalha", "banho", "baby", "bebê", "clássica"],
    slug: "toalha-de-banho-baby-classic"
  },
  {
    id: "infantil-5",
    name: "Toalha de Banho com Capuz Velour Baby Love",
    type: "product",
    category: "infantil",
    imageUrl: "/lovable-uploads/979b2ce8-93f3-4b1a-afee-992dd0bbabc4.png", // Using a placeholder image
    description: "Toalha de banho com capuz em velour para bebês, modelo Baby Love.",
    price: "R$ 69,90",
    keywords: ["infantil", "toalha", "banho", "capuz", "baby", "bebê", "velour"],
    slug: "toalha-de-banho-capuz-velour-baby-love"
  },
  {
    id: "infantil-6",
    name: "Roupão infantil Aristogatas",
    type: "product",
    category: "infantil",
    imageUrl: "/lovable-uploads/c5a5f1e0-a7bb-49d6-bdc5-b6382ccdc453.png", // Using a placeholder image
    description: "Roupão infantil temático dos Aristogatas, macio e confortável.",
    price: "R$ 153,00",
    keywords: ["infantil", "roupão", "criança", "aristogatas", "banho"],
    slug: "roupao-infantil-aristogatas",
    isNew: true
  },
  {
    id: "infantil-7",
    name: "Toalha de Banho Baby Kids (sem capuz)",
    type: "product",
    category: "infantil",
    imageUrl: "/lovable-uploads/979b2ce8-93f3-4b1a-afee-992dd0bbabc4.png", // Using a placeholder image
    description: "Toalha de banho infantil modelo Baby Kids sem capuz, macia e absorvente.",
    price: "R$ 58,80",
    keywords: ["infantil", "toalha", "banho", "baby", "bebê", "kids"],
    slug: "toalha-de-banho-baby-kids"
  }
];

// Empty collections for product categories that we're removing or not currently using
export const pantufaProducts: Product[] = [];
export const camisetasProducts: Product[] = [];
export const camisasPoloProducts: Product[] = [];
export const jalecosProducts: Product[] = [];
export const roupoesProducts: Product[] = [];
export const toalhasProducts: Product[] = [];
