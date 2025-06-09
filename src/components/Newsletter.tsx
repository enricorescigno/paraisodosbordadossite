
import { useState } from 'react';
import { Send, Check } from 'lucide-react';

// Input sanitization helper
const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase().replace(/[<>]/g, '');
};

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = sanitizeEmail(email);
    
    if (!sanitizedEmail) {
      setError('Por favor, insira um email válido');
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      setError('Formato de email inválido');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call with proper error handling
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      // Reset form after some time
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
        setError('');
      }, 3000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-brand-red text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-medium tracking-tight mb-4">
            Receba Nossas Novidades
          </h2>
          <p className="text-white/90 mb-8 max-w-lg mx-auto font-semibold">
            Inscreva-se em nossa newsletter e fique por dentro das novidades, promoções exclusivas e dicas de bordado.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-grow relative">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitted || isLoading} 
                className="w-full py-3 px-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-80 font-light" 
                required 
                maxLength={254}
                autoComplete="email"
              />
              {error && (
                <p className="text-red-200 text-sm mt-1 text-left" role="alert">
                  {error}
                </p>
              )}
            </div>
            <button 
              type="submit" 
              disabled={isSubmitted || isLoading} 
              className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20 
                ${isSubmitted ? 'bg-green-600 text-white' : 'bg-white text-brand-red hover:bg-white/90'} disabled:opacity-80`}
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></span>
              ) : isSubmitted ? (
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Inscrito!
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Send className="h-4 w-4" />
                  Inscrever
                </span>
              )}
            </button>
          </form>
          
          <p className="text-white/75 text-sm mt-4 font-extrabold">
            Não se preocupe, respeitamos sua privacidade e você pode cancelar a inscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
