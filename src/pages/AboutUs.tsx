import { MapPin, Phone, Mail, Clock, Heart, Award, Zap, ShoppingBag, Check, Gift } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppSupport from "../components/WhatsAppSupport";
const AboutUs = () => {
  return <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16 py-0">
        {/* Hero Section */}
        <section className="bg-brand-light py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-6">Sobre Nós</h1>
              <p className="text-lg text-gray-600 font-normal">
                Conheça a nossa história, missão e valores
              </p>
            </div>
          </div>
        </section>
        
        {/* Introduction */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="font-serif text-3xl font-bold mb-6 text-brand-red">Bem-Vindo a Paraíso dos Bordados</h2>
                <p className="text-gray-700 mb-5">
                  Bem-vindo à Paraíso dos Bordados, a sua loja de referência em Recife, PE! Há mais de 20 anos no mercado, somos apaixonados por transformar ideias em peças únicas e especiais. Especializados em bordados personalizados, trabalhamos com precisão e criatividade para adicionar um toque exclusivo a cada produto, tornando-o verdadeiramente único. Seja para presentear alguém especial ou renovar os itens do seu lar, nossos bordados refletem cuidado, estilo e sofisticação.
                </p>
                <div className="flex items-center gap-2 text-brand-red">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Paixão pelo que fazemos</span>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <img alt="Equipe Paraíso dos Bordados" className="w-full h-full object-cover" src="/lovable-uploads/cb60af2d-a399-4029-ab74-6f5374d38b9c.png" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                  <div className="flex items-center gap-3">
                    <Award className="h-10 w-10 text-brand-red" />
                    <div>
                      <p className="font-medium text-brand-dark">Mais de</p>
                      <p className="font-serif text-2xl font-bold text-brand-red">20 Anos</p>
                      <p className="text-sm text-gray-600">de experiência</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* What We Offer */}
        <section className="py-16 bg-brand-light">
          <div className="container-custom">
            <h2 className="font-serif text-3xl text-center font-bold mb-12 text-brand-red">O que Oferecemos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-brand-red/10 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag className="h-7 w-7 text-brand-red" />
                </div>
                <h3 className="font-medium text-xl mb-4">Produtos para Casa</h3>
                <p className="text-gray-600">
                  Oferecemos uma ampla variedade de produtos de cama, mesa e banho, cuidadosamente selecionados para trazer conforto e elegância ao seu dia a dia.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-brand-red/10 rounded-full flex items-center justify-center mb-6">
                  <Gift className="h-7 w-7 text-brand-red" />
                </div>
                <h3 className="font-medium text-xl mb-4">Presentes Personalizados</h3>
                <p className="text-gray-600">
                  Transformamos produtos comuns em itens cheios de charme, funcionalidade e exclusividade, perfeitos para presentear pessoas especiais.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105">
                <div className="w-14 h-14 bg-brand-red/10 rounded-full flex items-center justify-center mb-6">
                  <Check className="h-7 w-7 text-brand-red" />
                </div>
                <h3 className="font-medium text-xl mb-4">Vestuário</h3>
                <p className="text-gray-600">
                  Contamos também com uma linha de camisas polos e básicas, perfeitas para compor um visual casual e elegante para diversas ocasiões.
                </p>
              </div>
            </div>
            
            <div className="mt-16">
              <p className="text-gray-700 mb-5">
                Além dos nossos serviços de bordados, oferecemos uma ampla variedade de produtos de cama, mesa e banho, cuidadosamente selecionados para trazer conforto e elegância ao seu dia a dia. Imagine suas toalhas, roupões e jogos de cama com aquele detalhe personalizado que só o Paraíso dos Bordados pode oferecer. Nossos produtos são pensados para tornar o seu lar ainda mais acolhedor e cheio de personalidade.
              </p>
              <p className="text-gray-700 mb-5">
                Para quem busca estilo no dia a dia, contamos também com uma linha de camisas polos e básicas, perfeitas para compor um visual casual e elegante, seja no trabalho, em um passeio ou em momentos de lazer. Nossas peças combinam qualidade, durabilidade e um design atemporal, sempre alinhadas às tendências da moda.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Commitment */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h2 className="font-serif text-3xl font-bold mb-6 text-brand-red">Nosso compromisso</h2>
                <p className="text-gray-700 mb-5">
                  Nosso compromisso vai além da qualidade dos produtos. Priorizamos um atendimento excepcional, garantindo que cada cliente tenha uma experiência única em nossa loja. Oferecemos um serviço ágil e personalizado, com destaque para a possibilidade de realizar pedidos e personalizações diretamente pelo nosso WhatsApp, com a mesma atenção e cuidado que você merece. Além disso, para serviços específicos, garantimos um prazo mínimo de entrega de até 1 hora, mostrando nossa eficiência e dedicação.
                </p>
                <p className="text-gray-700 mb-5">
                  Na Paraíso dos Bordados, acreditamos que os pequenos detalhes fazem toda a diferença. Seja para dar um toque especial à sua casa, para presentear alguém ou até para criar itens corporativos personalizados, estamos prontos para atender às suas necessidades com excelência.
                </p>
                <p className="text-gray-700 mb-5">
                  Venha nos visitar e descubra como é fácil unir praticidade, estilo e personalização em um só lugar. Estamos localizados em Recife/PE, prontos para receber você com todo o carinho e dedicação que nossos clientes já conhecem e confiam. Caso prefira, entre em contato pelo nosso WhatsApp, onde nossa equipe estará pronta para atender suas dúvidas, sugestões e pedidos.
                </p>
                <p className="text-gray-700 font-medium">
                  Escolha a Paraíso dos Bordados para transformar produtos comuns em itens cheios de charme, funcionalidade e exclusividade. Aqui, o seu estilo e a sua personalidade são o nosso maior destaque. Sinta o prazer de personalizar e decorar com quem entende do assunto: Paraíso dos Bordados, onde cada detalhe é feito com amor e perfeição!
                </p>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-brand-light p-8 rounded-lg">
                  <h3 className="font-medium text-xl mb-6 text-brand-dark">Visite-nos</h3>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-brand-red shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-brand-dark">Endereço</p>
                        <p className="text-gray-600">R. das Calçadas, 232 - São José, Recife PE</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-brand-red shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-brand-dark">Telefone</p>
                        <a href="tel:+558137873206" className="text-gray-600 hover:text-brand-red transition-colors">
                          (81) 3787-3206
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-brand-red shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-brand-dark">E-mail</p>
                        <a href="mailto:paraisodosbordados65@hotmail.com" className="text-gray-600 hover:text-brand-red transition-colors">
                          paraisodosbordados65@hotmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-brand-red shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-brand-dark">Horário de Funcionamento</p>
                        <p className="text-gray-600">
                          Seg - Sex: 09h às 18h<br />
                          Sábado: 09h às 15h
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-start gap-4">
                      <Zap className="h-5 w-5 text-brand-red shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-brand-dark">Entrega Rápida</p>
                        <p className="text-gray-600">
                          Para serviços específicos, garantimos um prazo mínimo de entrega de até 1 hora.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppSupport />
    </div>;
};
export default AboutUs;