
import { Product } from '../types/product';
import { toAbsoluteURL } from '../imageUtils';

export const mesaCozinhaProducts: Product[] = [
  {
    id: 601,
    name: "Toalha de Mesa Damasco",
    description: "Toalha de mesa elegante com padrão Damasco, perfeita para ocasiões especiais.",
    category: "Mesa e Cozinha",
    type: "product",
    imageUrl: toAbsoluteURL("/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"),
    price: "A partir de R$ 76,00",
    keywords: ["toalha", "mesa", "damasco", "decoração", "jantar"],
    slug: "toalha-mesa-damasco"
  },
  {
    id: 602,
    name: "Toalha de Mesa Clean",
    description: "Toalha de mesa com design clean e minimalista, ideal para o dia a dia.",
    category: "Mesa e Cozinha",
    type: "product",
    imageUrl: toAbsoluteURL("/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"),
    price: "A partir de R$ 68,00",
    keywords: ["toalha", "mesa", "clean", "minimalista", "decoração"],
    slug: "toalha-mesa-clean"
  },
  {
    id: 603,
    name: "Jogo Americano Requinte Redondo",
    description: "Jogo americano redondo com acabamento requintado para sua mesa de jantar.",
    category: "Mesa e Cozinha",
    type: "product",
    imageUrl: toAbsoluteURL("/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"),
    price: "R$ 11,99",
    keywords: ["jogo americano", "redondo", "requinte", "mesa"],
    slug: "jogo-americano-requinte-redondo"
  },
  {
    id: 604,
    name: "Jogo Americano Requinte Oval Tessi",
    description: "Jogo americano oval da linha Tessi, perfeito para compor sua mesa.",
    category: "Mesa e Cozinha",
    type: "product",
    imageUrl: toAbsoluteURL("/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"),
    price: "R$ 9,99",
    keywords: ["jogo americano", "oval", "tessi", "mesa"],
    slug: "jogo-americano-requinte-oval-tessi"
  },
  {
    id: 605,
    name: "Jogo Americano Pvc Folhas 4 peças",
    description: "Conjunto de 4 jogos americanos em PVC com estampa de folhas, prático e durável.",
    category: "Mesa e Cozinha",
    type: "product",
    imageUrl: toAbsoluteURL("/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"),
    price: "R$ 48,00",
    isNew: true,
    keywords: ["jogo americano", "pvc", "folhas", "conjunto", "promoção"],
    slug: "jogo-americano-pvc-folhas"
  },
  {
    id: 606,
    name: "Jogo Americano Requinte Mescla",
    description: "Jogo americano com tecido mescla, trazendo sofisticação para sua mesa.",
    category: "Mesa e Cozinha",
    type: "product",
    imageUrl: toAbsoluteURL("/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"),
    price: "R$ 14,00",
    keywords: ["jogo americano", "mescla", "requinte", "mesa"],
    slug: "jogo-americano-requinte-mescla"
  },
  {
    id: 607,
    name: "Jogo Americano Requinte Ondulado",
    description: "Jogo americano com bordas onduladas, criando um visual único para sua mesa.",
    category: "Mesa e Cozinha",
    type: "product",
    imageUrl: toAbsoluteURL("/lovable-uploads/30b5a988-d353-486b-a6db-6a1ba58bdbc2.png"),
    price: "R$ 14,99",
    keywords: ["jogo americano", "ondulado", "requinte", "mesa"],
    slug: "jogo-americano-requinte-ondulado"
  }
];
