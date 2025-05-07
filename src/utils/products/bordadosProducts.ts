
import { Product } from '../../types/product';
import { toAbsoluteURL } from '../imageUtils';

// Bordados em Bolsas Collection
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
    imageUrl: toAbsoluteURL("/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png"),
    description: "Bolsa de alta qualidade com bordado exclusivo da coleção Imparáveis.",
    price: "Sob consulta",
    colors: ["Preto"],
    sizes: ["Único"],
    rating: 4.8,
    features: [
      "Design elegante",
      "Bordado sofisticado",
      "Ideal para o dia a dia"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png"),
      toAbsoluteURL("/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png"),
      toAbsoluteURL("/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png"),
      toAbsoluteURL("/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png"),
      toAbsoluteURL("/lovable-uploads/185199e6-f644-4c5e-9df7-7c45a81dda9b.png"),
      toAbsoluteURL("/lovable-uploads/77747fae-966b-471d-925b-6daaca500595.png"),
      toAbsoluteURL("/lovable-uploads/825c01c0-de2d-4af3-925e-93c8e24aaf6f.png")
    ],
    keywords: ["bolsa", "bordado", "imparáveis", "personalizado"]
  },
  {
    id: 2004,
    name: "Bordado em Bolsas - Brows Evolution",
    type: "product",
    category: "Bordado em Bolsa",
    imageUrl: toAbsoluteURL("/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png"),
    description: "Bolsa personalizada com o bordado da marca Brows Evolution, disponível em rosa e bege, ideal para o uso diário.",
    price: "Sob consulta",
    colors: ["Rosa", "Bege"],
    sizes: ["Único"],
    rating: 4.7,
    features: [
      "Design moderno",
      "Bordado com logotipo da marca",
      "Confortável e prática",
      "Disponível em diferentes cores"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png"),
      toAbsoluteURL("/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png"),
      toAbsoluteURL("/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png"),
      toAbsoluteURL("/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png")
    ],
    keywords: ["bolsa", "bordado", "brows evolution", "personalizado", "rosa", "bege"]
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
  // Portfolio items
  {
    id: 901,
    name: "Bordado em Bolsas - Imparáveis",
    type: "portfolio",
    category: "Bordado em Bolsa",
    imageUrl: toAbsoluteURL("/lovable-uploads/77747fae-966b-471d-925b-6daaca500595.png"),
    description: "Bolsa preta com bordado personalizado 'Imparáveis'. Perfeita para eventos ou uso pessoal.",
    price: "Sob consulta",
    colors: ["Preto"],
    sizes: ["Único"],
    rating: 4.7,
    features: ["Espaçosa", "Durável", "Bordado institucional", "Design versátil"],
    images: [
      toAbsoluteURL("/lovable-uploads/77747fae-966b-471d-925b-6daaca500595.png"),
      toAbsoluteURL("/lovable-uploads/825c01c0-de2d-4af3-925e-93c8e24aaf6f.png")
    ]
  },
  {
    id: 903,
    name: "Bordado em Bolsas - Brows Evolution",
    type: "portfolio",
    category: "Bordado em Bolsa",
    imageUrl: toAbsoluteURL("/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png"),
    description: "Bolsa rosa bordada com logo da Brows Evolution. Estilo e identidade para profissionais da beleza.",
    price: "Sob consulta",
    colors: ["Rosa", "Bege"],
    sizes: ["Único"],
    rating: 4.7,
    features: ["Design moderno", "Bordado elegante", "Ideal para estúdios", "Compacta"],
    images: [
      toAbsoluteURL("/lovable-uploads/88204373-69c0-48cb-91d9-9f9daeb5eaab.png"),
      toAbsoluteURL("/lovable-uploads/dd50745c-ca05-43e7-82cc-570a84db32ab.png"),
      toAbsoluteURL("/lovable-uploads/d4b673c3-7a22-4939-bc62-cf72bd811054.png"),
      toAbsoluteURL("/lovable-uploads/616f35be-5698-47de-a797-b1159dc49c1a.png")
    ]
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
    features: ["Bordado personalizado", "Material resistente", "Compacta e funcional", "Design elegante"],
    images: []
  },
  {
    id: 2010,
    name: "Bordado em Toalha",
    type: "portfolio",
    category: "Bordado em Toalha",
    imageUrl: toAbsoluteURL("/lovable-uploads/6526ea54-06c9-4057-a9f1-3ed79b7c7a32.png"),
    description: "Toalhas com bordado personalizado, perfeitas para presentear ou para uso próprio. Feitas com algodão de alta qualidade e bordados elegantes em tons terrosos.",
    price: "Sob consulta",
    colors: ["Branco", "Bege"],
    sizes: ["Único"],
    rating: 4.9,
    features: [
      "Toalhas 100% algodão",
      "Bordado personalizado com nomes",
      "Acabamento elegante com padrões decorativos",
      "Design exclusivo em arabescos"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/6526ea54-06c9-4057-a9f1-3ed79b7c7a32.png"),
      toAbsoluteURL("/lovable-uploads/4821e084-0101-4132-8123-903391810aaa.png"),
      toAbsoluteURL("/lovable-uploads/361e96c1-55bd-4ca1-9c7a-fa6e82abe2f6.png"),
      toAbsoluteURL("/lovable-uploads/38aaf457-7842-4f6f-9654-a50425b98530.png"),
      toAbsoluteURL("/lovable-uploads/494e5c1f-f39b-4fc9-93eb-4a1d16e06cf4.png"),
      toAbsoluteURL("/lovable-uploads/32a81fea-21e4-426b-a513-d4a05b4381a9.png"),
      toAbsoluteURL("/lovable-uploads/2a87573c-1da5-418a-bbcb-22196583e5bd.png"),
      toAbsoluteURL("/lovable-uploads/5638df7e-a0e8-4648-81cc-7ebabc46d71a.png"),
      toAbsoluteURL("/lovable-uploads/9dd1e51a-955c-43f7-869c-b974b6c81c12.png"),
      toAbsoluteURL("/lovable-uploads/0e63ddb2-a891-4a5a-aad8-a4edb22a66f6.png")
    ],
    tags: ["toalha", "bordado", "personalizado", "nome", "banho", "arabesco"],
    keywords: ["toalha", "bordado", "personalizado", "nome", "banho", "arabesco", "decorativo"]
  },
  {
    id: 1006,
    name: "Bordado em Toalha de Banho",
    type: "portfolio",
    category: "Bordado em Toalha",
    imageUrl: toAbsoluteURL("/lovable-uploads/bffd98fc-13d9-4757-82bd-72310db9af58.png"),
    description: "Toalha de banho personalizada com bordado elegante em padrão damasco e nome. Feita com tecido 100% algodão de alta qualidade, com acabamento sofisticado em tons terrosos.",
    price: "Sob consulta",
    colors: ["Branco", "Bege"],
    sizes: ["Único"],
    rating: 4.9,
    features: [
      "Bordado personalizado com nome",
      "Padrão damasco exclusivo",
      "100% algodão de alta qualidade",
      "Acabamento elegante em tons terrosos",
      "Ideal para presente"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/bffd98fc-13d9-4757-82bd-72310db9af58.png"),
      toAbsoluteURL("/lovable-uploads/82e63709-7d7f-4c50-8732-e65fb5a96ca0.png")
    ],
    tags: ["toalha", "bordado", "personalizado", "nome", "banho", "damasco"],
    keywords: ["toalha de banho", "bordado", "personalizado", "nome", "banho", "damasco", "presente"]
  },
  {
    id: 2011,
    name: "Bordado em Toalha de Rosto",
    type: "portfolio",
    category: "Bordado em Toalha",
    imageUrl: toAbsoluteURL("/lovable-uploads/c43e1aa8-d406-4206-b941-3dd865acd9aa.png"),
    description: "Toalha de rosto personalizada com bordado dos nomes Ricardo e Lucas em verde água, com acabamento decorativo em padrão geométrico.",
    price: "Sob consulta",
    colors: ["Verde Água"],
    sizes: ["Único"],
    rating: 4.9,
    features: [
      "Bordado personalizado com nomes",
      "Tecido de alta qualidade",
      "Acabamento decorativo em padrão geométrico",
      "Perfeito para presente"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/c43e1aa8-d406-4206-b941-3dd865acd9aa.png"),
      toAbsoluteURL("/lovable-uploads/3cfb9f69-f768-477e-9391-584df70c9466.png"),
      toAbsoluteURL("/lovable-uploads/5ba554df-d78e-472a-bd0d-2a696f6dd018.png")
    ],
    tags: ["toalha", "bordado", "personalizado", "nome", "verde água"],
    keywords: ["toalha de rosto", "bordado", "personalizado", "nome", "verde água", "ricardo", "lucas"]
  }
];
