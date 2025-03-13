
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppSupport from "../components/WhatsAppSupport";
import Partners from "../components/Partners";
import { motion } from "framer-motion";

const OurPartners = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold text-center text-brand-dark mb-8">Nossos Parceiros</h1>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-center text-lg mb-8">
                Na Paraíso dos Bordados, temos orgulho de trabalhar com parceiros de confiança que compartilham nosso compromisso com a qualidade e excelência. 
                Essas parcerias nos permitem oferecer os melhores produtos e serviços para nossos clientes.
              </p>
            </div>
            
            <Partners showTitle={false} fullPage={true} />
            
            <div className="mt-16 text-center">
              <p className="text-lg mb-4">Quer se tornar um parceiro?</p>
              <motion.a 
                href="https://wa.me/5581995970776" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-red hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Entre em contato conosco
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default OurPartners;
