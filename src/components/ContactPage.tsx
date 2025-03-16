
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';
import { MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Entre em Contato</h1>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-brand-red mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">Endereço</h3>
                  <p className="text-gray-600">Rua dos Bordados, 123 - Recife, PE</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-brand-red mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">Telefone</h3>
                  <p className="text-gray-600">(81) 99597-0776</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-brand-red mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <p className="text-gray-600">contato@paraisodosbordados.com.br</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MessageCircle className="w-6 h-6 text-brand-red mr-4 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">WhatsApp</h3>
                  <p className="text-gray-600">(81) 99597-0776</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red" 
                  placeholder="Digite seu nome"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red" 
                  placeholder="Digite seu email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-red focus:border-brand-red" 
                  placeholder="Digite sua mensagem"
                ></textarea>
              </div>
              
              <button 
                type="button"
                className="px-6 py-3 bg-brand-red text-white rounded-md hover:bg-brand-red/90 transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default ContactPage;
