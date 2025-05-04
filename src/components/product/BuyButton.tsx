
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { AppleButton } from '@/components/ui/apple-button';
import { motion } from 'framer-motion';

interface BuyButtonProps {
  getWhatsAppLink: () => string;
  isMobile: boolean;
}

const BuyButton = ({ getWhatsAppLink, isMobile }: BuyButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={isMobile ? undefined : "mt-6 mb-10"}
    >
      <a 
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={isMobile ? "w-full" : "block w-full md:max-w-[320px]"}
        aria-label="Solicitar orçamento via WhatsApp"
      >
        <AppleButton 
          size="lg" 
          className={`${isMobile ? 'w-[95%] mx-auto' : 'w-full'} h-14 rounded-lg flex items-center justify-center gap-2 bg-[#C00] hover:bg-[#B00] transition-colors`}
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          Solicitar Orçamento
        </AppleButton>
      </a>
    </motion.div>
  );
};

export default BuyButton;
