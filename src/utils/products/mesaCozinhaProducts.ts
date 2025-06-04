
import { Product } from '../../types/product';

export const mesaCozinhaProducts: Product[] = [
  {
    id: 401,
    name: "Toalha de Mesa Quadriculada",
    type: "product",
    category: "Mesa e Cozinha",
    imageUrl: "/lovable-uploads/c838ec71-8c01-4583-8e31-576a4829181c.png",
    description: "Toalha de Mesa Quadriculada elegante e prática para sua mesa.",
    price: "R$ 25,00",
    colors: ["Azul", "Verde", "Vermelho", "Rosa"],
    images: {
      "Azul": ["/lovable-uploads/c838ec71-8c01-4583-8e31-576a4829181c.png"],
      "Verde": ["/lovable-uploads/620a0828-61e3-409b-8639-64b8d65f538c.png"],
      "Vermelho": ["/lovable-uploads/2d5a7e2c-50c4-4f92-9d2a-12d97193274f.png"],
      "Rosa": ["/lovable-uploads/825c01c0-de2d-4af3-925e-93c8e24aaf6f.png"]
    },
    isNew: true,
    keywords: ["toalha", "mesa", "quadriculada", "cozinha"]
  },
  {
    id: 402,
    name: "Toalha de Mesa Damasco",
    type: "product",
    category: "Mesa e Cozinha",
    imageUrl: "/lovable-uploads/2796832f-9d02-47d6-bc57-9e2e10d0423d.png",
    description: "Toalha de Mesa Damasco com design elegante e sofisticado para ocasiões especiais.",
    price: "R$ 45,00",
    colors: ["Branco", "Dourado", "Bege", "Cinza"],
    sizes: ["01", "02", "06", "02", "03"],
    images: {
      "Branco": ["/lovable-uploads/82d39152-ea13-4ace-899d-606296c8251e.png"],
      "Dourado": ["/lovable-uploads/2796832f-9d02-47d6-bc57-9e2e10d0423d.png"],
      "Bege": ["/lovable-uploads/f080b572-7e42-4aa9-b35e-33fbc9812ac5.png"],
      "Cinza": ["/lovable-uploads/281462f6-1b7e-4c73-bea9-34e8f5295786.png"]
    },
    isNew: true,
    keywords: ["toalha", "mesa", "damasco", "elegante", "sofisticado"]
  }
];
