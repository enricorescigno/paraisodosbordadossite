import { Medal, Truck, CreditCard, HeadphonesIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
const features = [{
  icon: Medal,
  title: "Qualidade Garantida",
  description: "Todos os nossos produtos são cuidadosamente confeccionados com materiais de primeira linha."
}, {
  icon: Truck,
  title: "Entrega Rápida",
  description: "Enviamos seu pedido com rapidez e segurança para todo o Brasil."
}, {
  icon: CreditCard,
  title: "Pagamento Seguro",
  description: "Diversas opções de pagamento com total segurança para suas compras."
}, {
  icon: HeadphonesIcon,
  title: "Suporte Especializado",
  description: "Nossa equipe está sempre pronta para auxiliar em qualquer dúvida ou necessidade."
}];
const Features = () => {
  const {
    ref,
    inView
  } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  return;
};
export default Features;