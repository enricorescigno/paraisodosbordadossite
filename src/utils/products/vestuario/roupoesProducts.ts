
import { Product } from '../../../types/product';

export const roupoesProducts: Product[] = [
  {
    id: "vestuario-5",
    name: "Robe",
    type: "product",
    category: "Vestuário",
    description: "Robe confortável para uso doméstico, perfeito para relaxar após o banho.",
    price: {
      value: "R$ 59,90"
    },
    variants: {
      colors: [
        "Amarelo",
        "Vermelho",
        "Rosa Pink",
        "Rosa Claro",
        "Prata",
        "Bege",
        "Branco",
        "Preto",
        "Verde Água",
        "Rose"
      ],
      sizes: ["P", "M", "G", "GG"]
    },
    rating: {
      value: 4.6
    },
    features: {
      specifications: [
        "Material macio e acetinado",
        "Cinto ajustável",
        "Confortável e elegante",
        "Diversas cores disponíveis"
      ],
      materials: ["Tecido acetinado"],
      care: ["Lavar à máquina delicada", "Não usar alvejante", "Ferro morno"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/7209d481-e3c4-46e4-8fbe-78d1b8f8ba53.png",
        alt: "Robe",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/7209d481-e3c4-46e4-8fbe-78d1b8f8ba53.png", alt: "Robe", order: 0 }
      ]
    },
    keywords: ["robe", "roupão", "banho", "conforto"],
    stock: {
      quantity: 60,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  }
];
