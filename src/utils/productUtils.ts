
import { Product } from '../types/product';
import { 
  camaProducts,
  mesaCozinhaProducts,
  tapeteCortinasProducts,
  banhoProducts,
  infantilProducts,
  vestuarioProducts,
  allCategoryProducts
} from './categoryProducts';

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
  name: "Boné Bordado Original",
  type: "portfolio",
  category: "Bonés Bordados",
  imageUrl: "/images/portfolio/bordado-bone/bone-original.png",
  description: "Boné com bordado 'Original', ideal para estilo casual com autenticidade.",
  price: "Sob consulta",
  colors: ["Preto"],
  sizes: ["Único"],
  rating: 4.9,
  isNew: true,
  features: [
    "Design urbano",
    "Bordado centralizado",
    "Alta durabilidade",
    "Ajustável"
  ],
  images: ["/images/portfolio/bordado-bone/bone-original.png"],
  keywords: ["boné", "bordado", "original"]
},
{
  id: 301,
  name: "Boné Bordado Paraíso",
  type: "portfolio",
  category: "Bonés Bordados",
  imageUrl: "/images/portfolio/bordado-bone/bone-paraiso.png",
  description: "Boné com a palavra 'Paraíso' bordada, representando elegância e identidade.",
  price: "Sob consulta",
  colors: ["Vermelho"],
  sizes: ["Único"],
  rating: 4.9,
  isNew: true,
  features: [
    "Estilo diferenciado",
    "Conforto premium",
    "Tecido resistente",
    "Bordado exclusivo"
  ],
  images: ["/images/portfolio/bordado-bone/bone-paraiso.png"],
  keywords: ["boné", "bordado", "paraíso"]
},
{
  id: 302,
  name: "Boné Bordado Vibes",
  type: "portfolio",
  category: "Bonés Bordados",
  imageUrl: "/images/portfolio/bordado-bone/bone-vibes.png",
  description: "Boné casual com bordado 'Vibes', perfeito para transmitir leveza e estilo.",
  price: "Sob consulta",
  colors: ["Azul Claro"],
  sizes: ["Único"],
  rating: 4.9,
  isNew: true,
  features: [
    "Ideal para o verão",
    "Tecido leve",
    "Estampa bordada moderna",
    "Visual jovem"
  ],
  images: ["/images/portfolio/bordado-bone/bone-vibes.png"],
  keywords: ["boné", "bordado", "vibes"]
},
{
  id: 303,
  name: "Boné Bordado Estilo",
  type: "portfolio",
  category: "Bonés Bordados",
  imageUrl: "/images/portfolio/bordado-bone/bone-estilo.png",
  description: "Boné com bordado 'Estilo', unindo simplicidade com autenticidade no visual.",
  price: "Sob consulta",
  colors: ["Branco"],
  sizes: ["Único"],
  rating: 4.9,
  isNew: true,
  features: [
    "Visual clean",
    "Alta definição no bordado",
    "Design contemporâneo",
    "Ajuste confortável"
  ],
  images: ["/images/portfolio/bordado-bone/bone-estilo.png"],
  keywords: ["boné", "bordado", "estilo"]
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
  },
  {
    id: 602,
    name: "Jaleco Bordado Premium",
    type: "product",
    category: "Jalecos",
    imageUrl: "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png",
    description: "Jaleco premium com bordado personalizado, ideal para profissionais da saúde que valorizam elegância e qualidade em seu ambiente de trabalho.",
    price: "Sob consulta",
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG", "XG"],
    rating: 5.0,
    isNew: true,
    features: [
      "Tecido premium anti-microbiano",
      "Bordado personalizado em alta definição",
      "Acabamento superior com costuras reforçadas",
      "Design moderno e profissional",
      "Bolsos amplos e funcionais"
    ],
    images: [
      "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png"
    ],
    keywords: ["jaleco", "bordado", "premium", "saúde", "médico", "dentista"]
  },
  {
    id: 603,
    name: "Jaleco Bordado Executivo",
    type: "product",
    category: "Jalecos",
    imageUrl: "/lovable-uploads/34f2f2c0-1ba3-4d9f-8dda-091058742d3e.png",
    description: "Jaleco executivo com bordado personalizado, projetado para profissionais que buscam sofisticação e conforto em um único produto.",
    price: "Sob consulta",
    colors: ["Branco", "Off-White"],
    sizes: ["P", "M", "G", "GG", "XG"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido de alta qualidade com caimento perfeito",
      "Bordado personalizado na região do peito e manga",
      "Design slim fit elegante",
      "Botões embutidos para visual clean",
      "Bolsos estrategicamente posicionados"
    ],
    images: [
      "/lovable-uploads/34f2f2c0-1ba3-4d9f-8dda-091058742d3e.png"
    ],
    keywords: ["jaleco", "bordado", "executivo", "profissional", "elegante"]
  },
  {
    id: 604,
    name: "Jaleco Bordado Acadêmico",
    type: "product",
    category: "Jalecos",
    imageUrl: "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png",
    description: "Jaleco acadêmico com bordado personalizado, perfeito para estudantes da área da saúde. Confeccionado com material durável e confortável para o uso diário.",
    price: "Sob consulta",
    colors: ["Branco"],
    sizes: ["PP", "P", "M", "G", "GG"],
    rating: 4.8,
    isNew: true,
    features: [
      "Bordado personalizado com curso e instituição",
      "Material resistente a diversas lavagens",
      "Corte unissex adaptável",
      "Bolsos práticos para instrumentos",
      "Comprimento ideal conforme normas acadêmicas"
    ],
    images: [
      "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png"
    ],
    keywords: ["jaleco", "bordado", "acadêmico", "estudante", "universitário"]
  },
  {
    id: 605,
    name: "Jaleco Bordado Colorido",
    type: "product",
    category: "Jalecos",
    imageUrl: "/lovable-uploads/34f2f2c0-1ba3-4d9f-8dda-091058742d3e.png",
    description: "Jaleco com opções de cores e bordado personalizado, ideal para pediatria, odontopediatria e profissionais que desejam um ambiente mais leve e acolhedor.",
    price: "Sob consulta",
    colors: ["Azul Claro", "Rosa", "Verde Claro", "Lilás"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    isNew: true,
    features: [
      "Tecido colorido de alta qualidade",
      "Bordado personalizado temático",
      "Design alegre e acolhedor",
      "Bolsos funcionais e espaçosos",
      "Ideal para ambiente infantil"
    ],
    images: [
      "/lovable-uploads/34f2f2c0-1ba3-4d9f-8dda-091058742d3e.png"
    ],
    keywords: ["jaleco", "bordado", "colorido", "pediatria", "odontopediatria"]
  },
  {
    id: 606,
    name: "Jaleco Bordado Gourmet",
    type: "product",
    category: "Jalecos",
    imageUrl: "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png",
    description: "Jaleco gourmet com bordado personalizado, desenvolvido especialmente para chefs, cozinheiros e profissionais da gastronomia que valorizam a apresentação pessoal.",
    price: "Sob consulta",
    colors: ["Branco", "Preto", "Bordô"],
    sizes: ["P", "M", "G", "GG", "XG"],
    rating: 4.8,
    isNew: true,
    features: [
      "Tecido resistente a manchas e alta temperatura",
      "Bordado personalizado com nome e especialidade",
      "Design moderno com botões resistentes",
      "Bolsos amplos para utensílios",
      "Acabamento premium para ambiente gourmet"
    ],
    images: [
      "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png"
    ],
    keywords: ["jaleco", "bordado", "chef", "gastronomia", "cozinha", "gourmet"]
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
  },
  {
    id: 702,
    name: "Roupão Infantil Bordado Safari",
    type: "product",
    category: "Roupões Infantis",
    imageUrl: "/lovable-uploads/d8ce6c10-ac88-4583-a5fe-59e4b8f9046b.png",
    description: "Roupão infantil com bordado de animais safari, confeccionado com material macio e aconchegante. Perfeito para manter os pequenos aquecidos após o banho.",
    price: "Sob consulta",
    colors: ["Verde Claro", "Bege", "Azul Claro"],
    sizes: ["P (1-2 anos)", "M (3-5 anos)", "G (6-8 anos)"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido felpudo e super macio",
      "Bordado exclusivo temático safari",
      "Capuz aconchegante com detalhes de animais",
      "Bolsos laterais práticos",
      "Cinto ajustável para maior conforto"
    ],
    images: [
      "/lovable-uploads/d8ce6c10-ac88-4583-a5fe-59e4b8f9046b.png"
    ],
    keywords: ["roupão", "infantil", "bordado", "safari", "banho", "crianças"]
  },
  {
    id: 703,
    name: "Roupão Infantil Bordado Super Heróis",
    type: "product",
    category: "Roupões Infantis",
    imageUrl: "/lovable-uploads/008350e4-cc5b-4f6d-b585-c95707eef535.png",
    description: "Roupão infantil com bordado de super heróis, feito com material absorvente e confortável. Transforma a hora do banho em uma aventura divertida para os pequenos.",
    price: "Sob consulta",
    colors: ["Azul", "Vermelho", "Preto"],
    sizes: ["P (1-2 anos)", "M (3-5 anos)", "G (6-8 anos)"],
    rating: 4.8,
    isNew: true,
    features: [
      "Material 100% algodão felpudo",
      "Bordados de personagens de super heróis",
      "Capuz com detalhes temáticos",
      "Bolsos frontais divertidos",
      "Cinto integrado para ajuste"
    ],
    images: [
      "/lovable-uploads/008350e4-cc5b-4f6d-b585-c95707eef535.png"
    ],
    keywords: ["roupão", "infantil", "bordado", "super heróis", "banho", "meninos"]
  },
  {
    id: 704,
    name: "Roupão Infantil Bordado Fadas",
    type: "product",
    category: "Roupões Infantis",
    imageUrl: "/lovable-uploads/d8ce6c10-ac88-4583-a5fe-59e4b8f9046b.png",
    description: "Roupão infantil com bordado de fadas e elementos mágicos, confeccionado com tecido macio e absorvente. Transforma o momento do banho em uma experiência encantada.",
    price: "Sob consulta",
    colors: ["Rosa", "Lilás", "Azul Claro"],
    sizes: ["P (1-2 anos)", "M (3-5 anos)", "G (6-8 anos)"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido suave e aconchegante",
      "Bordados delicados de fadas e elementos mágicos",
      "Capuz decorado com detalhes encantadores",
      "Acabamento premium com brilhos",
      "Toque macio para peles sensíveis"
    ],
    images: [
      "/lovable-uploads/d8ce6c10-ac88-4583-a5fe-59e4b8f9046b.png"
    ],
    keywords: ["roupão", "infantil", "bordado", "fadas", "banho", "meninas"]
  },
  {
    id: 705,
    name: "Roupão Infantil Bordado Espaço",
    type: "product",
    category: "Roupões Infantis",
    imageUrl: "/lovable-uploads/008350e4-cc5b-4f6d-b585-c95707eef535.png",
    description: "Roupão infantil com bordado temático espacial, com planetas, estrelas e astronautas. Ideal para crianças curiosas que sonham com aventuras no espaço sideral.",
    price: "Sob consulta",
    colors: ["Azul Marinho", "Preto", "Branco"],
    sizes: ["P (1-2 anos)", "M (3-5 anos)", "G (6-8 anos)"],
    rating: 4.8,
    isNew: true,
    features: [
      "Material felpudo de alta qualidade",
      "Bordados detalhados do sistema solar",
      "Capuz com detalhe de astronauta",
      "Brilha no escuro para experiência espacial",
      "Super absorvente e confortável"
    ],
    images: [
      "/lovable-uploads/008350e4-cc5b-4f6d-b585-c95707eef535.png"
    ],
    keywords: ["roupão", "infantil", "bordado", "espaço", "planetas", "banho"]
  },
  {
    id: 706,
    name: "Roupão Infantil Bordado Personalizado",
    type: "product",
    category: "Roupões Infantis",
    imageUrl: "/lovable-uploads/d8ce6c10-ac88-4583-a5fe-59e4b8f9046b.png",
    description: "Roupão infantil com bordado totalmente personalizado, permitindo adicionar o nome da criança e temas de sua preferência. Um presente único e especial.",
    price: "Sob consulta",
    colors: ["Rosa", "Azul", "Verde", "Amarelo", "Branco"],
    sizes: ["P (1-2 anos)", "M (3-5 anos)", "G (6-8 anos)"],
    rating: 5.0,
    isNew: true,
    features: [
      "Personalização completa com nome e tema",
      "Material premium super macio",
      "Design exclusivo para cada criança",
      "Opções de capuz temático coordenado",
      "Embalagem especial para presente"
    ],
    images: [
      "/lovable-uploads/d8ce6c10-ac88-4583-a5fe-59e4b8f9046b.png"
    ],
    keywords: ["roupão", "infantil", "bordado", "personalizado", "presente", "banho"]
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
  },
  {
    id: 807,
    name: "Toalha de Banho Bordado Floral",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/d2fc000c-904f-4a72-974e-e6aa5ad89b79.png",
    description: "Toalha de banho com delicado bordado floral, confeccionada em material premium de alta absorção. Adiciona um toque de elegância ao seu banheiro.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Rosa Claro", "Azul Claro"],
    sizes: ["M (70x140cm)", "G (80x150cm)"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido 100% algodão egípcio",
      "Bordado floral artesanal detalhado",
      "Alta capacidade de absorção",
      "Acabamento premium com barra decorativa",
      "Toque macio e aveludado"
    ],
    images: [
      "/lovable-uploads/d2fc000c-904f-4a72-974e-e6aa5ad89b79.png"
    ],
    keywords: ["toalha", "banho", "bordado", "floral", "algodão", "absorvente"]
  },
  {
    id: 808,
    name: "Toalha de Banho Bordado Monograma",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/16ec485a-1a80-474e-a14b-c0e40d3b0780.png",
    description: "Toalha de banho premium com bordado de monograma personalizado, ideal para presentear em ocasiões especiais ou para uso em hotéis e spas.",
    price: "Sob consulta",
    colors: ["Branco", "Cinza", "Azul Marinho", "Bordô"],
    sizes: ["M (70x140cm)", "G (80x150cm)", "GG (100x180cm)"],
    rating: 5.0,
    isNew: true,
    features: [
      "Material nobre com gramatura superior",
      "Bordado personalizado com iniciais ou nome completo",
      "Design elegante e sofisticado",
      "Acabamento com barrado especial",
      "Absorção rápida e secagem eficiente"
    ],
    images: [
      "/lovable-uploads/16ec485a-1a80-474e-a14b-c0e40d3b0780.png"
    ],
    keywords: ["toalha", "banho", "bordado", "monograma", "personalizada", "premium"]
  },
  {
    id: 809,
    name: "Kit Toalhas Bordado Casal",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/047eeb2e-65e3-4785-bb08-584cd60156f5.png",
    description: "Kit de toalhas para casal com bordado personalizado, contendo 4 peças: 2 toalhas de banho e 2 toalhas de rosto combinando. Presente perfeito para noivos.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Cinza", "Azul"],
    sizes: ["Único - Banho (70x140cm) e Rosto (50x80cm)"],
    rating: 4.9,
    isNew: true,
    features: [
      "Kit completo com 4 toalhas combinando",
      "Bordado personalizado para Ele e Ela",
      "Material premium de alta durabilidade",
      "Embalagem especial para presente",
      "Pode ser personalizado com nomes ou iniciais"
    ],
    images: [
      "/lovable-uploads/047eeb2e-65e3-4785-bb08-584cd60156f5.png"
    ],
    keywords: ["toalha", "kit", "casal", "bordado", "presente", "noivos"]
  },
  {
    id: 810,
    name: "Toalha de Banho Bordado Spa",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/af659db1-b127-4e66-b7f7-7f90fbea444c.png",
    description: "Toalha de banho com bordado spa, desenvolvida com tecido especial de algodão egípcio para proporcionar uma experiência de spa em casa. Extra macia e absorvente.",
    price: "Sob consulta",
    colors: ["Branco", "Off-White", "Verde Água"],
    sizes: ["G (80x150cm)", "GG (100x180cm)"],
    rating: 4.8,
    isNew: true,
    features: [
      "Tecido premium com gramatura superior a 500g/m²",
      "Bordado sofisticado com motivos de spa",
      "Toque ultra macio para relaxamento",
      "Absorção superior com secagem rápida",
      "Durabilidade excepcional mesmo após várias lavagens"
    ],
    images: [
      "/lovable-uploads/af659db1-b127-4e66-b7f7-7f90fbea444c.png"
    ],
    keywords: ["toalha", "banho", "bordado", "spa", "premium", "algodão"]
  },
  {
    id: 811,
    name: "Toalha de Banho Bordado Corporativo",
    type: "product",
    category: "Toalhas Infantis",
    imageUrl: "/lovable-uploads/71292974-89b5-4b63-91e3-db0427e19486.png",
    description: "Toalha de banho com bordado corporativo, ideal para hotéis, spas, academias e empresas que desejam oferecer produtos premium com sua marca. Elegante e durável.",
    price: "Sob consulta",
    colors: ["Branco", "Cinza", "Azul Marinho"],
    sizes: ["M (70x140cm)", "G (80x150cm)"],
    rating: 4.7,
    isNew: true,
    features: [
      "Bordado corporativo com logomarca",
      "Material resistente para uso intensivo",
      "Acabamento profissional de alta qualidade",
      "Possibilidade de compra em grandes quantidades",
      "Personalização conforme necessidades da empresa"
    ],
    images: [
      "/lovable-uploads/71292974-89b5-4b63-91e3-db0427e19486.png"
    ],
    keywords: ["toalha", "banho", "bordado", "corporativo", "hotel", "empresa"]
  }
];

// Combine all products for export
export const allProducts: Product[] = [
  ...pantufaProducts.map(product => ({ ...product, type: 'product' })),
  ...bonesProducts, // agora vai manter type original, incluindo os "portfolio"
  ...camisetasProducts.map(product => ({ ...product, type: 'product' })),
  ...camisasPoloProducts.map(product => ({ ...product, type: 'product' })),
  ...jalecosProducts.map(product => ({ ...product, type: 'product' })),
  ...roupoesProducts.map(product => ({ ...product, type: 'product' })),
  ...toalhasProducts.map(product => ({ ...product, type: 'product' })),
  ...allCategoryProducts.map(product => ({ ...product, type: 'product' }))
];
