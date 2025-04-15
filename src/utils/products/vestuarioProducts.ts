
import { Product } from '../../types/product';

// Vestuário Collection (regular clothing products)
export const vestuarioProducts: Product[] = [
  {
    id: "vestuario-1",
    name: "Camisa Básica unisex 100% algodão adulto",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png",
    description: "Camisa básica unisex confeccionada em 100% algodão, confortável e de alta qualidade.",
    price: "R$ 29,90",
    colors: ["Branco", "Preto", "Cinza"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    isNew: false,
    features: [
      "100% algodão",
      "Tecido macio",
      "Confortável"
    ],
    images: [
      "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png"
    ],
    keywords: ["camisa", "básica", "unisex", "algodão", "adulto"]
  },
  {
    id: "vestuario-2",
    name: "Camisa Polo Masculina",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png",
    description: "Camisa polo masculina de alta qualidade, ideal para ambientes casuais ou formais.",
    price: "Sob consulta",
    colors: ["Azul", "Preto", "Branco"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.6,
    isNew: false,
    features: [
      "Tecido de alta qualidade",
      "Design elegante",
      "Confortável para uso diário"
    ],
    images: [
      "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png"
    ],
    keywords: ["camisa", "polo", "masculina"]
  },
  {
    id: "vestuario-3",
    name: "Pantufa Cotele",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png",
    description: "Pantufa modelo Cotele, macia e confortável para uso doméstico.",
    price: "R$ 98,00",
    colors: ["Bege", "Cinza"],
    sizes: ["34-36", "37-39", "40-42"],
    rating: 4.8,
    isNew: true,
    features: [
      "Material macio e confortável",
      "Sola antiderrapante",
      "Design elegante"
    ],
    images: [
      "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png"
    ],
    keywords: ["pantufa", "cotele", "calçado", "conforto"]
  },
  {
    id: "vestuario-4",
    name: "Pantufa Popom",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png",
    description: "Pantufa modelo Popom, macia e quentinha para os dias frios.",
    price: "R$ 98,00",
    colors: ["Rosa", "Azul", "Cinza"],
    sizes: ["34-36", "37-39", "40-42"],
    rating: 4.7,
    isNew: true,
    features: [
      "Extra macia",
      "Detalhes em pompom",
      "Sola antiderrapante"
    ],
    images: [
      "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png"
    ],
    keywords: ["pantufa", "popom", "pompom", "calçado", "conforto"]
  },
  {
    id: "vestuario-5",
    name: "Robe",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/c5a5f1e0-a7bb-49d6-bdc5-b6382ccdc453.png",
    description: "Robe confortável para uso doméstico, perfeito para relaxar após o banho.",
    price: "R$ 59,90",
    colors: ["Branco", "Bege", "Azul claro"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.6,
    isNew: false,
    features: [
      "Material macio e absorvente",
      "Cinto ajustável",
      "Confortável e elegante"
    ],
    images: [
      "/lovable-uploads/c5a5f1e0-a7bb-49d6-bdc5-b6382ccdc453.png"
    ],
    keywords: ["robe", "roupão", "banho", "conforto"]
  },
  {
    id: "vestuario-6",
    name: "Camisa Básica Infantil",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png",
    description: "Camisa básica infantil, confortável e de alta qualidade para crianças.",
    price: "R$ 24,00",
    colors: ["Branco", "Azul", "Rosa"],
    sizes: ["2 anos", "4 anos", "6 anos", "8 anos"],
    rating: 4.8,
    isNew: false,
    features: [
      "Tecido macio e confortável",
      "Ótimo para o dia a dia",
      "Fácil de lavar"
    ],
    images: [
      "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png"
    ],
    keywords: ["camisa", "básica", "infantil", "criança"]
  },
  {
    id: "vestuario-7",
    name: "Jaleco Masculino - Oxford",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png",
    description: "Jaleco masculino em tecido Oxford, ideal para profissionais da saúde e laboratórios.",
    price: "R$ 75,00",
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    isNew: false,
    features: [
      "Tecido Oxford resistente",
      "Bolsos funcionais",
      "Design profissional"
    ],
    images: [
      "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png"
    ],
    keywords: ["jaleco", "masculino", "oxford", "profissional", "saúde"]
  },
  {
    id: "vestuario-8",
    name: "Jaleco Feminino - Oxford",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png",
    description: "Jaleco feminino em tecido Oxford, ideal para profissionais da saúde e laboratórios.",
    price: "R$ 72,00",
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    isNew: false,
    features: [
      "Tecido Oxford resistente",
      "Corte feminino",
      "Bolsos funcionais",
      "Design profissional"
    ],
    images: [
      "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png"
    ],
    keywords: ["jaleco", "feminino", "oxford", "profissional", "saúde"]
  },
  {
    id: "vestuario-9",
    name: "Pantufa Toque de Seda",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png",
    description: "Pantufa com toque de seda, extremamente macia e confortável.",
    price: "R$ 58,00",
    colors: ["Bege", "Marrom", "Cinza"],
    sizes: ["34-36", "37-39", "40-42"],
    rating: 4.9,
    isNew: true,
    features: [
      "Acabamento que imita a textura da seda",
      "Extremamente macia",
      "Sola antiderrapante",
      "Design elegante"
    ],
    images: [
      "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png"
    ],
    keywords: ["pantufa", "toque de seda", "calçado", "conforto"]
  }
];

// These products are for the "Bordado em Vestuário" portfolio section
export const bordadoVestuarioProducts: Product[] = [
  {
    id: 201,
    name: "Bordado em Camisa Básica - Casa e Condomínio",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado em uma camisa básica com o logo de Casa e Condomínio.",
    price: "Sob consulta",
    colors: ["Azul", "Preto"],
    sizes: ["P", "M", "G"],
    rating: 4.7,
    isNew: false,
    features: [
      "Camisa confortável",
      "Logo bordado",
      "Disponível em várias cores"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["camisa", "bordado", "casa", "condomínio", "logo"]
  },
  {
    id: 202,
    name: "Bordado em Camisa - Impcatto",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado de logo em camisa para a empresa Impcatto.",
    price: "Sob consulta",
    colors: ["Verde", "Preto"],
    sizes: ["M", "G", "GG"],
    rating: 4.5,
    isNew: true,
    features: [
      "Material resistente",
      "Logo bordado com detalhes",
      "Tamanho variado"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["camisa", "bordado", "impcatto", "logo", "empresa"]
  },
  {
    id: 203,
    name: "Bordado em Fardamento - Pet Dream",
    type: "portfolio",
    category: "Bordado em Fardamentos",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado do logo Pet Dream em fardamento para hospital veterinário.",
    price: "Sob consulta",
    colors: ["Verde", "Branco"],
    sizes: ["M", "G"],
    rating: 4.8,
    isNew: false,
    features: [
      "Design único para veterinários",
      "Bordado em fardamento",
      "Confortável e durável"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["fardamento", "bordado", "pet", "dream", "veterinário", "hospital"]
  },
  {
    id: 204,
    name: "Bordado em Camisa - Girassol",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado com design de girassol na camisa.",
    price: "Sob consulta",
    colors: ["Verde", "Amarelo"],
    sizes: ["P", "M", "G"],
    rating: 4.8,
    isNew: true,
    features: [
      "Design floral",
      "Bordado criativo",
      "Camisa de alta qualidade"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["camisa", "bordado", "girassol", "floral", "design"]
  },
  {
    id: 205,
    name: "Bordado em Fardamento para Times de Futebol",
    type: "portfolio",
    category: "Bordado em Fardamentos",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado em fardamento para diversos times de futebol.",
    price: "Sob consulta",
    colors: ["Vários times"],
    sizes: ["P", "M", "G"],
    rating: 4.6,
    isNew: true,
    features: [
      "Bordado personalizado para clubes",
      "Confortável e prático",
      "Fardamento ideal para times"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["fardamento", "bordado", "futebol", "times", "clube", "esportes"]
  },
  {
    id: 206,
    name: "Bordado em Fardamento - Biscoitos Feitos por Nós",
    type: "portfolio",
    category: "Bordado em Fardamentos",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado do logo 'Biscoitos Feitos Por Nós' em fardamento.",
    price: "Sob consulta",
    colors: ["Branco", "Vermelho"],
    sizes: ["M", "G"],
    rating: 4.7,
    isNew: false,
    features: [
      "Fardamento personalizado",
      "Ideal para empresas",
      "Confortável e durável"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["fardamento", "bordado", "biscoitos", "culinária", "uniforme"]
  },
  {
    id: 207,
    name: "Bordado em Camisa - Capibaribe",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado de logo do time Capibaribe em uma camisa.",
    price: "Sob consulta",
    colors: ["Preto", "Amarelo"],
    sizes: ["G", "GG"],
    rating: 4.6,
    isNew: false,
    features: [
      "Design esportivo",
      "Bordado preciso",
      "Camisa confortável"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["camisa", "bordado", "capibaribe", "time", "esporte"]
  },
  {
    id: 208,
    name: "Bordado em Camisa - Doutor Pet",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado com o logo Doutor Pet na camisa.",
    price: "Sob consulta",
    colors: ["Verde", "Amarelo"],
    sizes: ["P", "M", "G"],
    rating: 4.4,
    isNew: true,
    features: [
      "Design pet",
      "Ideal para donos de pet",
      "Alta qualidade"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["camisa", "bordado", "doutor pet", "pet", "animal"]
  },
  {
    id: 209,
    name: "Bordado em Avental",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop",
    description: "Bordado de logo ou texto em avental.",
    price: "Sob consulta",
    colors: ["Branco", "Preto"],
    sizes: ["P", "M", "G"],
    rating: 4.7,
    isNew: false,
    features: [
      "Ideal para profissionais",
      "Bordado personalizável",
      "Avental de alta qualidade"
    ],
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=500&auto=format&fit=crop"
    ],
    keywords: ["avental", "bordado", "cozinha", "chef", "personalizado"]
  }
];
