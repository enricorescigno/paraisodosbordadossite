
import { Product } from '../../../../types/product';

export const outrosBrandsRoupoes: Product[] = [
  {
    id: "b23",
    name: "Roupão Adulto - CavHome",
    type: "product",
    category: "Banho",
    imageUrl: "/lovable-uploads/e4a8a28a-6db7-4203-842e-08d2cf566bdc.png",
    description: "Roupão adulto da CavHome, com design moderno e material de alta qualidade.",
    price: "R$ 208,00",
    colors: ["Branco", "#CFB8B0", "#232E51"],
    images: {
      "Branco": ["/lovable-uploads/e4a8a28a-6db7-4203-842e-08d2cf566bdc.png"],
      "#CFB8B0": ["/lovable-uploads/52bb2db0-8d39-4175-a1bd-f1efeb7f4094.png"],
      "#232E51": ["/lovable-uploads/93675d08-ecfc-4660-b3cd-f27c00dd3637.png"]
    },
    sizes: ["M", "G", "GG"],
    rating: 4.5,
    isNew: false,
    features: [
      "Design CavHome",
      "Material nobre",
      "Conforto premium"
    ]
  },
  {
    id: "b28",
    name: "Roupão microfibra toque macio - Corttex",
    type: "product",
    category: "Banho",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Roupão em microfibra da Corttex, com toque extremamente macio e confortável.",
    price: "R$ 98,00",
    colors: ["Cinza", "Azul", "Bege"],
    sizes: ["M", "G"],
    rating: 4.4,
    isNew: false,
    features: [
      "Microfibra de alta qualidade",
      "Toque ultra macio",
      "Leve e confortável"
    ]
  }
];
