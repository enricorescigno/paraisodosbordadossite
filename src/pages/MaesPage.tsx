
import { useState } from 'react';
import { Calendar, Instagram, Gift, Phone, Check, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { AppleButton } from '@/components/ui/apple-button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Form schema
const giveawayFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  phone: z.string().min(11, { message: 'Telefone inválido' }).max(15)
});

type GiveawayFormValues = z.infer<typeof giveawayFormSchema>;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const MaesPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  useScrollToTop();
  
  const form = useForm<GiveawayFormValues>({
    resolver: zodResolver(giveawayFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: ""
    }
  });

  const onSubmit = (data: GiveawayFormValues) => {
    console.log('Form submitted:', data);
    // In a real app, you would send this data to a server
    toast.success("Formulário enviado com sucesso!");
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-red/90 backdrop-blur-sm py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-white text-xl md:text-2xl font-medium tracking-tight drop-shadow-sm">
            Promoção especial de Dia das Mães
          </h1>
        </div>
      </header>

      {/* Hero Section with Form */}
      <section className="pt-24 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div 
            className="max-w-lg mx-auto text-center mb-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-red mb-4"
              variants={fadeInUp}
            >
              Participe do nosso sorteio especial de Dia das Mães!
            </motion.h2>
            
            <motion.p 
              className="text-base md:text-lg text-gray-700 mb-6"
              variants={fadeInUp}
            >
              Preencha abaixo e concorra a um presente incrível para sua mãe.
            </motion.p>
          </motion.div>
          
          {!formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white p-6 rounded-xl shadow-md">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Nome completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Telefone com WhatsApp</FormLabel>
                          <FormControl>
                            <Input placeholder="(DDD) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <AppleButton 
                      type="submit" 
                      size="lg" 
                      className="w-full mt-6 bg-brand-red hover:bg-brand-red/90"
                    >
                      Quero participar
                    </AppleButton>
                  </form>
                </Form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pronto! Você já está participando.</h3>
              <p className="text-gray-600 mb-4">Boa sorte!</p>
              <AppleButton 
                onClick={() => setFormSubmitted(false)} 
                variant="outline" 
                className="mt-2"
              >
                Voltar ao formulário
              </AppleButton>
            </motion.div>
          )}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Como funciona o sorteio?
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Inscreva-se até o dia 11/05</h3>
              <p className="text-gray-600">Preencha o formulário até esta data para garantir sua participação.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Instagram className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sorteio ao vivo no Instagram</h3>
              <p className="text-gray-600">O sorteio será realizado ao vivo no Instagram em 12/05.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Gift className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Entrega do prêmio</h3>
              <p className="text-gray-600">O prêmio será retirado na loja ou enviado para a ganhadora.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Social Links */}
      <footer className="py-10 bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Paraíso dos Bordados</h3>
              <p className="text-gray-300 text-sm">Presentes especiais para todas as mães</p>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/paraisodosbordados" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              
              <a 
                href="https://wa.me/5581995970776" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="h-5 w-5" />
              </a>
              
              <Link
                to="/contato"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Info className="h-4 w-4" />
                <span>Mais informações</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© 2024 Paraíso dos Bordados. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaesPage;
