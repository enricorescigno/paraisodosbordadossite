import { Product } from '../../../types/product';
import { camisasProducts } from './camisasProducts';
import { jalecosProducts } from './jalecosProducts';
import { pantufasProducts } from './pantufasProducts';
import { roupoesProducts } from './roupoesProducts';

// Combine all vestuário products
export const vestuarioProducts: Product[] = [
  ...camisasProducts,
  ...jalecosProducts,
  ...pantufasProducts,
  ...roupoesProducts
];

// Export individual collections for granular imports
export {
  camisasProducts,
  jalecosProducts,
  pantufasProducts,
  roupoesProducts
};

// Portfolio products remain here for now but will be moved in Phase 2
export const bordadoVestuarioProducts: Product[] = [
  {
    id: 202,
    name: "Bordado em Camisa - Impcatto",
    type: "portfolio",
    category: "Bordado em Vestuário",
    description: "Bordado de logo em camisa para a empresa Impcatto. Trabalho detalhado em camisas verdes com bordado de alta precisão do logo da empresa em duas cores.",
    price: {
      value: "35,00"
    },
    isCustomizable: true,
    variants: {
      colors: ["Verde"],
      sizes: ["P", "M", "G", "GG"]
    },
    stock: {
      quantity: 50,
      minPurchaseQuantity: 5,
      isAvailable: true
    },
    tags: ["camisa", "bordado", "logo", "empresarial"],
    isFeatured: false,
    images: {
      primary: {
        url: "/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png",
        alt: "Bordado em Camisa - Impcatto",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png", alt: "Bordado Impcatto", order: 0 },
        { url: "/lovable-uploads/652a8949-cb0d-4fd6-8ac2-d73fdd4cd81e.png", alt: "Bordado Impcatto - Detalhe", order: 1 }
      ]
    },
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0
    },
    createdAt: "2023-04-01T10:00:00Z"
  },
  {
    id: 203,
    name: "Bordado em Fardamento - Pet Dream",
    type: "portfolio",
    category: "Bordado em Fardamentos",
    description: "Bordado do logo Pet Dream em fardamento para hospital veterinário. Disponível em branco e verde.",
    price: {
      value: "40,00"
    },
    isCustomizable: true,
    variants: {
      colors: ["Branco", "Verde"],
      sizes: ["P", "M", "G", "GG"]
    },
    stock: {
      quantity: 20,
      minPurchaseQuantity: 5,
      isAvailable: true
    },
    tags: ["fardamento", "bordado", "veterinário", "pet", "empresarial"],
    isFeatured: true,
    images: {
      primary: {
        url: "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png",
        alt: "Bordado em Fardamento - Pet Dream",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png", alt: "Bordado Pet Dream", order: 0 },
        { url: "/lovable-uploads/6d28ebce-a220-404c-b350-55f1be2bc89d.png", alt: "Bordado Pet Dream - Detalhe", order: 1 }
      ]
    },
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0
    },
    createdAt: "2023-04-02T10:00:00Z"
  },
  {
    id: 204,
    name: "Bordado em Camisa - Girassol",
    type: "portfolio",
    category: "Bordado em Vestuário",
    description: "Bordado com design de girassol na camisa. Trabalho detalhado em camisa preta com bordado de girassol amarelo.",
    price: {
      value: "30,00"
    },
    isCustomizable: true,
    variants: {
      colors: ["Preto", "Amarelo"],
      sizes: ["P", "M", "G", "GG"]
    },
    stock: {
      quantity: 40,
      minPurchaseQuantity: 1,
      isAvailable: true
    },
    tags: ["camisa", "bordado", "floral", "girassol"],
    isFeatured: true,
    images: {
      primary: {
        url: "/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png",
        alt: "Bordado em Camisa - Girassol",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png", alt: "Bordado Girassol", order: 0 }
      ]
    },
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0
    },
    createdAt: "2023-04-03T10:00:00Z"
  },
  {
    id: 205,
    name: "Bordado em Fardamento para Times de Futebol",
    type: "portfolio",
    category: "Bordado em Fardamentos",
    description: "Bordado em fardamento para diversos times de futebol europeus incluindo PSG, Marseille e Montpellier. Trabalho de alta precisão para uniformes esportivos.",
    price: {
      value: "45,00"
    },
    isCustomizable: true,
    variants: {
      colors: ["Azul", "Branco", "variados"],
      sizes: ["P", "M", "G", "GG"]
    },
    stock: {
      quantity: 100,
      minPurchaseQuantity: 10,
      isAvailable: true
    },
    tags: ["fardamento", "bordado", "futebol", "time", "esporte", "psg", "marseille", "montpellier"],
    isFeatured: true,
    images: {
      primary: {
        url: "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png",
        alt: "Bordado em Fardamento para Times de Futebol",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png", alt: "Visão geral dos times", order: 0 },
        { url: "/lovable-uploads/ee7a7e95-5675-4250-9896-fabb9b05fa82.png", alt: "Montpellier detalhe", order: 1 },
        { url: "/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png", alt: "PSG detalhe", order: 2 },
        { url: "/lovable-uploads/e577a3c9-349a-4906-860e-257b33765459.png", alt: "Marseille detalhe", order: 3 }
      ]
    },
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0
    },
    createdAt: "2023-04-04T10:00:00Z"
  },
  {
    id: 206,
    name: "Bordado em Fardamento - Biscoitos Feitos por Nós",
    type: "portfolio",
    category: "Bordado em Fardamentos",
    description: "Bordado do logo 'Biscoitos Feitos Por Nós' em fardamento. Disponível em azul marinho e branco, com design elegante para equipe de confeitaria artesanal.",
    price: {
      value: "35,00"
    },
    isCustomizable: true,
    variants: {
      colors: ["Azul Marinho", "Branco", "Vermelho"],
      sizes: ["P", "M", "G", "GG"]
    },
    stock: {
      quantity: 30,
      minPurchaseQuantity: 5,
      isAvailable: true
    },
    tags: ["fardamento", "bordado", "logo", "gastronomia", "empresarial", "confeitaria", "biscoitos"],
    isFeatured: true,
    images: {
      primary: {
        url: "/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png",
        alt: "Bordado em Fardamento - Biscoitos Feitos por Nós",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png", alt: "Bordado Biscoitos Feitos por Nós", order: 0 },
        { url: "/lovable-uploads/757b2068-de47-4d4a-9fe4-f68c46100c2d.png", alt: "Bordado Biscoitos Feitos por Nós - Detalhe", order: 1 }
      ]
    },
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0
    },
    createdAt: "2023-04-05T10:00:00Z"
  },
  {
    id: 207,
    name: "Bordado em Camisa - Capibaribe",
    type: "portfolio",
    category: "Bordado em Vestuário",
    description: "Bordado de logo do time Capibaribe em uma camisa. Detalhes nítidos na mascote do leão com contorno amarelo vibrante em fundo preto.",
    price: {
      value: "40,00"
    },
    isCustomizable: true,
    variants: {
      colors: ["Preto", "Amarelo"],
      sizes: ["P", "M", "G", "GG"]
    },
    stock: {
      quantity: 25,
      minPurchaseQuantity: 5,
      isAvailable: true
    },
    tags: ["camisa", "bordado", "futebol", "time", "esporte"],
    isFeatured: false,
    images: {
      primary: {
        url: "/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png",
        alt: "Bordado em Camisa - Capibaribe",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png", alt: "Bordado Capibaribe", order: 0 }
      ]
    },
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0
    },
    createdAt: "2023-04-06T10:00:00Z"
  },
  {
    id: 208,
    name: "Bordado em Camisa - Doutor Pet",
    type: "portfolio",
    category: "Bordado em Vestuário",
    description: "Bordado com o logo Doutor Pet na camisa. Disponível em verde, verde água e caqui. O logo apresenta um veterinário com animais de estimação em um círculo verde.",
    price: {
      value: "35,00"
    },
    isCustomizable: true,
    variants: {
      colors: ["Verde", "Verde Água", "Caqui"],
      sizes: ["P", "M", "G", "GG"]
    },
    stock: {
      quantity: 30,
      minPurchaseQuantity: 5,
      isAvailable: true
    },
    tags: ["camisa", "bordado", "veterinário", "pet", "empresarial"],
    isFeatured: true,
    images: {
      primary: {
        url: "/lovable-uploads/6406277c-f290-4a94-abb0-24f098dd74c6.png",
        alt: "Bordado em Camisa - Doutor Pet",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/6406277c-f290-4a94-abb0-24f098dd74c6.png", alt: "Bordado Doutor Pet", order: 0 },
        { url: "/lovable-uploads/d5b5532a-f97b-4e54-b83a-e67256cb21dc.png", alt: "Bordado Doutor Pet - Verde", order: 1 },
        { url: "/lovable-uploads/4a3d432f-60d7-4543-b6f8-bc13a8a3c870.png", alt: "Bordado Doutor Pet - Verde Água", order: 2 },
        { url: "/lovable-uploads/135d959f-0f03-4169-a803-d49bc2b1ea43.png", alt: "Bordado Doutor Pet - Caqui", order: 3 }
      ]
    },
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0
    },
    createdAt: "2023-04-07T10:00:00Z"
  }
];
