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

// Bordados Infantis Collection - New products being added
export const bordadosInfantisProducts: Product[] = [
  {
    id: 1001,
    name: "Bordado em Camisa Infantil - Caminhão",
    type: "product",
    category: "Bordados Infantis",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Camisa infantil com bordado de caminhão, ideal para crianças aventureiras.",
    price: "Sob consulta",
    colors: ["Branco"],
    sizes: ["P", "M", "G"],
    rating: 4.7,
    isNew: true,
    features: [
      "Bordado de alta qualidade",
      "Tecido confortável",
      "Ideal para o dia a dia"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["camisa", "infantil", "bordado", "caminhão", "criança"]
  },
  {
    id: 1002,
    name: "Bordado em Fralda de Tecido - Nome",
    type: "product",
    category: "Bordados Infantis",
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop",
    description: "Fralda de tecido personalizada com bordado do nome, ideal para presente de bebê.",
    price: "Sob consulta",
    colors: ["Rosa", "Lilás"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: [
      "Bordado personalizado",
      "Tecido macio e confortável",
      "Presente ideal para bebês"
    ],
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["fralda", "tecido", "bebê", "personalizado", "bordado"]
  },
  {
    id: 1003,
    name: "Bordado em Fralda de Tecido - Davi",
    type: "product",
    category: "Bordados Infantis",
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop",
    description: "Fralda personalizada com bordado de nome, perfeito para o dia a dia do bebê.",
    price: "Sob consulta",
    colors: ["Verde", "Branco"],
    sizes: ["Único"],
    rating: 5.0,
    isNew: true,
    features: [
      "Personalização exclusiva",
      "Ideal para bebês",
      "Conforto e maciez"
    ],
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["fralda", "tecido", "personalizado", "bebê", "davi", "bordado"]
  },
  {
    id: 1004,
    name: "Bordado em Macacão - Leãozinho Safari",
    type: "product",
    category: "Bordados Infantis",
    imageUrl: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=500&auto=format&fit=crop",
    description: "Macacão infantil com bordado de leãozinho, ideal para os pequenos aventureiros.",
    price: "Sob consulta",
    colors: ["Cinza", "Bege"],
    sizes: ["P", "M", "G"],
    rating: 4.8,
    isNew: true,
    features: [
      "Bordado encantador de leãozinho",
      "Tecido confortável",
      "Perfeito para o clima quente"
    ],
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["macacão", "infantil", "leão", "safari", "bordado"]
  },
  {
    id: 1005,
    name: "Bordado em Manta - Leãozinho",
    type: "product",
    category: "Bordados Infantis",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=500&auto=format&fit=crop",
    description: "Manta infantil com bordado de leãozinho, ideal para o aconchego do bebê.",
    price: "Sob consulta",
    colors: ["Cinza", "Amarelo"],
    sizes: ["Único"],
    rating: 4.8,
    isNew: true,
    features: [
      "Bordado de leãozinho",
      "Manta macia e quente",
      "Perfeito para bebês"
    ],
    images: [
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["manta", "infantil", "leão", "bebê", "bordado"]
  }
];

// Bordados em Bolsas Collection - Updated with new products
export const bordadosProducts: Product[] = [
  // New Bordado em Bolsas products
  {
    id: 2001,
    name: "Bordado em Necessaire - Voice Tec",
    type: "product",
    category: "Bordado em Bolsa",
    imageUrl: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop",
    description: "Necessaire com bordado personalizado da marca Voice Tec.",
    price: "Sob consulta",
    colors: ["Cinza"],
    sizes: ["Único"],
    rating: 4.6,
    isNew: true,
    features: [
      "Bordado exclusivo",
      "Tecido resistente",
      "Perfeito para organizar acessórios"
    ],
    images: [
      "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["necessaire", "bordado", "personalizado", "voice tec"]
  },
  {
    id: 2002,
    name: "Bordado em Bolsas - Imparáveis",
    type: "product",
    category: "Bordado em Bolsa",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop",
    description: "Bolsa de alta qualidade com bordado exclusivo da coleção Imparáveis.",
    price: "Sob consulta",
    colors: ["Preto"],
    sizes: ["Único"],
    rating: 4.8,
    isNew: true,
    features: [
      "Design elegante",
      "Bordado sofisticado",
      "Ideal para o dia a dia"
    ],
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["bolsa", "bordado", "imparáveis", "personalizado"]
  },
  {
    id: 2003,
    name: "Bordado em Necessaire + Toalha de Rosto",
    type: "product",
    category: "Bordado em Bolsa",
    imageUrl: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop",
    description: "Combo com necessaire e toalha de rosto, ambos com bordado personalizado.",
    price: "Sob consulta",
    colors: ["Preto"],
    sizes: ["Único"],
    rating: 5.0,
    isNew: true,
    features: [
      "Bordado sofisticado",
      "Prático e funcional",
      "Ótima opção para presente"
    ],
    images: [
      "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["necessaire", "toalha", "bordado", "conjunto", "kit"]
  },
  {
    id: 2004,
    name: "Bordado em Bolsas - Brows Evolution",
    type: "product",
    category: "Bordado em Bolsa",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=500&auto=format&fit=crop",
    description: "Bolsa personalizada com o bordado da marca Brows Evolution, ideal para o uso diário.",
    price: "Sob consulta",
    colors: ["Rosa"],
    sizes: ["Único"],
    rating: 4.7,
    isNew: true,
    features: [
      "Design moderno",
      "Bordado com logotipo da marca",
      "Confortável e prática"
    ],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["bolsa", "bordado", "brows evolution", "personalizado", "rosa"]
  },
  {
    id: 2005,
    name: "Bordado em Necessaire - Kit com Três Peças",
    type: "product",
    category: "Bordado em Bolsa",
    imageUrl: "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?q=80&w=500&auto=format&fit=crop",
    description: "Necessaire com bordado personalizado, kit com três peças, ideal para viagens.",
    price: "Sob consulta",
    colors: ["Rosa"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: [
      "Bordado elegante",
      "Conjunto prático e funcional",
      "Excelente para organização"
    ],
    images: [
      "https://images.unsplash.com/photo-1606522754091-a3bbf9ad4cb3?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["necessaire", "kit", "três peças", "bordado", "viagem"]
  },
  // Keep the original items after the new ones
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
  ...bordadosProducts,
  ...bordadosInfantisProducts
];
