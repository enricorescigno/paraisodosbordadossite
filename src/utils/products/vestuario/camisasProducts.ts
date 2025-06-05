
import { Product } from '../../../types/product';

export const camisasProducts: Product[] = [
  {
    id: "vestuario-1",
    name: "Camisa Básica unisex 100% algodão adulto",
    type: "product",
    category: "Vestuário",
    description: "Camisa básica unisex confeccionada em 100% algodão, confortável e de alta qualidade.",
    price: {
      value: "R$ 29,90"
    },
    variants: {
      colors: ["Preto", "Amarelo", "Azul Royal", "Verde Água", "Branco", "Cinza", "Vermelho"],
      sizes: ["P", "M", "G", "GG"]
    },
    rating: {
      value: 4.7
    },
    features: {
      specifications: [
        "100% algodão",
        "Tecido macio",
        "Confortável"
      ],
      materials: ["100% algodão"],
      care: ["Lavar à máquina", "Ferro morno"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/e627464a-ea49-431e-bdfe-61fdc8d0ade6.png",
        alt: "Camisa Básica unisex - Preta",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/e627464a-ea49-431e-bdfe-61fdc8d0ade6.png", alt: "Camisa Básica - Preto", colorVariant: "Preto", order: 0 },
        { url: "/lovable-uploads/413dc254-7151-42ff-8c76-9542fe0fd000.png", alt: "Camisa Básica - Amarelo", colorVariant: "Amarelo", order: 1 },
        { url: "/lovable-uploads/5196f41e-9122-43b3-87e0-bba36f02db37.png", alt: "Camisa Básica - Azul Royal", colorVariant: "Azul Royal", order: 2 },
        { url: "/lovable-uploads/a9eb955b-2415-4603-83b7-b0bfe976aff8.png", alt: "Camisa Básica - Verde Água", colorVariant: "Verde Água", order: 3 },
        { url: "/lovable-uploads/ea192bca-bdb8-4a1f-928f-81c705de4209.png", alt: "Camisa Básica - Branco", colorVariant: "Branco", order: 4 },
        { url: "/lovable-uploads/fb5f097a-e5ed-4a81-ac17-6a80e73281e8.png", alt: "Camisa Básica - Cinza", colorVariant: "Cinza", order: 5 },
        { url: "/lovable-uploads/fe3394aa-dcf4-4d2e-9292-2049e3ee9f66.png", alt: "Camisa Básica - Vermelho", colorVariant: "Vermelho", order: 6 }
      ]
    },
    keywords: ["camisa", "básica", "unisex", "algodão", "adulto"],
    stock: {
      quantity: 100,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  },
  {
    id: "vestuario-2",
    name: "Camisa Polo Masculina",
    type: "product",
    category: "Vestuário",
    description: "Camisa polo masculina de alta qualidade, ideal para ambientes casuais ou formais. Disponível em diversas cores e tamanhos.",
    price: {
      value: "Sob consulta"
    },
    variants: {
      colors: [
        "Preta", "Branca", "Cinza", "Chumbo", "Azul Royal",
        "Azul Turquesa", "Azul Marinho", "Vermelha", "Amarelo Claro",
        "Amarelo Canário", "Laranja", "Vinho", "Verde Bandeira", "Pink"
      ],
      sizes: ["P", "M", "G", "GG", "XG", "XG1", "XG2", "XG3"]
    },
    rating: {
      value: 4.6
    },
    features: {
      specifications: [
        "Tecido de alta qualidade",
        "Design elegante",
        "Confortável para uso diário",
        "Diversas cores disponíveis",
        "Ampla variedade de tamanhos"
      ],
      materials: ["Algodão e poliéster"],
      care: ["Lavar à máquina", "Não usar alvejante"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/7d78953f-1496-4f4c-ba23-5acf30512358.png",
        alt: "Camisa Polo Masculina",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/7d78953f-1496-4f4c-ba23-5acf30512358.png", alt: "Camisa Polo Masculina", order: 0 },
        { url: "/lovable-uploads/0220db3b-aa3e-48cd-9637-a4a532a17de8.png", alt: "Camisa Polo - Variação 1", order: 1 },
        { url: "/lovable-uploads/8b1f7b0c-0709-4fd7-8b32-400b0aa610de.png", alt: "Camisa Polo - Variação 2", order: 2 }
      ]
    },
    keywords: ["camisa", "polo", "masculina"],
    stock: {
      quantity: 50,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  },
  {
    id: "vestuario-6",
    name: "Camisa Básica Infantil",
    type: "product",
    category: "Vestuário",
    description: "Camisa básica infantil, confortável e de alta qualidade para crianças.",
    price: {
      value: "R$ 24,00"
    },
    variants: {
      colors: ["Branco", "Preto"],
      sizes: ["2 anos", "4 anos", "6 anos", "8 anos"]
    },
    rating: {
      value: 4.8
    },
    features: {
      specifications: [
        "Tecido macio e confortável",
        "Ótimo para o dia a dia",
        "Fácil de lavar"
      ],
      materials: ["100% algodão"],
      care: ["Lavar à máquina", "Ferro morno", "Não usar alvejante"]
    },
    images: {
      primary: {
        url: "/lovable-uploads/ae9237f1-d928-455a-aef3-cd6ec98152b5.png",
        alt: "Camisa Básica Infantil - Branca",
        isPrimary: true
      },
      gallery: [
        { url: "/lovable-uploads/ae9237f1-d928-455a-aef3-cd6ec98152b5.png", alt: "Camisa Básica Infantil - Branca", colorVariant: "Branco", order: 0 },
        { url: "/lovable-uploads/9a19c748-b91d-49a9-afae-c0661b497dfa.png", alt: "Camisa Básica Infantil - Preta", colorVariant: "Preto", order: 1 }
      ]
    },
    keywords: ["camisa", "básica", "infantil", "criança"],
    stock: {
      quantity: 75,
      minPurchaseQuantity: 1,
      isAvailable: true
    }
  }
];
