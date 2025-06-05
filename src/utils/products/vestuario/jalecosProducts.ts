
import { Product } from '../../../types/product';

export const jalecosProducts: Product[] = [
  {
    id: "vestuario-7",
    name: "Jaleco Masculino - Oxford",
    type: "product",
    category: "Vestuário",
    description: "Jaleco masculino em tecido Oxford, ideal para profissionais da saúde e laboratórios.",
    price: {
      value: "R$ 75,00"
    },
    rating: {
      value: 4.7
    },
    features: {
      specifications: [
        "Tecido Oxford resistente",
        "Bolsos funcionais",
        "Design profissional"
      ],
      materials: ["Tecido Oxford"],
      care: ["Lavar à máquina", "Ferro quente", "Pode usar alvejante"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/2c3695dd-a4f6-4c45-99bb-7fde35c959d2.png",
        alt: "Jaleco Masculino Oxford",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/2c3695dd-a4f6-4c45-99bb-7fde35c959d2.png", alt: "Jaleco Masculino Oxford", order: 0 }
      ]
    },
    keywords: ["jaleco", "masculino", "oxford", "profissional", "saúde"],
    stock: {
      quantity: 30,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  },
  {
    id: "vestuario-8",
    name: "Jaleco Feminino - Oxford",
    type: "product",
    category: "Vestuário",
    description: "Jaleco feminino em tecido Oxford, ideal para profissionais da saúde e laboratórios.",
    price: {
      value: "R$ 72,00"
    },
    rating: {
      value: 4.7
    },
    features: {
      specifications: [
        "Tecido Oxford resistente",
        "Corte feminino",
        "Bolsos funcionais",
        "Design profissional"
      ],
      materials: ["Tecido Oxford"],
      care: ["Lavar à máquina", "Ferro quente", "Pode usar alvejante"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/0052cf5e-35e5-4906-9aa3-cd14c952d781.png",
        alt: "Jaleco Feminino Oxford",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/0052cf5e-35e5-4906-9aa3-cd14c952d781.png", alt: "Jaleco Feminino Oxford", order: 0 }
      ]
    },
    keywords: ["jaleco", "feminino", "oxford", "profissional", "saúde"],
    stock: {
      quantity: 25,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  }
];
