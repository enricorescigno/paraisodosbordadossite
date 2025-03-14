
import { Product } from '../types/product';

// Pantufas Collection
export const pantufaProducts: Product[] = [
  {
    id: 200,
    name: "Pantufa Confort Clássica",
    type: "product",
    category: "Pantufas",
    imageUrl: "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png",
    description: "Pantufa em tecido texturizado com forro macio e confortável, ideal para o uso diário.",
    price: "Sob consulta",
    colors: ["Cinza", "Branco"],
    sizes: ["P", "M", "G"],
    rating: 4.8,
    isNew: true,
    features: [
      "Material macio",
      "Sola antiderrapante",
      "Forro confortável",
      "Design moderno"
    ],
    images: [
      "/lovable-uploads/e30c49de-23a5-4661-b1ef-1cd0733b2858.png",
      "/lovable-uploads/36a38d60-1eeb-4d00-a815-5b06d32171d7.png"
    ]
  },
  {
    id: 201,
    name: "Pantufa Pompom Delicada",
    type: "product",
    category: "Pantufas",
    imageUrl: "/lovable-uploads/36ab88ca-5429-45cc-ba92-22c02f9e8814.png",
    description: "Pantufa feminina com pompom decorativo, feita com tecido texturizado e interior aconchegante.",
    price: "Sob consulta",
    colors: ["Rosa", "Bege"],
    sizes: ["P", "M", "G"],
    rating: 4.9,
    isNew: true,
    features: [
      "Pompom decorativo",
      "Interior macio",
      "Exterior texturizado",
      "Base antiderrapante"
    ],
    images: [
      "/lovable-uploads/36ab88ca-5429-45cc-ba92-22c02f9e8814.png",
      "/lovable-uploads/fbfe7b78-08bd-45c6-ae97-f62616c4a07a.png"
    ]
  },
  {
    id: 202,
    name: "Pantufa Soft Minimalista",
    type: "product",
    category: "Pantufas",
    imageUrl: "/lovable-uploads/9dc9535d-7bb6-4271-9178-d812bb402441.png",
    description: "Pantufa minimalista com design simples e elegante, disponível em diversas cores.",
    price: "Sob consulta",
    colors: ["Azul", "Roxo", "Vermelho"],
    sizes: ["P", "M", "G"],
    rating: 4.7,
    isNew: true,
    features: [
      "Design minimalista",
      "Ultraconfortável", 
      "Material aveludado",
      "Leve e prática"
    ],
    images: [
      "/lovable-uploads/9dc9535d-7bb6-4271-9178-d812bb402441.png",
      "/lovable-uploads/59ad10cb-885b-434c-ad24-0cf9f17f8381.png",
      "/lovable-uploads/c838ec71-8c01-4583-8e31-576a4829181c.png"
    ]
  },
  {
    id: 203,
    name: "Pantufa Plush Premium",
    type: "product",
    category: "Pantufas",
    imageUrl: "/lovable-uploads/97ec483a-beee-45ae-8a3a-773fc71c8368.png",
    description: "Pantufa confeccionada em plush premium, oferecendo máximo conforto e durabilidade.",
    price: "Sob consulta",
    colors: ["Preto", "Rosa", "Marrom"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.9,
    isNew: true,
    features: [
      "Plush de alta qualidade",
      "Ultramacia",
      "Confortável",
      "Durável"
    ],
    images: [
      "/lovable-uploads/97ec483a-beee-45ae-8a3a-773fc71c8368.png",
      "/lovable-uploads/828f06cf-6a82-40ff-b5e7-d105a447924d.png",
      "/lovable-uploads/50986439-23d5-4069-8fa2-2556c20af5a6.png"
    ]
  },
  {
    id: 204,
    name: "Pantufa Essencial Lisa",
    type: "product",
    category: "Pantufas",
    imageUrl: "/lovable-uploads/233f51ac-fe3a-472c-aad2-33238d2de3ef.png",
    description: "Pantufa essencial em design liso e clean, perfeita para o dia a dia com muito conforto.",
    price: "Sob consulta",
    colors: ["Branco", "Bege"],
    sizes: ["P", "M", "G"],
    rating: 4.6,
    isNew: true,
    features: [
      "Design básico",
      "Extremamente macia",
      "Forrada internamente",
      "Versátil"
    ],
    images: [
      "/lovable-uploads/233f51ac-fe3a-472c-aad2-33238d2de3ef.png",
      "/lovable-uploads/e72c13a4-2f02-47ba-a597-1d174cfa421d.png"
    ]
  }
];

// Bonés Collection
export const bonesProducts: Product[] = [
  {
    id: 300,
    name: "Boné Bordado Respira",
    type: "product",
    category: "Bonés Bordados",
    imageUrl: "/lovable-uploads/f3372ecb-c7c5-4bea-a52d-959ab9019e56.png",
    description: "Boné casual com bordado 'respira', confeccionado em tecido macio e ajuste regulável.",
    price: "Sob consulta",
    colors: ["Amarelo", "Verde", "Rosa", "Branco", "Vermelho", "Azul Claro"],
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
      "/lovable-uploads/f3372ecb-c7c5-4bea-a52d-959ab9019e56.png",
      "/lovable-uploads/2aa701f2-b251-4978-8c91-3437b96b8629.png"
    ],
    keywords: ["boné", "bordado", "respira", "casual", "acessório"]
  },
  {
    id: 301,
    name: "Boné Bordado Umbigo Para Dentro",
    type: "product",
    category: "Bonés Bordados",
    imageUrl: "/lovable-uploads/f0f584d1-07fa-4152-8258-c4eceeebfdff.png",
    description: "Boné casual com bordado 'umbigo para dentro', feito com material resistente e fecho ajustável.",
    price: "Sob consulta",
    colors: ["Azul Claro"],
    sizes: ["Único"],
    rating: 4.7,
    isNew: true,
    features: [
      "Bordado exclusivo",
      "Material confortável",
      "Aba curvada",
      "Fechamento regulável"
    ],
    images: [
      "/lovable-uploads/f0f584d1-07fa-4152-8258-c4eceeebfdff.png"
    ],
    keywords: ["boné", "bordado", "umbigo para dentro", "casual", "acessório"]
  },
  {
    id: 302,
    name: "Boné Bordado Santosh Pilates",
    type: "product",
    category: "Bonés Bordados",
    imageUrl: "/lovable-uploads/5e83b50f-c3b6-435c-92cd-21f6ea1fbb17.png",
    description: "Boné esportivo com bordado 'Santosh Pilates', ideal para praticantes de pilates e atividades ao ar livre.",
    price: "Sob consulta",
    colors: ["Verde Oliva"],
    sizes: ["Único"],
    rating: 4.6,
    isNew: true,
    features: [
      "Bordado nítido e durável",
      "Tecido respirável",
      "Ajuste confortável",
      "Acabamento premium"
    ],
    images: [
      "/lovable-uploads/5e83b50f-c3b6-435c-92cd-21f6ea1fbb17.png"
    ],
    keywords: ["boné", "bordado", "pilates", "esportivo", "santosh"]
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

// Camisetas Collection
export const camisetasProducts: Product[] = [
  {
    id: 400,
    name: "Camiseta Básica Lisa",
    type: "product",
    category: "Camisetas Básicas",
    imageUrl: "/lovable-uploads/ee75d0fd-9516-42e5-a2b8-854ca18f9951.png",
    description: "Camiseta básica lisa em algodão de alta qualidade, ideal para o dia a dia e personalização com bordados.",
    price: "Sob consulta",
    colors: ["Branco", "Preto"],
    sizes: ["P", "M", "G", "GG", "XG", "XG1", "XG2", "XG3"],
    rating: 4.9,
    isNew: true,
    features: [
      "100% algodão",
      "Tecido macio",
      "Acabamento premium",
      "Alta durabilidade",
      "Ideal para bordados personalizados"
    ],
    images: [
      "/lovable-uploads/ee75d0fd-9516-42e5-a2b8-854ca18f9951.png",
      "/lovable-uploads/d5097320-ae8f-404e-8b4c-18d6489bf0a3.png"
    ],
    keywords: ["camiseta", "básica", "lisa", "algodão", "bordado"]
  }
];

// Camisas Polo Collection
export const camisasPoloProducts: Product[] = [
  {
    id: 500,
    name: "Camisa Polo Masculina",
    type: "product",
    category: "Camisas Polo",
    imageUrl: "/lovable-uploads/de1f2cb2-903f-403a-86eb-249e6307be34.png",
    description: "Camisa polo masculina em diversas cores, confeccionada com material confortável e durável, ideal para ocasiões casuais e semi-formais.",
    price: "Sob consulta",
    colors: [
      "Preto", "Branco", "Cinza", "Chumbo", "Azul Royal", "Azul Turquesa", 
      "Azul Marinho", "Vermelho", "Amarelo", "Amarelo Dourado", "Laranja", 
      "Vinho", "Verde Bandeira", "Pink"
    ],
    sizes: ["P", "M", "G", "GG", "XG", "XG1", "XG2", "XG3"],
    rating: 4.8,
    isNew: true,
    features: [
      "Material de alta qualidade",
      "Acabamento premium",
      "Diversos tamanhos e cores",
      "Ideal para bordados personalizados",
      "Estilo versátil"
    ],
    images: [
      "/lovable-uploads/de1f2cb2-903f-403a-86eb-249e6307be34.png",
      "/lovable-uploads/6d9ab4ac-0a7e-4507-8f4d-cb378ea1411c.png",
      "/lovable-uploads/db101de2-df8d-45d2-8dd6-3e58b53bfccd.png"
    ],
    keywords: ["camisa", "polo", "masculina", "bordado", "personalizada"]
  }
];

// Jalecos Collection
export const jalecosProducts: Product[] = [
  {
    id: 600,
    name: "Jaleco Feminino Profissional",
    type: "product",
    category: "Jalecos",
    imageUrl: "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png",
    description: "Jaleco feminino profissional, ideal para médicas, enfermeiras, dentistas e outras profissionais da saúde. Confeccionado em tecido de alta qualidade com acabamento superior.",
    price: "Sob consulta",
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG", "XG"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido antimicrobiano",
      "Bolsos frontais",
      "Manga longa com botões",
      "Ideal para bordados personalizados",
      "Confortável e profissional"
    ],
    images: [
      "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png"
    ],
    keywords: ["jaleco", "feminino", "médico", "saúde", "profissional", "bordado"]
  },
  {
    id: 601,
    name: "Jaleco Masculino Profissional",
    type: "product",
    category: "Jalecos",
    imageUrl: "/lovable-uploads/34f2f2c0-1ba3-4d9f-8dda-091058742d3e.png",
    description: "Jaleco masculino profissional, perfeito para médicos, enfermeiros, dentistas e outros profissionais da saúde. Fabricado com material durável e de fácil higienização.",
    price: "Sob consulta",
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG", "XG", "XG1", "XG2"],
    rating: 4.8,
    isNew: true,
    features: [
      "Material resistente",
      "Bolsos amplos",
      "Design ergonômico",
      "Personalização com bordados",
      "Fechamento com botões"
    ],
    images: [
      "/lovable-uploads/34f2f2c0-1ba3-4d9f-8dda-091058742d3e.png"
    ],
    keywords: ["jaleco", "masculino", "médico", "saúde", "profissional", "bordado"]
  }
];

// Roupões Collection
export const roupoesProducts: Product[] = [
  {
    id: 700,
    name: "Roupão Infantil Unicórnio",
    type: "product",
    category: "Roupões Infantis",
    imageUrl: "/lovable-uploads/d8ce6c10-ac88-4583-a5fe-59e4b8f9046b.png",
    description: "Roupão infantil com estampa de unicórnios, super macio e confortável, ideal para crianças após o banho ou para momentos de relaxamento.",
    price: "Sob consulta",
    colors: ["Rosa"],
    sizes: ["P", "M", "G"],
    rating: 4.9,
    isNew: true,
    features: [
      "Material ultra macio",
      "Estampa divertida de unicórnios",
      "Cinto incorporado",
      "Bolsos laterais",
      "Capuz confortável"
    ],
    images: [
      "/lovable-uploads/d8ce6c10-ac88-4583-a5fe-59e4b8f9046b.png"
    ],
    keywords: ["roupão", "infantil", "unicórnio", "banho", "crianças"]
  },
  {
    id: 701,
    name: "Roupão Infantil Princesas",
    type: "product",
    category: "Roupões Infantis",
    imageUrl: "/lovable-uploads/008350e4-cc5b-4f6d-b585-c95707eef535.png",
    description: "Roupão infantil com estampa de princesas, perfeito para meninas após o banho ou para momentos de descanso. Feito com tecido suave e absorvente.",
    price: "Sob consulta",
    colors: ["Rosa"],
    sizes: ["P", "M", "G"],
    rating: 4.8,
    isNew: true,
    features: [
      "Tecido macio e absorvente",
      "Estampa de princesas",
      "Cinto ajustável",
      "Bolsos práticos",
      "Capuz confortável"
    ],
    images: [
      "/lovable-uploads/008350e4-cc5b-4f6d-b585-c95707eef535.png"
    ],
    keywords: ["roupão", "infantil", "princesas", "banho", "meninas"]
  }
];

// Toalhas Collection
export const toalhasProducts: Product[] = [
  {
    id: 800,
    name: "Kit Toalhas Infantis com Bordado de Coroa",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/d2fc000c-904f-4a72-974e-e6aa5ad89b79.png",
    description: "Kit de toalhas infantis com bordado de coroa real, disponível em várias cores. Confeccionadas com material macio e absorvente, ideais para o banho e cuidados diários das crianças.",
    price: "Sob consulta",
    colors: ["Azul", "Rosa", "Branco", "Verde"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido 100% algodão",
      "Bordado exclusivo de coroa",
      "Alta absorção",
      "Toque macio",
      "Diversas cores disponíveis"
    ],
    images: [
      "/lovable-uploads/d2fc000c-904f-4a72-974e-e6aa5ad89b79.png"
    ],
    keywords: ["toalha", "infantil", "coroa", "kit", "banho", "bordado"]
  },
  {
    id: 801,
    name: "Toalha de Banho com Bordado de Coroa",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/16ec485a-1a80-474e-a14b-c0e40d3b0780.png",
    description: "Toalha de banho luxuosa com bordado de coroa em relevo. Confeccionada com material premium para garantir maciez e alta absorção.",
    price: "Sob consulta",
    colors: ["Azul"],
    sizes: ["Único"],
    rating: 4.8,
    isNew: true,
    features: [
      "Tecido nobre e macio",
      "Bordado premium de coroa",
      "Acabamento de luxo",
      "Alta durabilidade",
      "Absorção superior"
    ],
    images: [
      "/lovable-uploads/16ec485a-1a80-474e-a14b-c0e40d3b0780.png"
    ],
    keywords: ["toalha", "banho", "coroa", "bordado", "luxo"]
  },
  {
    id: 802,
    name: "Kit Toalha de Banho com Capuz Infantil",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/047eeb2e-65e3-4785-bb08-584cd60156f5.png",
    description: "Kit completo de toalhas infantis com capuz, perfeito para secar e aquecer os pequenos após o banho. Inclui toalhas de diferentes tamanhos para diversas necessidades.",
    price: "Sob consulta",
    colors: ["Azul", "Branco", "Rosa"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: [
      "Toalha com capuz aconchegante",
      "Tecido ultra macio",
      "Bordado personalizado",
      "Alta absorção",
      "Kit completo para bebês"
    ],
    images: [
      "/lovable-uploads/047eeb2e-65e3-4785-bb08-584cd60156f5.png"
    ],
    keywords: ["toalha", "capuz", "infantil", "banho", "kit", "bebê"]
  },
  {
    id: 803,
    name: "Toalha de Banho com Bordado Pets",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/af659db1-b127-4e66-b7f7-7f90fbea444c.png",
    description: "Toalha de banho com bordado de animais de estimação, perfeita para crianças que amam pets. Feita com material macio e absorvente para o máximo conforto.",
    price: "Sob consulta",
    colors: ["Bege"],
    sizes: ["Único"],
    rating: 4.7,
    isNew: true,
    features: [
      "Bordado temático de pets",
      "Material absorvente",
      "Tecido antiaderente",
      "Acabamento cuidadoso",
      "Design infantil divertido"
    ],
    images: [
      "/lovable-uploads/af659db1-b127-4e66-b7f7-7f90fbea444c.png"
    ],
    keywords: ["toalha", "banho", "pets", "animais", "infantil", "bordado"]
  },
  {
    id: 804,
    name: "Toalha de Banho com Bordado de Personagens",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/71292974-89b5-4b63-91e3-db0427e19486.png",
    description: "Toalha de banho infantil com bordado de personagens divertidos. Confeccionada com tecido macio e absorvente para o conforto das crianças após o banho.",
    price: "Sob consulta",
    colors: ["Azul"],
    sizes: ["Único"],
    rating: 4.8,
    isNew: true,
    features: [
      "Bordado de personagens",
      "Material premium",
      "Alta absorção",
      "Design divertido",
      "Toque macio"
    ],
    images: [
      "/lovable-uploads/71292974-89b5-4b63-91e3-db0427e19486.png"
    ],
    keywords: ["toalha", "banho", "personagens", "infantil", "bordado"]
  },
  {
    id: 805,
    name: "Toalha de Banho Infantil Fadas",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/d5d267de-6d0f-4d43-b7a7-95eeeb1e804f.png",
    description: "Toalha de banho infantil com bordado de fadas, perfeita para meninas. Confeccionada com tecido macio e absorvente para o máximo conforto após o banho.",
    price: "Sob consulta",
    colors: ["Rosa"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: [
      "Bordado encantador de fadas",
      "Material de alta qualidade",
      "Toque ultra macio",
      "Alta capacidade de absorção",
      "Design delicado"
    ],
    images: [
      "/lovable-uploads/d5d267de-6d0f-4d43-b7a7-95eeeb1e804f.png",
      "/lovable-uploads/c75da4d0-fbd5-46ed-9acf-43551a6564b0.png",
      "/lovable-uploads/e20ebf61-1253-4d4d-b95c-846a9df78e0d.png"
    ],
    keywords: ["toalha", "banho", "fadas", "infantil", "meninas", "bordado"]
  },
  {
    id: 806,
    name: "Kit Toalhas de Banho Fadas Encantadas",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/c5a5f1e0-a7bb-49d6-bdc5-b6382ccdc453.png",
    description: "Kit completo de toalhas com bordado de fadas encantadas. Inclui toalhas de diferentes tamanhos, proporcionando maciez e absorção para todos os momentos do banho.",
    price: "Sob consulta",
    colors: ["Rosa Claro", "Rosa Escuro"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: [
      "Kit com várias peças",
      "Bordado exclusivo de fadas",
      "Material premium",
      "Diferentes tamanhos",
      "Toalhas extra macias"
    ],
    images: [
      "/lovable-uploads/c5a5f1e0-a7bb-49d6-bdc5-b6382ccdc453.png",
      "/lovable-uploads/44bc88f5-739c-4354-b591-96b5ac5365be.png",
      "/lovable-uploads/8bb673d8-4fd4-48cc-b6c5-3d94217ac846.png"
    ],
    keywords: ["toalha", "banho", "fadas", "kit", "infantil", "bordado"]
  }
];

// Combine all products for export
export const allProducts: Product[] = [
  ...pantufaProducts,
  ...bonesProducts,
  ...camisetasProducts,
  ...camisasPoloProducts,
  ...jalecosProducts,
  ...roupoesProducts,
  ...toalhasProducts
];
