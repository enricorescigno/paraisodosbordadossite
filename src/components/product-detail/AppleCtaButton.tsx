
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppleCtaButtonProps {
  href: string;
  isMobile: boolean;
}

const AppleCtaButton = ({ href, isMobile }: AppleCtaButtonProps) => {
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-10">
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <motion.button 
            className="w-full h-14 rounded-lg flex items-center justify-center gap-2 bg-brand-red hover:bg-[#990000] text-white font-medium text-base transition-colors shadow-sm"
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="w-5 h-5" />
            Solicitar Orçamento
          </motion.button>
        </a>
      </div>
    );
  }
  
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full md:max-w-[360px]"
    >
      <motion.button 
        className="w-full h-14 rounded-lg flex items-center justify-center gap-2 bg-brand-red hover:bg-[#990000] text-white font-medium text-base transition-colors shadow-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="w-5 h-5" />
        Solicitar Orçamento
      </motion.button>
    </a>
  );
};

export default AppleCtaButton;
