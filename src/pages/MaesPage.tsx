import { useRef, useEffect, useState } from 'react';
import { Heart, Gift, ArrowDown } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppleButton } from '@/components/ui/apple-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ProductsCarousel from '@/components/product/ProductsCarousel';
import { Product } from '@/types/product';
import { bonesProducts, bordadosProducts } from '@/utils/productUtils';
import { getImageLoading } from '@/utils/imageUtils';
import { useScrollToTop } from '@/hooks/useScrollToTop';

// Produtos para o Dia das Mães
const mothersProducts: Product[] = [
  ...bonesProducts.slice(0, 3),
  ...bordadosProducts.slice(0, 3)
];

// Animações
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const MaesPage = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  useScrollToTop();

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Preload imagens
  useEffect(() => {
    const heroImage = new Image();
    heroImage.src = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
    mothersProducts.slice(0, 2).forEach((product) => {
      const img = new Image();
      img.src = product.imageUrl;
    });
  }, []);

  // Formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    nomeDaMae: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await fetch('https://n8n.rfmidias.com.br/webhook-test/form-agtech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormStatus('success');
    } catch {
      alert('Erro ao enviar. Tente novamente.');
      setFormStatus('idle');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
            backgroundPosition: '75% center' 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/60"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div className="max-w-2xl" initial="hidden" animate={isHeroInView ? "visible" : "hidden"} variants={staggerContainer}>
            <motion.h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-red mb-4" variants={fadeInUp}>
              Celebre o Dia das Mães com um presente único!
            </motion.h1>
            <motion.p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8" variants={fadeInUp}>
              Ofereça um toque de elegância e carinho com nossos produtos exclusivos para essa data especial.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <AppleButton 
                size="lg" 
                className="group bg-[#E30613] hover:bg-[#c00510] text-white px-6 md:px-8 py-3 md:py-4"
                onClick={scrollToProducts}
              >
                <span>Ver Produtos</span>
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </AppleButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Formulário de Sorteio */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">Participe do Sorteio de Dia das Mães</h2>
          <p className="text-center text-gray-600 mb-8">Preencha os dados abaixo e concorra a um presente exclusivo da Paraíso dos Bordados!</p>
          
          <form onSubmit={handleFormSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                name="nome" 
                required 
                placeholder="Seu nome completo" 
                value={formData.nome} 
                onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="Seu e-mail" 
                value={formData.email} 
                onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input 
                type="tel" 
                name="telefone" 
                required 
                placeholder="Telefone com WhatsApp" 
                value={formData.telefone} 
                onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
              <input 
                type="text" 
                name="nomeDaMae" 
                required 
                placeholder="Nome da mãe" 
                value={formData.nomeDaMae} 
                onChange={handleFormChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#E30613] text-white font-semibold py-3 rounded-lg hover:bg-[#c00510] transition-colors duration-200"
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? 'Enviando...' : 'Quero Participar'}
            </button>

            {formStatus === 'success' && (
              <p className="text-green-600 text-center mt-4 font-medium">
                Pronto! Você já está participando. Boa sorte! 🎉
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Produtos */}
      <section ref={productsRef} className="py-12 md:py-16 bg-gray-50">
        <motion.div 
          className="container mx-auto px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Presentes Especiais</h2>
              <p className="text-gray-600">Seleção exclusiva para o Dia das Mães</p>
            </div>
            <Heart className="text-[#E30613] h-6 w-6 md:h-8 md:w-8" />
          </div>
          <ProductsCarousel products={mothersProducts} whatsappNumber="5511999999999" />
        </motion.div>
      </section>

      {/* Mensagem Final */}
      <section className="py-12 md:py-16 bg-white">
        <motion.div 
          className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-6 md:p-8 lg:p-12 rounded-2xl" style={{ background: "linear-gradient(to right, rgba(227, 6, 19, 0.05), rgba(0, 100, 0, 0.05))" }}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Mensagem Especial</h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 italic mb-6 md:mb-8">
              "Neste Dia das Mães, ofereça o presente que demonstra o seu carinho. Personalize e surpreenda com o Paraíso dos Bordados."
            </p>
            <Link to="/produtos">
              <AppleButton size="lg" className="mt-4 bg-[#006400] hover:bg-[#005000] text-white">
                Explore Nossa Coleção
              </AppleButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MaesPage;