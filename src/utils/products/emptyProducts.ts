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
    keywords: ["infantil", "roupão", "criança", "cinderela", "cinderela", "banho"],
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
    imageUrl: "/lovable-uploads/2d5a7e2c-50c4-4f92-9d2a-12d97193274f.png",
    description: "Toalha de banho infantil modelo Lila, macia e absorvente com estampa delicada de fadas.",
    price: "R$ 72,00",
    colors: ["Rosa", "Rosa Claro"],
    features: [
      "100% Algodão",
      "Extra macia e absorvente",
      "Delicada estampa de fadas",
      "Acabamento premium",
      "Ideal para crianças"
    ],
    images: [
      "/lovable-uploads/2d5a7e2c-50c4-4f92-9d2a-12d97193274f.png",
      "/lovable-uploads/a723a589-9a41-4a97-9fe5-ee36ed3e1bde.png"
    ],
    keywords: ["infantil", "toalha", "banho", "lila", "criança", "fadas"],
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
    imageUrl: "/lovable-uploads/82024bd5-b905-4876-94c7-58650231e3bc.png",
    description: "Toalha de banho com capuz em velour para bebês, modelo Baby Love. Confeccionada em tecido macio e absorvente com delicado bordado de girafinha no capuz.",
    price: "R$ 69,90",
    colors: ["Branco"],
    features: [
      "100% Algodão",
      "Tecido velour extra macio",
      "Capuz com bordado de girafinha",
      "Alta absorção",
      "Ideal para bebês"
    ],
    images: ["/lovable-uploads/82024bd5-b905-4876-94c7-58650231e3bc.png"],
    keywords: ["infantil", "toalha", "banho", "capuz", "baby", "bebê", "velour", "girafinha"],
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
