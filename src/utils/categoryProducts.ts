import { Product } from '../types/product';

// Cama Collection
export const camaProducts: Product[] = [
  {
    id: 101,
    name: "Jogo de Lençol Casal Luxo",
    type: "product",
    category: "Cama",
    imageUrl: "/lovable-uploads/5db187fa-df04-492a-883f-c007af693e55.png",
    description: "Jogo de lençol casal em algodão egípcio 400 fios, com acabamento em bordado exclusivo. Toque macio e confortável para noites de sono perfeitas.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Cinza Claro"],
    sizes: ["Casal", "Queen", "King"],
    rating: 4.9,
    isNew: true,
    features: [
      "Algodão egípcio 400 fios",
      "Bordado artesanal exclusivo",
      "Elástico reforçado",
      "Alta durabilidade"
    ],
    images: [
      "/lovable-uploads/5db187fa-df04-492a-883f-c007af693e55.png"
    ]
  },
  {
    id: 102,
    name: "Travesseiro Premium Memory Foam",
    type: "product",
    category: "Cama",
    imageUrl: "/lovable-uploads/4fa3ceb4-eef0-484e-94d0-c94fe355c748.png",
    description: "Travesseiro ergonômico em espuma viscoelástica que se adapta ao contorno da cabeça, proporcionando suporte cervical ideal e noites de sono reparador.",
    price: "Sob consulta",
    colors: ["Branco"],
    sizes: ["Standard", "King"],
    rating: 4.8,
    isNew: true,
    features: [
      "Memory foam de alta densidade",
      "Capa em algodão removível e lavável",
      "Hipoalergênico e antibacteriano",
      "Suporte ortopédico"
    ],
    images: [
      "/lovable-uploads/4fa3ceb4-eef0-484e-94d0-c94fe355c748.png"
    ]
  },
  {
    id: 103,
    name: "Colcha Matelassê Bordada",
    type: "product",
    category: "Cama",
    imageUrl: "/lovable-uploads/01c74faa-daf1-4918-a69a-9de345d8901d.png",
    description: "Colcha matelassê com bordado artesanal, confeccionada em tecido 100% algodão e enchimento em manta acrílica. Ideal para decorar e aquecer em noites mais frias.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Azul Claro"],
    sizes: ["Solteiro", "Casal", "Queen", "King"],
    rating: 4.9,
    isNew: true,
    features: [
      "Bordado exclusivo feito à mão",
      "Tecido 100% algodão",
      "Matelassê com enchimento acrílico",
      "Acabamento premium"
    ],
    images: [
      "/lovable-uploads/01c74faa-daf1-4918-a69a-9de345d8901d.png"
    ]
  }
];

// Mesa e Cozinha Collection
export const mesaCozinhaProducts: Product[] = [
  {
    id: 201,
    name: "Toalha de Mesa Bordada Flores",
    type: "product",
    category: "Mesa e Cozinha",
    imageUrl: "/lovable-uploads/620a0828-61e3-409b-8639-64b8d65f538c.png",
    description: "Toalha de mesa com bordado floral delicado, confeccionada em tecido nobre com acabamento superior. Perfeita para ocasiões especiais e jantares memoráveis.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Rosa Claro"],
    sizes: ["1,50m x 1,50m", "2,00m x 1,50m", "2,50m x 1,60m"],
    rating: 4.8,
    isNew: true,
    features: [
      "Bordado artesanal exclusivo",
      "Tecido nobre anti-manchas",
      "Acabamento com barra especial",
      "Resistente a múltiplas lavagens"
    ],
    images: [
      "/lovable-uploads/620a0828-61e3-409b-8639-64b8d65f538c.png"
    ]
  },
  {
    id: 204, // Mantendo o ID já configurado para garantir consistência
    name: "Jogo Americano Requinte Ondulado",
    type: "product",
    category: "Mesa e Cozinha",
    imageUrl: "/lovable-uploads/71c6178b-1439-499f-9354-f8bd6d43c514.png",
    description: "Eleve sua experiência à mesa com o jogo americano Tessi. Com uma composição inteligente de 75% polipropileno e 25% poliéster, este jogo americano é sinônimo de resistência e praticidade. Sua durabilidade o torna perfeito para o uso diário, e a limpeza é simples, graças à sua fácil lavagem. Além disso, seca rapidamente, estando pronto para ser usado sempre que você precisar. Com um diâmetro de 38cm, o formato redondo complementa sua mesa de maneira elegante. Adicione estilo e conveniência à sua refeição com o jogo americano Tessi.",
    price: "Sob consulta",
    colors: ["Branco", "Dourado", "Bege", "Marrom", "Rosa", "Verde", "Vinho"],
    sizes: ["38cm (diâmetro)"],
    rating: 4.8,
    isNew: true,
    features: [
      "Composição: 75% polipropileno e 25% poliéster",
      "Formato redondo ondulado",
      "Secagem rápida",
      "Conjunto com 4 unidades"
    ],
    images: {
      "Branco": ["/lovable-uploads/71c6178b-1439-499f-9354-f8bd6d43c514.png", "/lovable-uploads/c7b9448d-b4d0-4cd8-9bf3-74d9694e5f1c.png"],
      "Dourado": ["/lovable-uploads/55ee7159-6ba2-4ea8-ba47-fe26c718040d.png", "/lovable-uploads/dd9ced21-2cf3-4c5b-af78-8859edfebb2d.png"],
      "Bege": ["/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"],
      "Marrom": ["/lovable-uploads/b8507f62-379e-42ba-b9c4-e08ff04db821.png", "/lovable-uploads/1f1315c2-0f15-4525-9fdb-6c6574d95634.png"],
      "Rosa": ["/lovable-uploads/901b9c40-ca3f-48a8-9135-38facf09b3da.png", "/lovable-uploads/8277533f-4870-4627-896d-ba16fc386d29.png"],
      "Verde": ["/lovable-uploads/f28c69c5-853f-469b-afba-91b8202120d0.png", "/lovable-uploads/ad0cfed6-c98f-401b-9c50-a554468342e6.png"],
      "Vinho": ["/lovable-uploads/1bb354e7-598f-421d-9f97-f716da838757.png", "/lovable-uploads/d797a77e-cf02-4711-9ecc-d409cc56157a.png"]
    }
  },
  {
    id: 203,
    name: "Guardanapo de Tecido Bordado",
    type: "product",
    category: "Mesa e Cozinha",
    imageUrl: "/lovable-uploads/7c55472e-acf8-4000-8adc-9fe6b6c3a396.png",
    description: "Conjunto de guardanapos em tecido nobre com bordado personalizado. Kit com 6 unidades para compor sua mesa com refinamento e elegância.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Champagne"],
    sizes: ["40cm x 40cm"],
    rating: 4.9,
    isNew: true,
    features: [
      "Kit com 6 unidades",
      "Bordado artesanal personalizado",
      "Tecido 100% algodão",
      "Acabamento premium"
    ],
    images: [
      "/lovable-uploads/7c55472e-acf8-4000-8adc-9fe6b6c3a396.png"
    ]
  }
];

// Tapete e Cortinas Collection
export const tapeteCortinasProducts: Product[] = [
  {
    id: 301,
    name: "Tapete Bordado Sala Premium",
    type: "product",
    category: "Tapete e Cortinas",
    imageUrl: "/lovable-uploads/3eac496f-461d-4e47-9cc8-af09ad0873a2.png",
    description: "Tapete com bordado exclusivo para sala de estar, confeccionado em material nobre e resistente. Adiciona elegância e conforto ao seu ambiente.",
    price: "Sob consulta",
    colors: ["Bege", "Cinza", "Marrom Claro"],
    sizes: ["1,50m x 2,00m", "2,00m x 2,50m"],
    rating: 4.8,
    isNew: true,
    features: [
      "Bordado artesanal de alta qualidade",
      "Base antiderrapante",
      "Tecido resistente a manchas",
      "Fácil manutenção"
    ],
    images: [
      "/lovable-uploads/3eac496f-461d-4e47-9cc8-af09ad0873a2.png"
    ]
  },
  {
    id: 302,
    name: "Cortina Bordada Translúcida",
    type: "product",
    category: "Tapete e Cortinas",
    imageUrl: "/lovable-uploads/681f2ac7-f2d7-4f75-814e-9279195db99b.png",
    description: "Cortina translúcida com bordado delicado, permite a entrada de luz natural enquanto mantém a privacidade. Design elegante para qualquer ambiente.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Off-white"],
    sizes: ["2,20m x 1,80m", "2,60m x 2,00m", "3,00m x 2,50m"],
    rating: 4.7,
    isNew: true,
    features: [
      "Bordado exclusivo em toda extensão",
      "Tecido translúcido premium",
      "Proteção UV parcial",
      "Ilhós ou varão disponíveis"
    ],
    images: [
      "/lovable-uploads/681f2ac7-f2d7-4f75-814e-9279195db99b.png"
    ]
  },
  {
    id: 303,
    name: "Tapete de Banheiro Bordado",
    type: "product",
    category: "Tapete e Cortinas",
    imageUrl: "/lovable-uploads/2621c87d-6ff0-42bb-9c13-0598532a29ba.png",
    description: "Tapete de banheiro com bordado exclusivo, confeccionado em material absorvente e antiderrapante. Adiciona conforto e estilo ao seu banheiro.",
    price: "Sob consulta",
    colors: ["Branco", "Azul Claro", "Cinza", "Bege"],
    sizes: ["50cm x 70cm", "60cm x 80cm"],
    rating: 4.9,
    isNew: true,
    features: [
      "Bordado elegante",
      "Base antiderrapante reforçada",
      "Material absorvente premium",
      "Secagem rápida"
    ],
    images: [
      "/lovable-uploads/2621c87d-6ff0-42bb-9c13-0598532a29ba.png"
    ]
  }
];

// Banho Collection
export const banhoProducts: Product[] = [
  {
    id: 401,
    name: "Toalha de Banho Bordada Luxo",
    type: "product",
    category: "Banho",
    imageUrl: "/lovable-uploads/16ec485a-1a80-474e-a14b-c0e40d3b0780.png",
    description: "Toalha de banho premium com bordado exclusivo, confeccionada em algodão egípcio de alta gramatura. Máxima absorção e maciez para seu banho.",
    price: "Sob consulta",
    colors: ["Branco", "Cinza", "Azul Marinho", "Bege"],
    sizes: ["80cm x 150cm", "100cm x 150cm"],
    rating: 4.9,
    isNew: true,
    features: [
      "Algodão egípcio 600g/m²",
      "Bordado artesanal exclusivo",
      "Absorção ultra-rápida",
      "Acabamento premium"
    ],
    images: [
      "/lovable-uploads/16ec485a-1a80-474e-a14b-c0e40d3b0780.png"
    ]
  },
  {
    id: 402,
    name: "Kit Toalhas Rosto e Mão Bordadas",
    type: "product",
    category: "Banho",
    imageUrl: "/lovable-uploads/d2fc000c-904f-4a72-974e-e6aa5ad89b79.png",
    description: "Kit com 4 toalhas bordadas, sendo 2 toalhas de rosto e 2 toalhas de mão. Confeccionadas em algodão macio e absorvente, com bordado exclusivo.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Cinza", "Rosa Claro"],
    sizes: ["Toalha de rosto: 50cm x 80cm", "Toalha de mão: 30cm x 50cm"],
    rating: 4.8,
    isNew: true,
    features: [
      "Kit com 4 toalhas combinando",
      "Bordado personalizado em cada peça",
      "Tecido 100% algodão premium",
      "Acabamento com barra especial"
    ],
    images: [
      "/lovable-uploads/d2fc000c-904f-4a72-974e-e6aa5ad89b79.png"
    ]
  },
  {
    id: 403,
    name: "Roupão de Banho Bordado",
    type: "product",
    category: "Banho",
    imageUrl: "/lovable-uploads/0a4859ea-7a2a-45c7-ac73-e7f7a709aab4.png",
    description: "Roupão de banho com bordado personalizado, confeccionado em tecido felpudo e absorvente. Proporciona conforto e elegância após o banho.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Cinza"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido felpudo 350g/m²",
      "Bordado personalizado",
      "Bolsos laterais práticos",
      "Cinto ajustável"
    ],
    images: [
      "/lovable-uploads/0a4859ea-7a2a-45c7-ac73-e7f7a709aab4.png"
    ]
  }
];

// Infantil Collection
export const infantilProducts: Product[] = [
  {
    id: 501,
    name: "Toalha Infantil com Capuz Bordado",
    type: "product",
    category: "Infantil",
    imageUrl: "/lovable-uploads/047eeb2e-65e3-4785-bb08-584cd60156f5.png",
    description: "Toalha infantil com capuz e bordado de personagens, confeccionada em tecido macio e absorvente. Perfeita para aquecer e secar os pequenos após o banho.",
    price: "Sob consulta",
    colors: ["Branco", "Rosa", "Azul", "Amarelo"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido 100% algodão",
      "Bordado personalizado de personagens",
      "Capuz aconchegante",
      "Alta absorção"
    ],
    images: [
      "/lovable-uploads/047eeb2e-65e3-4785-bb08-584cd60156f5.png"
    ]
  },
  {
    id: 502,
    name: "Kit Lençol Infantil Bordado",
    type: "product",
    category: "Infantil",
    imageUrl: "/lovable-uploads/54f438f6-ea78-4b71-aaae-ed64ac172ecb.png",
    description: "Kit de lençóis infantis com bordado temático, contendo lençol de baixo com elástico, lençol de cima e fronha. Tecido macio para o conforto dos pequenos.",
    price: "Sob consulta",
    colors: ["Branco com Azul", "Branco com Rosa", "Branco com Verde"],
    sizes: ["Berço", "Solteiro"],
    rating: 4.8,
    isNew: true,
    features: [
      "Tecido 100% algodão",
      "Bordado temático exclusivo",
      "Kit completo com 3 peças",
      "Elástico reforçado"
    ],
    images: [
      "/lovable-uploads/54f438f6-ea78-4b71-aaae-ed64ac172ecb.png"
    ]
  },
  {
    id: 503,
    name: "Manta Infantil Bordada",
    type: "product",
    category: "Infantil",
    imageUrl: "/lovable-uploads/cb60af2d-a399-4029-ab74-6f5374d38b9c.png",
    description: "Manta infantil com bordado delicado, confeccionada em tecido macio e aconchegante. Ideal para bebês e crianças, perfeita para momentos de carinho e conforto.",
    price: "Sob consulta",
    colors: ["Branco", "Rosa", "Azul", "Amarelo"],
    sizes: ["90cm x 110cm"],
    rating: 4.9,
    isNew: true,
    features: [
      "Microfibra ultra macia",
      "Bordado personalizado",
      "Acabamento premium",
      "Hipoalergênica"
    ],
    images: [
      "/lovable-uploads/cb60af2d-a399-4029-ab74-6f5374d38b9c.png"
    ]
  }
];

// Vestuário Collection
export const vestuarioProducts: Product[] = [
  {
    id: 601,
    name: "Camisa Polo Bordada Empresarial",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/de1f2cb2-903f-403a-86eb-249e6307be34.png",
    description: "Camisa polo com bordado personalizado para empresas, confeccionada em malha piquet de alta qualidade. Ideal para uniformes corporativos e eventos.",
    price: "Sob consulta",
    colors: ["Branco", "Preto", "Azul Marinho", "Vermelho"],
    sizes: ["P", "M", "G", "GG", "XG"],
    rating: 4.8,
    isNew: true,
    features: [
      "Malha piquet premium",
      "Bordado corporativo personalizado",
      "Gola e punho reforçados",
      "Acabamento profissional"
    ],
    images: [
      "/lovable-uploads/de1f2cb2-903f-403a-86eb-249e6307be34.png",
      "/lovable-uploads/6d9ab4ac-0a7e-4507-8f4d-cb378ea1411c.png"
    ]
  },
  {
    id: 602,
    name: "Jaleco Bordado Profissional",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png",
    description: "Jaleco profissional com bordado personalizado, confeccionado em tecido confortável e durável. Ideal para médicos, enfermeiros, dentistas e outros profissionais.",
    price: "Sob consulta",
    colors: ["Branco"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.9,
    isNew: true,
    features: [
      "Tecido anti-microbiano",
      "Bordado personalizado com nome e profissão",
      "Botões reforçados",
      "Bolsos práticos"
    ],
    images: [
      "/lovable-uploads/003b91a9-1518-4429-a0dc-5d95c156106e.png",
      "/lovable-uploads/34f2f2c0-1ba3-4d9f-8dda-091058742d3e.png"
    ]
  },
  {
    id: 603,
    name: "Camiseta Básica com Bordado",
    type: "product",
    category: "Vestuário",
    imageUrl: "/lovable-uploads/ee75d0fd-9516-42e5-a2b8-854ca18f9951.png",
    description: "Camiseta básica com bordado personalizado, confeccionada em algodão de alta qualidade. Versátil para diversas ocasiões com seu toque pessoal.",
    price: "Sob consulta",
    colors: ["Branco", "Preto", "Cinza", "Azul"],
    sizes: ["P", "M", "G", "GG"],
    rating: 4.7,
    isNew: true,
    features: [
      "100% algodão penteado",
      "Bordado personalizado exclusivo",
      "Acabamento premium",
      "Tecido macio e confortável"
    ],
    images: [
      "/lovable-uploads/ee75d0fd-9516-42e5-a2b8-854ca18f9951.png",
      "/lovable-uploads/d5097320-ae8f-404e-8b4c-18d6489bf0a3.png"
    ]
  }
];

// Now, let's add these to the list of all products that will be exported
import { 
  pantufaProducts, 
  bonesProducts, 
  camisetasProducts, 
  camisasPoloProducts, 
  jalecosProducts, 
  roupoesProducts, 
  toalhasProducts 
} from './productUtils';

// Create the combined collection of all products
export const allCategoryProducts: Product[] = [
  ...camaProducts,
  ...mesaCozinhaProducts,
  ...tapeteCortinasProducts,
  ...banhoProducts,
  ...infantilProducts,
  ...vestuarioProducts
];
