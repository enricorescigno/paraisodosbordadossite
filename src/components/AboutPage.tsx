
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Sobre Nós</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Bem-vindo ao Paraíso dos Bordados, sua fonte confiável para produtos têxteis de alta qualidade e serviços de bordado personalizados.
          </p>
          <p className="text-lg mb-6">
            Fundada com a paixão pela qualidade e atenção aos detalhes, nossa empresa se dedica a oferecer produtos que combinam funcionalidade, durabilidade e estética.
          </p>
          <p className="text-lg mb-6">
            Nossa missão é proporcionar aos nossos clientes produtos têxteis e bordados de excelência, com atendimento personalizado e preços justos.
          </p>
        </div>
      </div>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default AboutPage;
