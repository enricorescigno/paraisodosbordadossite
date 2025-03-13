
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";
import WhatsAppSupport from "../components/WhatsAppSupport";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-brand-red">404</h1>
          <p className="text-2xl font-medium text-brand-dark mb-6">Página não encontrada</p>
          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida para outro endereço.
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default NotFound;
