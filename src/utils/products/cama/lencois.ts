
import { Product } from '../../../types/product';
import { toAbsoluteURL } from '../../imageUtils';

export const lencoisProducts: Product[] = [
  {
    id: "C001",
    name: "Jogo de Cama Solteiro 3 peças 180 Fios Supercal Turin",
    type: "product",
    category: "Cama",
    price: "R$ 65,00",
    description: "Jogo de cama solteiro com 180 fios, modelo Turin. Inclui 3 peças: 1 lençol com elástico, 1 lençol de cobrir e 1 fronha. Design elegante em xadrez nas cores bege, azul e caramelo.",
    imageUrl: toAbsoluteURL("/lovable-uploads/c0427b76-6f55-4bec-9c6d-36f7a0a3740a.png"),
    images: [
      toAbsoluteURL("/lovable-uploads/c0427b76-6f55-4bec-9c6d-36f7a0a3740a.png"),
      toAbsoluteURL("/lovable-uploads/e2d02ef0-ffb8-4480-b3fe-2ed5f7d99d5d.png")
    ],
    isNew: true,
    colors: ["Bege", "Azul", "Caramelo"],
    features: [
      "180 fios de alta qualidade",
      "3 peças completas",
      "Tecido 100% algodão",
      "Design xadrez elegante",
      "Acabamento premium",
      "Durável e macio"
    ],
    keywords: ["cama", "jogo de cama", "solteiro", "turin", "180 fios", "xadrez"]
  },
  // ... outros jogos de lençóis solteiro, queen e casal
  {
    id: "C002",
    name: "Jogo de Cama Solteiro 3 peças 180 Fios Supercal Flower Rosa",
    type: "product",
    category: "Cama",
    price: "R$ 65,00",
    description: "Jogo de cama solteiro com 180 fios, modelo Flower Rosa. O conjunto inclui 3 peças: 1 lençol com elástico, 1 lençol de cobrir e 1 fronha. Design floral delicado em tons de rosa e verde sobre fundo bege claro.",
    imageUrl: toAbsoluteURL("/lovable-uploads/52961fbf-941d-46f0-aa3b-90dd6b20917c.png"),
    images: [
      toAbsoluteURL("/lovable-uploads/52961fbf-941d-46f0-aa3b-90dd6b20917c.png"),
      toAbsoluteURL("/lovable-uploads/db462d61-f681-4d0b-9a2c-70687be0aaea.png")
    ],
    features: [
      "180 fios de alta qualidade",
      "3 peças completas",
      "Tecido 100% algodão",
      "Estampa floral delicada",
      "Acabamento premium",
      "Durável e macio"
    ],
    keywords: ["cama", "jogo de cama", "solteiro", "flower", "rosa", "180 fios", "floral"]
  }
];
