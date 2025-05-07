
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ProductNotFound: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="bg-gray-100/50 rounded-full p-6 mb-6">
        <Search className="h-12 w-12 text-gray-400" />
      </div>
      
      <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-[#1D1D1F]">
        Produto não encontrado
      </h1>
      
      <p className="text-lg text-[#1D1D1F]/70 max-w-md mb-8">
        O produto que você está procurando não está disponível ou foi removido.
        Explore nossos outros produtos ou entre em contato conosco para assistência.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/produtos">
          <Button 
            variant="default" 
            size="lg"
            className="rounded-full min-w-[180px]"
          >
            Ver produtos
          </Button>
        </Link>
        
        <Link to="/">
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full min-w-[180px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductNotFound;
