
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Paraíso dos Bordados</h3>
            <p className="text-gray-300 mb-4">
              Especialistas em bordados artesanais e produtos de alta qualidade para os amantes dessa arte milenar.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors duration-300"
                aria-label="Youtube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/duvidas-frequentes" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Dúvidas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categorias */}
          <div>
            <h4 className="font-medium text-lg mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/categoria/bordados-maquina" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Bordados à Máquina
                </Link>
              </li>
              <li>
                <Link to="/categoria/bordados-manuais" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Bordados Manuais
                </Link>
              </li>
              <li>
                <Link to="/categoria/kits" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Kits de Bordado
                </Link>
              </li>
              <li>
                <Link to="/categoria/acessorios" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Acessórios
                </Link>
              </li>
              <li>
                <Link to="/categoria/tecidos" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Tecidos
                </Link>
              </li>
              <li>
                <Link to="/categoria/linhas" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Linhas e Agulhas
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Av. das Bordadeiras, 123<br />
                  São Paulo - SP, 01234-567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-red shrink-0" />
                <a href="tel:+551198765-4321" className="text-gray-300 hover:text-white transition-colors duration-300">
                  (11) 98765-4321
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-red shrink-0" />
                <a href="mailto:contato@paraisodosbordados.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                  contato@paraisodosbordados.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Segunda - Sexta: 09:00 - 18:00<br />
                  Sábado: 09:00 - 13:00
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-10" />
        
        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Paraíso dos Bordados. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <img 
              src="https://placehold.co/40x25/333333/FFFFFF?text=VISA&font=montserrat" 
              alt="Visa" 
              className="h-6"
            />
            <img 
              src="https://placehold.co/40x25/333333/FFFFFF?text=MC&font=montserrat" 
              alt="MasterCard" 
              className="h-6"
            />
            <img 
              src="https://placehold.co/40x25/333333/FFFFFF?text=AMEX&font=montserrat" 
              alt="American Express" 
              className="h-6"
            />
            <img 
              src="https://placehold.co/40x25/333333/FFFFFF?text=PIX&font=montserrat" 
              alt="PIX" 
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
