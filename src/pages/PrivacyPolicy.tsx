
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppSupport from '../components/WhatsAppSupport';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Política de Privacidade</h1>
        
        <div className="max-w-3xl mx-auto prose prose-lg">
          <p className="mb-4">
            Agradecemos por escolher a Paraíso dos Bordados. Nossa política de privacidade descreve como coletamos, utilizamos e protegemos suas informações pessoais.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Coleta de Informações</h2>
          <p className="mb-4">
            Coletamos informações pessoais como nome, endereço, e-mail e telefone quando você realiza um pedido ou se inscreve em nossa newsletter.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Uso das Informações</h2>
          <p className="mb-4">
            Utilizamos suas informações para processar pedidos, enviar atualizações sobre seus pedidos, e ocasionalmente enviar newsletters e promoções, caso você tenha optado por recebê-las.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Proteção de Dados</h2>
          <p className="mb-4">
            Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
          <p className="mb-4">
            Utilizamos cookies para melhorar sua experiência em nosso site. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar sua experiência.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Divulgação a Terceiros</h2>
          <p className="mb-4">
            Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto para processamento de pagamentos e entrega de produtos.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Alterações na Política de Privacidade</h2>
          <p className="mb-4">
            Podemos atualizar nossa política de privacidade periodicamente. Recomendamos verificar esta página regularmente para se manter informado sobre nossas práticas.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Prazo e Envio</h2>
          <p className="mb-4">
            O prazo de entrega é calculado a partir da confirmação do pagamento, não da data de realização do pedido. O prazo pode variar conforme a região de entrega e o método de envio escolhido.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contato</h2>
          <p className="mb-4">
            Se você tiver dúvidas sobre nossa política de privacidade, entre em contato conosco:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Por telefone: (81) 3787-3206</li>
            <li>Por WhatsApp: (81) 99597-0776</li>
            <li>Por e-mail: paraisodosbordados65@hotmail.com</li>
            <li>Endereço: R. das Calçadas, 232 - São José, Recife PE</li>
          </ul>
          
          <p className="mt-8 text-sm text-gray-600">
            Última atualização: Março 2025
          </p>
        </div>
      </div>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default PrivacyPolicy;
