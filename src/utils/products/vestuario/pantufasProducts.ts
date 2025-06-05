
import { Product } from '../../../types/product';

export const pantufasProducts: Product[] = [
  {
    id: "vestuario-3",
    name: "Pantufa Cotele",
    type: "product",
    category: "Vestuário",
    description: "Pantufa modelo Cotele, macia e confortável para uso doméstico.",
    price: {
      value: "R$ 98,00"
    },
    variants: {
      colors: ["Bege", "Cinza"],
      sizes: ["34-36", "37-39", "40-42"]
    },
    rating: {
      value: 4.8
    },
    features: {
      specifications: [
        "Material macio e confortável",
        "Sola antiderrapante",
        "Design elegante"
      ],
      materials: ["Tecido cotele", "Sola borracha"],
      care: ["Lavar à mão", "Secar à sombra"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/deffe1d3-4ea9-4bac-af0b-968592271c09.png",
        alt: "Pantufa Cotele",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/deffe1d3-4ea9-4bac-af0b-968592271c09.png", alt: "Pantufa Cotele", order: 0 },
        { url: "/lovable-uploads/8ef339fb-f352-446f-8084-fc4f47afb4cd.png", alt: "Pantufa Cotele - Detalhe", order: 1 }
      ]
    },
    keywords: ["pantufa", "cotele", "calçado", "conforto"],
    stock: {
      quantity: 40,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  },
  {
    id: "vestuario-4",
    name: "Pantufa Popom",
    type: "product",
    category: "Vestuário",
    description: "Pantufa modelo Popom, macia e quentinha para os dias frios.",
    price: {
      value: "R$ 98,00"
    },
    variants: {
      colors: ["Rosa", "Bege"],
      sizes: ["34-36", "37-39", "40-42"]
    },
    rating: {
      value: 4.7
    },
    isNew: true,
    features: {
      specifications: [
        "Extra macia",
        "Detalhes em pompom",
        "Sola antiderrapante"
      ],
      materials: ["Tecido macio", "Pompom", "Sola borracha"],
      care: ["Lavar à mão", "Secar à sombra", "Não torcer"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/c7a9518a-56f6-41c6-9797-b1f9e0fb7c34.png",
        alt: "Pantufa Popom",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/c7a9518a-56f6-41c6-9797-b1f9e0fb7c34.png", alt: "Pantufa Popom", order: 0 },
        { url: "/lovable-uploads/b7fa37c5-9cee-4599-abbc-d07300366e9e.png", alt: "Pantufa Popom - Variação", order: 1 }
      ]
    },
    keywords: ["pantufa", "popom", "pompom", "calçado", "conforto"],
    stock: {
      quantity: 35,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  },
  {
    id: "vestuario-9",
    name: "Pantufa Toque de Seda",
    type: "product",
    category: "Vestuário",
    description: "Pantufa com toque de seda, extremamente macia e confortável.",
    price: {
      value: "R$ 58,00"
    },
    variants: {
      colors: ["Bege", "Marrom", "Cinza"],
      sizes: ["34-36", "37-39", "40-42"]
    },
    rating: {
      value: 4.9
    },
    isNew: true,
    features: {
      specifications: [
        "Acabamento que imita a textura da seda",
        "Extremamente macia",
        "Sola antiderrapante",
        "Design elegante"
      ],
      materials: ["Tecido com toque de seda", "Sola borracha"],
      care: ["Lavar à mão", "Secar à sombra", "Não usar amaciante"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png",
        alt: "Pantufa Toque de Seda",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png", alt: "Pantufa Toque de Seda", order: 0 }
      ]
    },
    keywords: ["pantufa", "toque de seda", "calçado", "conforto"],
    stock: {
      quantity: 20,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  }
];
