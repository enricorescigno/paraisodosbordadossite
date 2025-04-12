
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Heart, Gift, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AppleButton } from "@/components/ui/apple-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from '../components/Footer';
import WhatsAppSupport from '../components/WhatsAppSupport';
import ProductCard from '../components/product/ProductCard';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { Product } from '../types/product';

// Produtos especiais para o Dia das Mães
const maesProducts: Product[] = [
  {
    id: 'maes-01',
    name: "Kit Roupão e Toalha Bordada - Dia das Mães",
    type: "product",
    category: "Presentes para Mães",
    imageUrl: "https://images.unsplash.com/photo-1563293815-7b9673b068a9?q=80&w=1200&auto=format&fit=crop",
    description: "Kit exclusivo com roupão e toalha de banho bordados para presentear no Dia das Mães. Personalize com a inicial ou nome completo.",
    price: "Sob consulta",
    colors: ["Branco", "Rosa", "Azul"],
    sizes: ["P", "M", "G", "GG"],
    rating: 5.0,
    isNew: true,
    features: [
      "Bordado personalizado",
      "Tecido premium",
      "Design exclusivo",
      "Embalagem para presente"
    ]
  },
  {
    id: 'maes-02',
    name: "Conjunto de Toalhas Bordadas - Mãe & Filha",
    type: "product",
    category: "Presentes para Mães",
    imageUrl: "https://images.unsplash.com/photo-1587304686295-cc991c67fc12?q=80&w=1200&auto=format&fit=crop",
    description: "Conjunto especial de toalhas bordadas para mãe e filha, com desenhos coordenados e personalização especial.",
    price: "Sob consulta",
    colors: ["Branco", "Bege", "Rosa claro"],
    sizes: ["Único"],
    rating: 4.9,
    isNew: true,
    features: [
      "Par de toalhas combinando",
      "Bordado delicado",
      "Acabamento premium",
      "Presente ideal"
    ]
  },
  {
    id: 'maes-03',
    name: "Bolsa Personalizada com Mensagem para Mãe",
    type: "product",
    category: "Presentes para Mães",
    imageUrl: "https://images.unsplash.com/photo-1562072364-38142a947c9f?q=80&w=1200&auto=format&fit=crop",
    description: "Bolsa exclusiva com bordado personalizado e mensagem especial para o Dia das Mães. Ideal para presente significativo.",
    price: "Sob consulta",
    colors: ["Preto", "Marrom", "Bege"],
    sizes: ["Único"],
    rating: 4.8,
    isNew: true,
    features: [
      "Mensagem personalizada",
      "Material resistente",
      "Design elegante",
      "Espaçosa e prática"
    ]
  },
  {
    id: 'maes-04',
    name: "Kit de Necessaires Bordadas - Três Peças",
    type: "product",
    category: "Presentes para Mães",
    imageUrl: "https://images.unsplash.com/photo-1563904092230-7ec217b65fe2?q=80&w=1200&auto=format&fit=crop",
    description: "Conjunto com três necessaires em tamanhos diferentes, todas com bordado personalizado para o Dia das Mães.",
    price: "Sob consulta",
    colors: ["Rosa", "Azul", "Verde"],
    sizes: ["Único"],
    rating: 4.7,
    isNew: true,
    features: [
      "Trio de necessaires",
      "Tamanhos variados",
      "Personalização especial",
      "Organização completa"
    ]
  }
];

const DiadasMaes = () => {
  useScrollToTop();

  // Efeito para animação de elementos na visualização
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stagger-children').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Função para rolar até a seção de produtos
  const scrollToProducts = () => {
    const productsSection = document.getElementById('produtos-maes');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1520095972714-909e91b038e5?q=80&w=2070&auto=format&fit=crop"
            alt="Celebração do Dia das Mães" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/40 to-brand-green/40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        {/* Hero Content */}
        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-4 text-white leading-tight">
              Celebre o Dia das Mães com um presente único!
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ofereça um toque de elegância e carinho com nossos produtos exclusivos para essa data especial.
            </p>
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="rounded-full px-8 py-6 bg-brand-red hover:bg-brand-red/90 text-white text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ver Produtos
              <ArrowDown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
            </Button>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-20 right-20 hidden md:block"
        >
          <Heart className="text-white/60 h-16 w-16 animate-float" />
        </motion.div>
      </section>

      {/* Produtos para o Dia das Mães */}
      <section id="produtos-maes" className="py-20 bg-[#f8f8f8]">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 relative inline-block">
              Presentes Especiais para Mães
              <span className="block h-1 w-24 bg-brand-red mx-auto mt-2"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Selecione os melhores presentes para demonstrar seu carinho e gratidão neste Dia das Mães.
              Produtos exclusivos com personalização e qualidade.
            </p>
          </motion.div>

          <div className="stagger-children grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {maesProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  images={product.images}
                  colors={product.colors}
                  isNew={product.isNew}
                  whatsappNumber="+5581995970776"
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/produtos">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-colors duration-300"
              >
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Promocional */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <img 
                src="https://images.unsplash.com/photo-1543365067-fa127bcb2303?q=80&w=1169&auto=format&fit=crop" 
                alt="Bordado especial para o Dia das Mães" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                Personalizações Exclusivas para Mães
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nossas artesãs criam bordados exclusivos para tornar seu presente ainda mais especial. 
                Cada peça é feita com carinho e atenção aos detalhes, assim como o amor de mãe.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-brand-red/10 text-brand-red px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <Gift className="mr-2 h-4 w-4" />
                  Bordados Personalizados
                </span>
                <span className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Embalagem para Presente
                </span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  Entrega Especial
                </span>
              </div>
              <Link to="/contato">
                <AppleButton size="lg" className="bg-brand-green text-white hover:bg-brand-green/90">
                  Solicitar Orçamento Personalizado
                </AppleButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mensagem Especial */}
      <section className="py-20 bg-brand-red/5 relative overflow-hidden">
        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Heart className="h-16 w-16 text-brand-red mx-auto mb-6 animate-pulse-soft" />
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-brand-dark">
              Neste Dia das Mães, ofereça o presente que demonstra o seu carinho.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Personalize e surpreenda com o Paraíso dos Bordados.
            </p>
            <div className="mt-8">
              <Link to="/contato">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="rounded-full bg-brand-red hover:bg-brand-red/90 text-white"
                >
                  Entre em Contato
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-10 left-10 opacity-10">
          <Heart className="h-32 w-32 text-brand-red" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <Heart className="h-32 w-32 text-brand-red" />
        </div>
      </section>

      {/* Testemunhos */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              O Que Dizem Nossas Clientes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Veja a experiência de quem já presenteou suas mães com produtos do Paraíso dos Bordados.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <CardTitle>Presente Perfeito</CardTitle>
                <CardDescription>Ana C.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "Presenteei minha mãe com um kit de toalhas bordadas e ela ficou encantada! A qualidade é excelente e o bordado ficou perfeito."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <CardTitle>Atendimento Excepcional</CardTitle>
                <CardDescription>Mariana T.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "O atendimento foi incrível, me ajudaram a escolher o melhor presente. Minha mãe adorou o roupão personalizado. Recomendo demais!"
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
                <CardTitle>Qualidade Impressionante</CardTitle>
                <CardDescription>Juliana M.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "Fiquei impressionada com a qualidade dos bordados. A bolsa que comprei para minha mãe ficou linda e ela usa todos os dias!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppSupport />
    </motion.div>
  );
};

export default DiadasMaes;
