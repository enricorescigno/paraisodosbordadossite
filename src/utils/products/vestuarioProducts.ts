
import { Product } from '../types/product';
import { toAbsoluteURL } from '../imageUtils';

// Vestuário Collection (regular clothing products)
export const vestuarioProducts: Product[] = [
  {
    id: "vestuario-1",
    name: "Camisa Básica unisex 100% algodão adulto",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/e627464a-ea49-431e-bdfe-61fdc8d0ade6.png"),
    description: "Camisa básica unisex confeccionada em 100% algodão, confortável e de alta qualidade.",
    price: "R$ 29,90",
    colors: ["Preto", "Amarelo", "Azul Royal", "Verde Água", "Branco", "Cinza", "Vermelho"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    features: [
      "100% algodão",
      "Tecido macio",
      "Confortável"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/e627464a-ea49-431e-bdfe-61fdc8d0ade6.png"), // Preto
      toAbsoluteURL("/lovable-uploads/413dc254-7151-42ff-8c76-9542fe0fd000.png"), // Amarelo
      toAbsoluteURL("/lovable-uploads/5196f41e-9122-43b3-87e0-bba36f02db37.png"), // Azul Royal
      toAbsoluteURL("/lovable-uploads/a9eb955b-2415-4603-83b7-b0bfe976aff8.png"), // Verde Água
      toAbsoluteURL("/lovable-uploads/ea192bca-bdb8-4a1f-928f-81c705de4209.png"), // Branco
      toAbsoluteURL("/lovable-uploads/fb5f097a-e5ed-4a81-ac17-6a80e73281e8.png"), // Cinza
      toAbsoluteURL("/lovable-uploads/fe3394aa-dcf4-4d2e-9292-2049e3ee9f66.png"), // Vermelho
    ],
    keywords: ["camisa", "básica", "unisex", "algodão", "adulto"]
  },
  {
    id: "vestuario-2",
    name: "Camisa Polo Masculina",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/7d78953f-1496-4f4c-ba23-5acf30512358.png"),
    description: "Camisa polo masculina de alta qualidade, ideal para ambientes casuais ou formais. Disponível em diversas cores e tamanhos.",
    price: "Sob consulta",
    colors: [
      "Preta", "Branca", "Cinza", "Chumbo", "Azul Royal",
      "Azul Turquesa", "Azul Marinho", "Vermelha", "Amarelo Claro",
      "Amarelo Canário", "Laranja", "Vinho", "Verde Bandeira", "Pink"
    ],
    sizes: ["P", "M", "G", "GG", "XG", "XG1", "XG2", "XG3"],
    rating: 4.6,
    features: [
      "Tecido de alta qualidade",
      "Design elegante",
      "Confortável para uso diário",
      "Diversas cores disponíveis",
      "Ampla variedade de tamanhos"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/7d78953f-1496-4f4c-ba23-5acf30512358.png"),
      toAbsoluteURL("/lovable-uploads/0220db3b-aa3e-48cd-9637-a4a532a17de8.png"),
      toAbsoluteURL("/lovable-uploads/8b1f7b0c-0709-4fd7-8b32-400b0aa610de.png")
    ],
    keywords: ["camisa", "polo", "masculina"]
  },
  {
    id: "vestuario-3",
    name: "Pantufa Cotele",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/deffe1d3-4ea9-4bac-af0b-968592271c09.png"),
    description: "Pantufa modelo Cotele, macia e confortável para uso doméstico.",
    price: "R$ 98,00",
    colors: ["Bege", "Cinza"],
    sizes: ["34-36", "37-39", "40-42"],
    rating: 4.8,
    features: [
      "Material macio e confortável",
      "Sola antiderrapante",
      "Design elegante"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/deffe1d3-4ea9-4bac-af0b-968592271c09.png"),
      toAbsoluteURL("/lovable-uploads/8ef339fb-f352-446f-8084-fc4f47afb4cd.png")
    ],
    keywords: ["pantufa", "cotele", "calçado", "conforto"]
  },
  {
    id: "vestuario-4",
    name: "Pantufa Popom",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/c7a9518a-56f6-41c6-9797-b1f9e0fb7c34.png"),
    description: "Pantufa modelo Popom, macia e quentinha para os dias frios.",
    price: "R$ 98,00",
    colors: ["Rosa", "Bege"],
    sizes: ["34-36", "37-39", "40-42"],
    rating: 4.7,
    isNew: true,
    features: [
      "Extra macia",
      "Detalhes em pompom",
      "Sola antiderrapante"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/c7a9518a-56f6-41c6-9797-b1f9e0fb7c34.png"),
      toAbsoluteURL("/lovable-uploads/b7fa37c5-9cee-4599-abbc-d07300366e9e.png")
    ],
    keywords: ["pantufa", "popom", "pompom", "calçado", "conforto"]
  },
  {
    id: "vestuario-5",
    name: "Robe",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/7209d481-e3c4-46e4-8fbe-78d1b8f8ba53.png"),
    description: "Robe confortável para uso doméstico, perfeito para relaxar após o banho.",
    price: "R$ 59,90",
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
    sizes: ["P", "M", "G", "GG"],
    rating: 4.6,
    isNew: false,
    features: [
      "Material macio e acetinado",
      "Cinto ajustável",
      "Confortável e elegante",
      "Diversas cores disponíveis"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/7209d481-e3c4-46e4-8fbe-78d1b8f8ba53.png")
    ],
    keywords: ["robe", "roupão", "banho", "conforto"]
  },
  {
    id: "vestuario-6",
    name: "Camisa Básica Infantil",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/ae9237f1-d928-455a-aef3-cd6ec98152b5.png"),
    description: "Camisa básica infantil, confortável e de alta qualidade para crianças.",
    price: "R$ 24,00",
    colors: ["Branco", "Preto"],
    sizes: ["2 anos", "4 anos", "6 anos", "8 anos"],
    rating: 4.8,
    isNew: false,
    features: [
      "Tecido macio e confortável",
      "Ótimo para o dia a dia",
      "Fácil de lavar"
    ],
    images: [
      toAbsoluteURL("/lovable-uploads/ae9237f1-d928-455a-aef3-cd6ec98152b5.png"),
      toAbsoluteURL("/lovable-uploads/9a19c748-b91d-49a9-afae-c0661b497dfa.png")
    ],
    keywords: ["camisa", "básica", "infantil", "criança"]
  },
  {
    id: "vestuario-7",
    name: "Jaleco Masculino - Oxford",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png"),
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
      toAbsoluteURL("/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png")
    ],
    keywords: ["jaleco", "masculino", "oxford", "profissional", "saúde"]
  },
  {
    id: "vestuario-8",
    name: "Jaleco Feminino - Oxford",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png"),
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
      toAbsoluteURL("/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png")
    ],
    keywords: ["jaleco", "feminino", "oxford", "profissional", "saúde"]
  },
  {
    id: "vestuario-9",
    name: "Pantufa Toque de Seda",
    type: "product",
    category: "Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png"),
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
      toAbsoluteURL("/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png")
    ],
    keywords: ["pantufa", "toque de seda", "calçado", "conforto"]
  }
];

// These products are for the "Bordado em Vestuário" portfolio section
export const bordadoVestuarioProducts: Product[] = [
  {
    id: 202,
    name: "Bordado em Camisa - Impcatto",
    type: "portfolio",
    category: "Bordado em Vestuário",
    imageUrl: toAbsoluteURL("/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png"),
    description: "Bordado de logo em camisa para a empresa Impcatto. Trabalho detalhado em camisas verdes com bordado de alta precisão do logo da empresa em duas cores.",
    price: "35,00",
    isNew: false,
    isAvailable: true,
    isCustomizable: true,
    colors: ["Verde"],
    sizes: ["P", "M", "G", "GG"],
    stockQuantity: 50,
    minPurchaseQuantity: 5,
    tags: ["camisa", "bordado", "logo", "empresarial"],
    featured: false,
    images: [
      toAbsoluteURL("/lovable-uploads/56fc7649-6f58-477d-b0c1-98d186701f99.png"),
      toAbsoluteURL("/lovable-uploads/652a8949-cb0d-4fd6-8ac2-d73fdd4cd81e.png")
    ],
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
    imageUrl: toAbsoluteURL("/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png"),
    description: "Bordado do logo Pet Dream em fardamento para hospital veterinário. Disponível em branco e verde.",
    price: "40,00",
    isNew: true,
    isAvailable: true,
    isCustomizable: true,
    colors: ["Branco", "Verde"],
    sizes: ["P", "M", "G", "GG"],
    stockQuantity: 20,
    minPurchaseQuantity: 5,
    tags: ["fardamento", "bordado", "veterinário", "pet", "empresarial"],
    featured: true,
    images: [
      toAbsoluteURL("/lovable-uploads/7df842ab-4325-4c5e-8ff1-74b9d04ebe99.png"),
      toAbsoluteURL("/lovable-uploads/6d28ebce-a220-404c-b350-55f1be2bc89d.png")
    ],
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
    imageUrl: toAbsoluteURL("/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png"),
    description: "Bordado com design de girassol na camisa. Trabalho detalhado em camisa preta com bordado de girassol amarelo.",
    price: "30,00",
    isNew: true,
    isAvailable: true,
    isCustomizable: true,
    colors: ["Preto", "Amarelo"],
    sizes: ["P", "M", "G", "GG"],
    stockQuantity: 40,
    minPurchaseQuantity: 1,
    tags: ["camisa", "bordado", "floral", "girassol"],
    featured: true,
    images: [toAbsoluteURL("/lovable-uploads/920afc88-794b-416c-90e6-e84ad10ee39a.png")],
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
    imageUrl: toAbsoluteURL("/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png"),
    description: "Bordado em fardamento para diversos times de futebol europeus incluindo PSG, Marseille e Montpellier. Trabalho de alta precisão para uniformes esportivos.",
    price: "45,00",
    isNew: true,
    isAvailable: true,
    isCustomizable: true,
    colors: ["Azul", "Branco", "variados"],
    sizes: ["P", "M", "G", "GG"],
    stockQuantity: 100,
    minPurchaseQuantity: 10,
    tags: ["fardamento", "bordado", "futebol", "time", "esporte", "psg", "marseille", "montpellier"],
    featured: true,
    images: [
      toAbsoluteURL("/lovable-uploads/e7ff2082-9189-4993-bcbd-5fe492d8f42b.png"), 
      toAbsoluteURL("/lovable-uploads/ee7a7e95-5675-4250-9896-fabb9b05fa82.png"), 
      toAbsoluteURL("/lovable-uploads/c1a283d7-d768-423d-bbb8-b882a2e86f66.png"), 
      toAbsoluteURL("/lovable-uploads/e577a3c9-349a-4906-860e-257b33765459.png")
    ],
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
    imageUrl: toAbsoluteURL("/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png"),
    description: "Bordado do logo 'Biscoitos Feitos Por Nós' em fardamento. Disponível em azul marinho e branco, com design elegante para equipe de confeitaria artesanal.",
    price: "35,00",
    isNew: true,
    isAvailable: true,
    isCustomizable: true,
    colors: ["Azul Marinho", "Branco", "Vermelho"],
    sizes: ["P", "M", "G", "GG"],
    stockQuantity: 30,
    minPurchaseQuantity: 5,
    tags: ["fardamento", "bordado", "logo", "gastronomia", "empresarial", "confeitaria", "biscoitos"],
    featured: true,
    images: [
      toAbsoluteURL("/lovable-uploads/b0ee6029-30cd-4f43-a4b2-76ec6563efc3.png"),
      toAbsoluteURL("/lovable-uploads/757b2068-de47-4d4a-9fe4-f68c46100c2d.png")
    ],
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
    imageUrl: toAbsoluteURL("/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png"),
    description: "Bordado de logo do time Capibaribe em uma camisa. Detalhes nítidos na mascote do leão com contorno amarelo vibrante em fundo preto.",
    price: "40,00",
    isNew: false,
    isAvailable: true,
    isCustomizable: true,
    colors: ["Preto", "Amarelo"],
    sizes: ["P", "M", "G", "GG"],
    stockQuantity: 25,
    minPurchaseQuantity: 5,
    tags: ["camisa", "bordado", "futebol", "time", "esporte"],
    featured: false,
    images: [toAbsoluteURL("/lovable-uploads/70803891-aa93-49d9-9256-5a07d0bcd142.png")],
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
    imageUrl: toAbsoluteURL("/lovable-uploads/6406277c-f290-4a94-abb0-24f098dd74c6.png"),
    description: "Bordado com o logo Doutor Pet na camisa. Disponível em verde, verde água e caqui. O logo apresenta um veterinário com animais de estimação em um círculo verde.",
    price: "35,00",
    isNew: true,
    isAvailable: true,
    isCustomizable: true,
    colors: ["Verde", "Verde Água", "Caqui"],
    sizes: ["P", "M", "G", "GG"],
    stockQuantity: 30,
    minPurchaseQuantity: 5,
    tags: ["camisa", "bordado", "veterinário", "pet", "empresarial"],
    featured: true,
    images: [
      toAbsoluteURL("/lovable-uploads/6406277c-f290-4a94-abb0-24f098dd74c6.png"),
      toAbsoluteURL("/lovable-uploads/d5b5532a-f97b-4e54-b83a-e67256cb21dc.png"),
      toAbsoluteURL("/lovable-uploads/4a3d432f-60d7-4543-b6f8-bc13a8a3c870.png"),
      toAbsoluteURL("/lovable-uploads/135d959f-0f03-4169-a803-d49bc2b1ea43.png")
    ],
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
      weight: 0
    },
    createdAt: "2023-04-07T10:00:00Z"
  }
];
