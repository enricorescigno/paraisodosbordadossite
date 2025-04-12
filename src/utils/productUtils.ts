import { Product } from '../types/product';

// Bonés Collection
export const bonesProducts: Product[] = [
  {
    id: 300,
    name: "Boné Bordado Frase",
    type: "product",
    category: "Bonés Bordados",
    imageUrl: "/lovable-uploads/bone-vermelho.png",
    description: "Boné casual com bordado, confeccionado em tecido macio e ajuste regulável.",
    price: "Sob consulta",
    colors: ["Vermelho", "Azul", "Branco", "Preto"],
    sizes: ["Único"],
    rating: 4.8,
    isNew: true,
    features: [
      "Bordado de alta qualidade",
      "Tecido durável",
      "Ajuste traseiro",
      "Design moderno"
    ],
    images: [
      "/lovable-uploads/bone-vermelho.png",
      "/lovable-uploads/bone-azul.png",
      "/lovable-uploads/bone-branco.png",
      "/lovable-uploads/bone-preto.png"
    ],
    keywords: ["boné", "bordado", "respira", "casual", "acessório"]
  },
  {
    id: 303,
    name: "Boné Bordado Logomarca Geométrica",
    type: "product",
    category: "Bonés Bordados",
    imageUrl: "/lovable-uploads/c4a8d0f3-ea47-4a53-9ddf-94cb81607643.png",
    description: "Boné com bordado de logomarca geométrica, design exclusivo e diferenciado com estilo contemporâneo.",
    price: "Sob consulta",
    colors: ["Vermelho", "Rosa", "Amarelo", "Verde", "Branco"],
    sizes: ["Único"],
    rating: 4.8,
    isNew: true,
    features: [
      "Bordado geométrico exclusivo",
      "Material premium",
      "Aba reta ou curvada",
      "Design moderno"
    ],
    images: [
      "/lovable-uploads/c4a8d0f3-ea47-4a53-9ddf-94cb81607643.png"
    ],
    keywords: ["boné", "bordado", "logomarca", "geométrico", "exclusivo"]
  }
];

// Bordados Collection - keeping only the requested ones
export const bordadosProducts: Product[] = [
  // Bordados em Bolsas
  {
    id: 901,
    name: "Bordado em Bolsas - Imparáveis",
    type: "portfolio",
    category: "Bordado em Bolsa",
    imageUrl: "",
    description: "Bolsa preta com bordado personalizado 'Imparáveis'. Perfeita para eventos ou uso pessoal.",
    price: "Sob consulta",
    colors: ["Preto"],
    sizes: ["Único"],
    rating: 4.7,
    isNew: true,
    features: ["Espaçosa", "Durável", "Bordado institucional", "Design versátil"],
    images: []
  },
  {
    id: 903,
    name: "Bordado em Bolsas - Brows Evolution",
    type: "portfolio",
    category: "Bordado em Bolsa",
    imageUrl: "",
    description: "Bolsa rosa bordada com logo da Brows Evolution. Estilo e identidade para profissionais da beleza.",
    price: "Sob consulta",
    colors: ["Rosa"],
    sizes: ["Único"],
    rating: 4.7,
    isNew: true,
    features: ["Design moderno", "Bordado elegante", "Ideal para estúdios", "Compacta"],
    images: []
  },
  {
    id: 900,
    name: "Bordado em Necessaire - Voice Tec",
    type: "portfolio",
    category: "Bordado em Necessaire",
    imageUrl: "",
    description: "Necessaire com bordado corporativo da Voice Tec. Ideal para brindes e uso profissional.",
    price: "Sob consulta",
    colors: ["Cinza"],
    sizes: ["Único"],
    rating: 4.8,
    isNew: true,
    features: ["Bordado personalizado", "Material resistente", "Compacta e funcional", "Design elegante"],
    images: []
  },
  {
    id: 902,
    name: "Bordado em Necessaire + Toalha de rosto",
    type: "portfolio",
    category: "Bordado em Necessaire",
    imageUrl: "",
    description: "Kit com necessaire e toalha bordada. Ideal para presentes personalizados.",
    price: "Sob consulta",
    colors: ["Preto"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: ["Conjunto prático", "Acabamento premium", "Ideal para uso pessoal", "Bordado fino"],
    images: []
  }
];

// Create empty collections for other product categories that we're removing
export const camaProducts: Product[] = [];
export const mesaCozinhaProducts: Product[] = [];
export const tapeteCortinasProducts: Product[] = [];
export const banhoProducts: Product[] = [];
export const infantilProducts: Product[] = [];
export const vestuarioProducts: Product[] = [];
export const pantufaProducts: Product[] = [];
export const camisetasProducts: Product[] = [];
export const camisasPoloProducts: Product[] = [];
export const jalecosProducts: Product[] = [];
export const roupoesProducts: Product[] = [];
export const toalhasProducts: Product[] = [];

// Create the combined collection of all products
export const allProducts: Product[] = [
  ...bonesProducts,
  ...bordadosProducts
];
