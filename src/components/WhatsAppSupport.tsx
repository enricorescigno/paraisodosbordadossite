
import { MessageCircle } from 'lucide-react';

const WhatsAppSupport = () => {
  return (
    <a
      href="https://wa.me/5581995970776"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
      aria-label="Atendimento via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-30"></span>
    </a>
  );
};

export default WhatsAppSupport;
