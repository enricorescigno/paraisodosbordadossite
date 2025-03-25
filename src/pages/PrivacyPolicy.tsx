import Footer from "../components/Footer";
import WhatsAppSupport from "../components/WhatsAppSupport";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none"
          >
            <h1 className="text-3xl font-bold text-center text-brand-dark mb-8">POLÍTICA DE PRIVACIDADE</h1>
            
            <p>A Loja Paraíso dos Bordados se compromete com a segurança de seus dados e é claro que aqui na nossa loja oficial não é diferente. Mantemos suas informações no mais absoluto sigilo!</p>
            
            <p>Priorizamos a privacidade e a segurança de nossos clientes durante todo o processo de navegação e compra pelo site. Todos os dados cadastrados (nome, endereço, CPF) nunca serão comercializados ou trocados. Alguns dados, necessários para que empresas de logística e meios de pagamento possam realizar a cobrança e envio de seu pedido, serão divulgados para terceiros, quando tais informações forem necessárias para o processo de entrega e cobrança. Seus dados pessoais são fundamentais para que seu pedido chegue em segurança.</p>
            
            <p>Utilizamos cookies e informações de sua navegação com o objetivo de traçar um perfil do público que visita o site e, assim, podermos aperfeiçoar nossos serviços, produtos e conteúdos, tudo conforme o regulamentado pela Lei Geral de Proteção de Dados. Durante todo este processo, mantemos suas informações em sigilo absoluto.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">O que é a LGPD?</h2>
            <p>A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) regulamenta o tratamento de dados pessoais de clientes e usuários por parte de empresas públicas e privadas. O que são dados pessoais?</p>
            <p>Dados pessoais são quaisquer informações capazes de identificar você e/ou qualquer pessoa física. Ou seja, são considerados dados pessoais não só aqueles que identificam uma pessoa imediatamente (como nome, sobrenome, CPF, RG, CNH, Carteira de Trabalho, passaporte e título de eleitor), como também aqueles que, em conjunto com outros dados, tornam uma pessoa identificável. Dados como gênero, idade, telefone, e-mail, ainda que não sejam capazes de identificar alguém de imediato, em conjunto, tornam a pessoa passível de identificação.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">O que é tratamento de dados?</h2>
            <p>É o termo utilizado pela LGPD que resume tudo o que uma empresa pode fazer com dados pessoais a que tem acesso, como coleta, qualificação, compartilhamento e exclusão.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">O que são cookies?</h2>
            <p>São pequenos arquivos de texto enviados para seu navegador, contendo registros sobre seu comportamento ao acessar um site, mas que não armazenam dados pessoais ou afetam o sistema do seu dispositivo Utilizamos cookies, pixels e outras tecnologias para reconhecer seu navegador ou dispositivo, aprender mais sobre seus interesses, apresentar serviços essenciais, aperfeiçoar a sua experiência de navegação e, ainda, para impedir atividades fraudulentas e melhorar a sua segurança no processo de compra em nossa loja.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Cookies da Sessão:</h3>
            <p>Cookies da sessão são cookies temporários que são utilizados para lembrar de você durante o curso da sua visita ao site, e eles perdem a validade quando você fecha o navegador.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Cookies Persistentes:</h3>
            <p>Cookies persistentes são utilizados para medir a eficácia de nosso site, bem como lembrar suas preferências do site, e permanecem no seu desktop ou dispositivo móvel mesmo depois de você fechar o seu navegador ou efetuar uma reinicialização. Utilizamos tais cookies para analisar o comportamento do usuário e estabelecer padrões, de modo a melhorar a funcionalidade do nosso site para você e outros que o visitam. Estes cookies também nos permitem oferecer os anúncios segmentados e medir a eficácia do nosso site, além da funcionalidade de tais anúncios.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Como usamos os dados pessoais que coletamos?</h2>
            <p>Você está ciente de que fornece informação de forma consciente e voluntária por meio de aceite dos cookies da página, bem como no momento de realização de um pedido no site e/ou cadastro em nosso site. Quando você o realiza o cadastro e/ou preenche formulário oferecido pela Paraíso dos Bordados, inclusive nos sites por ela operados, determinados Dados Pessoais solicitados serão mantidos em sigilo e serão utilizados apenas para o propósito que motivou o cadastro, não sendo divulgados a terceiros, a não ser no cumprimento de ordens judiciais e/ou emitidas por autoridades públicas. Para que estes dados permaneçam seguros, recomendamos que você jamais forneça seus dados de acesso ao site (login e senha) a terceiros, mesmo que sejam amigos e parentes. Em caso de suspeita ou confirmação de acesso indevido, entre imediatamente em sua área de cliente e altere a senha.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Por quanto tempo usamos os dados pessoais que coletamos?</h2>
            <p>Os Dados Pessoais são armazenados somente pelo tempo necessário para cumprir com as finalidades para as quais foram coletados, salvo se houver outra razão para a sua manutenção, a exemplo do cumprimento de quaisquer obrigações legais, regulatórias, contratuais, entre outras.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Quais os seus direitos?</h2>
            <p>Você tem direito de solicitar à Paraíso dos Bordados informações referentes ao tratamento de seus dados pessoais, por meio dos pedidos abaixo:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-4">
              <li>Confirmação da existência de tratamento de dados pessoais seus e acesso aos dados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados - é importante que os dados pessoais sejam precisos e atuais e cabe a você mantê-los corretos e atualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD - você poderá solicitar o bloqueio e a eliminação de seus dados pessoais, salvo nos casos previstos em lei;</li>
              <li>Portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa, de acordo com a regulamentação da Autoridade Nacional, observados os segredos comercial e industrial - a portabilidade dos dados pessoais não inclui dados já anonimizados pela Paraíso dos Bordados;</li>
              <li>Informação sobre o compartilhamento de dados com entidades públicas e privadas;</li>
              <li>Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa: a Paraíso dos Bordados está disponível para atender e auxiliar, de forma transparente, quaisquer dúvidas que possam existir em função do tratamento dos seus dados pessoais, inclusive sobre os possíveis impactos decorrentes do não fornecimento do consentimento;</li>
              <li>Revogação do consentimento: você pode retirar o seu consentimento em relação às atividades de tratamento que o requerem;</li>
            </ol>
            <p>Para qualquer dos pedidos elencados acima, você deverá entrar em contato com a Paraíso dos Bordados por meio das informações de contato disponibilizadas.</p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Cadastre-se e compre com tranquilidade, sem preocupações:</h2>
            <p>As alterações sobre nossa política de privacidade serão devidamente informadas neste espaço.</p>
            <p>A Paraíso dos Bordados garante que utiliza os seus dados pessoais de endereçamento, pagamento e conteúdo do pedido, apenas para fins de processamento dos pedidos realizados, não sendo, portanto, divulgados em hipótese alguma. Em relação à segurança no tráfego de dados, toda a navegação realizada em nosso site, bem como as transações que envolverem pagamento, seja por cartão de crédito ou não, estarão criptografadas com a tecnologia SSL (Secure Socket Layer). Isso significa que só a loja tem acesso a suas informações pessoais e mais ninguém. Quando você preenche os dados e nos envia, eles são criptografados, o que faz com que, durante o trajeto pela Internet, fiquem irreconhecíveis, assegurando a confidencialidade. Verifique, abaixo.</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Certificados de segurança</h3>
            <p className="font-bold">SELO GOOGLE SAFE BROWSING:</p>
            <p>O Google é a maior empresa de pesquisas e tecnologia do mundo. A empresa possui um sistema de avaliação de navegação segura, examinando bilhões de websites diariamente. Ao realizar a inspeção diária de nosso website, o Google atesta que o mesmo é seguro para navegação e nos concede o seu selo de segurança que consta no rodapé da página. Clique no selo para que o Google faça a verificação agora.</p>
            
            <p className="font-bold mt-6">CERTIFICADO SSL:</p>
            <p>O certificado digital SSL é o nível de segurança mais alto e obrigatório para todos os sites que realizam transmissão de dados, como, por exemplo, nos e-commerces que solicitam informações sensíveis aos clientes, como e-mail e dados do cartão de crédito. Esse certificado pode ser verificado pelo cadeado verde na barra de navegação que atesta que o site protege as informações que são enviadas pelos clientes por meio de criptografia de dados, o que praticamente elimina a possibilidade de interceptação de dados. Sites seguros são acessados pelo prefixo HTTPS, os sites que possuem acesso apenas pelo prefixo HTTP não são seguros e não criptografam as informações. Confira o cadeado verde e o prefixo HTTPS no seu navegador e verifique o nosso selo de Certificado SSL no rodapé da página.</p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default PrivacyPolicy;
