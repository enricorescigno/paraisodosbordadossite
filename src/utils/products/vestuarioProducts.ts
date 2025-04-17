
import { Product } from '../../types/product';

// Bordado em Vestuário collection
export const bordadoVestuarioProducts: Product[] = [
  {
    id: 901,
    name: "Bordado em Avental - Personalizado",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: "",
    description: "Avental com bordado personalizado, ideal para cozinheiros, chefs e empresas do ramo alimentício.",
    price: "Sob consulta",
    colors: ["Branco", "Preto"],
    sizes: ["Único"],
    rating: 5.0,
    features: [
      "Tecido resistente ao calor",
      "Bordado de alta definição",
      "Personalização com logo e nome"
    ],
    images: []
  },
  {
    id: 902,
    name: "Bordado em Fardamento para Times de Futebol",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: "/lovable-uploads/58739ba7-3b07-4be7-8a25-dd721a363924.png",
    description: "Bordados profissionais para times de futebol, com alta qualidade e precisão. Reproduzimos escudos de times nacionais e internacionais como Paris Saint-Germain, Olympique de Marseille e Montpellier.",
    price: "Sob consulta",
    colors: ["Azul", "Branco"],
    sizes: ["P", "M", "G", "GG"],
    rating: 5.0,
    isNew: true,
    features: [
      "Bordado de alta definição",
      "Fidelidade às cores originais dos escudos",
      "Acabamento profissional",
      "Resistente a lavagens",
      "Ideal para uniformes esportivos"
    ],
    images: [
      "/lovable-uploads/58739ba7-3b07-4be7-8a25-dd721a363924.png",
      "/lovable-uploads/aee9dd23-444e-44e3-990b-ba3476180468.png",
      "/lovable-uploads/ce9f6559-20b2-437b-8f8d-061614aaeebf.png",
      "/lovable-uploads/3c44a694-b8f4-4e17-aa40-9fc14f33aec5.png"
    ],
    keywords: ["fardamento", "uniforme", "futebol", "bordado", "times", "esporte"]
  }
];

// Vestuário collection
export const vestuarioProducts: Product[] = [
  {
    id: 101,
    name: "Camiseta Lisa",
    type: "product",
    category: "Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500&auto=format&fit=crop",
    description: "Camiseta básica de algodão, diversas cores.",
    price: "R$29,90",
    colors: ["Branco", "Preto", "Azul"],
    sizes: ["P", "M", "G"],
    rating: 4.5,
    isNew: true,
    features: [
      "Algodão penteado",
      "Costura reforçada",
      "Modelagem confortável"
    ],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["camiseta", "algodão", "básica", "cores"]
  },
  {
    id: 102,
    name: "Camisa Polo",
    type: "product",
    category: "Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4149c5773555?q=80&w=500&auto=format&fit=crop",
    description: "Camisa polo de piquet, ideal para o dia a dia.",
    price: "R$49,90",
    colors: ["Branco", "Marinho", "Cinza"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    isNew: true,
    features: [
      "Piquet de alta qualidade",
      "Gola e punhos em ribana",
      "Fechamento com botões"
    ],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4149c5773555?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["camisa polo", "piquet", "casual", "confortável"]
  },
  {
    id: 103,
    name: "Calça Jeans",
    type: "product",
    category: "Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1602471620513-2508437cae59?q=80&w=500&auto=format&fit=crop",
    description: "Calça jeans skinny, diversos tamanhos.",
    price: "R$79,90",
    colors: ["Azul", "Preto"],
    sizes: ["36", "38", "40", "42", "44"],
    rating: 4.6,
    isNew: true,
    features: [
      "Jeans com elastano",
      "Modelagem skinny",
      "Cós com passantes"
    ],
    images: [
      "https://images.unsplash.com/photo-1602471620513-2508437cae59?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["calça jeans", "skinny", "denim", "tamanhos"]
  },
  {
    id: 104,
    name: "Jaqueta de Couro",
    type: "product",
    category: "Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1585580533049-84b3604b9498?q=80&w=500&auto=format&fit=crop",
    description: "Jaqueta de couro sintético, forro interno.",
    price: "R$149,90",
    colors: ["Preto", "Marrom"],
    sizes: ["P", "M", "G"],
    rating: 4.8,
    isNew: true,
    features: [
      "Couro sintético de alta qualidade",
      "Forro em poliéster",
      "Fechamento com zíper"
    ],
    images: [
      "https://images.unsplash.com/photo-1585580533049-84b3604b9498?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["jaqueta", "couro sintético", "estilo", "inverno"]
  },
  {
    id: 105,
    name: "Moletom Canguru",
    type: "product",
    category: "Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500&auto=format&fit=crop",
    description: "Moletom com capuz e bolso canguru, flanelado.",
    price: "R$69,90",
    colors: ["Cinza", "Preto", "Vinho"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.6,
    isNew: true,
    features: [
      "Moletom flanelado",
      "Capuz com cordão",
      "Bolso canguru"
    ],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["moletom", "canguru", "conforto", "inverno"]
  }
];
