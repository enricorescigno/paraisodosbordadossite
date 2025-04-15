import { useState, useRef } from 'react';
import { Gift, Calendar, Instagram, Phone, Facebook, Mail, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Add Montserrat font
const fontFamily = `'Montserrat', sans-serif`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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

// Form schema
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  phone: z.string().min(11, {
    message: "Por favor, insira um telefone válido com DDD.",
  }),
});

const MaesPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Add navigation hook
  useScrollToTop();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this data to your backend
    console.log(values);
    
    // Show success message
    setSubmitted(true);
    
    // Show toast notification
    toast({
      title: "Inscrição realizada com sucesso!",
      description: "Você já está participando do sorteio. Boa sorte!",
    });

    // Navigate to home page after a short delay
    setTimeout(() => {
      navigate('/');
    }, 2000); // 2 seconds delay to show the success message
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily }}>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-lg font-bold text-brand-red">
            Paraíso dos Bordados
          </div>
          
          <h1 className="text-center text-xl md:text-2xl font-medium text-brand-red drop-shadow-sm">
            Promoção especial de Dia das Mães
          </h1>
          
          <div className="w-16 md:w-24"></div> {/* Spacer for balance */}
        </div>
      </header>

      {/* Hero Section with Form */}
      <section 
        className="pt-24 md:pt-28 pb-16 bg-gradient-to-b from-pink-50 to-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-brand-red mb-4"
              variants={fadeInUp}
            >
              Participe do nosso sorteio especial de Dia das Mães!
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-700 mb-8"
              variants={fadeInUp}
            >
              Preencha abaixo e concorra a um presente incrível para sua mãe.
            </motion.p>
          </motion.div>
          
          <motion.div 
            ref={formRef}
            className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {!submitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome completo" {...field} />
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
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" type="email" {...field} />
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
                        <FormLabel>Telefone com WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-6 text-lg transition-all duration-300 hover:shadow-lg"
                  >
                    Quero participar
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Pronto!</h3>
                <p className="text-gray-600">Você já está participando. Boa sorte!</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">
            Como funciona o sorteio?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-pink-100 rounded-full mb-4">
                <Calendar className="h-7 w-7 text-brand-red" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Inscreva-se</h3>
              <p className="text-gray-600">
                Faça sua inscrição até o dia 11/05/2025 para participar do sorteio
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-pink-100 rounded-full mb-4">
                <Instagram className="h-7 w-7 text-brand-red" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sorteio ao vivo</h3>
              <p className="text-gray-600">
                O sorteio será realizado ao vivo no nosso Instagram em 12/05/2025
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-pink-100 rounded-full mb-4">
                <Gift className="h-7 w-7 text-brand-red" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Retire seu prêmio</h3>
              <p className="text-gray-600">
                O prêmio poderá ser retirado na loja ou enviado para a ganhadora
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer with Social Links */}
      <footer className="bg-brand-red text-white py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">Siga-nos nas redes sociais</h3>
            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-white/80 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-white/80 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="mailto:contato@paraisodosbordados.com" className="hover:text-white/80 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="mb-2">Entre em contato via WhatsApp</p>
            <a 
              href="https://wa.me/5581995970776" 
              className="inline-flex items-center gap-2 text-white hover:text-white/80 font-medium"
            >
              <Phone className="h-5 w-5" />
              (81) 99597-0776
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MaesPage;
