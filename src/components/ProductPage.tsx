
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppSupport from './WhatsAppSupport';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

// Sample product data - in a real app this would come from an API
const allProducts: Record<string, Product[]> = {
  // Cama, Mesa e Banho
  'cama-mesa-banho': [
    {
      id: 101,
      name: "Kit Bordado Cama, Mesa e Banho",
      price: 199.90,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500&auto=format&fit=crop",
      category: "Cama, Mesa e Banho",
      rating: 4.9
    },
    {
      id: 102,
      name: "Toalha Bordada Decorativa",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1579656450812-5b1bcd4a952e?q=80&w=500&auto=format&fit=crop",
      category: "Cama, Mesa e Banho",
      rating: 4.7
    }
  ],
  
  // Subcategorias de Cama, Mesa e Banho
  'cama': [
    {
      id: 110,
      name: "Kit Cama Bordado Tradicional",
      price: 349.90,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=500&auto=format&fit=crop",
      category: "Cama",
      rating: 4.8
    },
    {
      id: 111,
      name: "Jogo de Lençol Bordado",
      price: 229.90,
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop",
      category: "Cama",
      rating: 4.9
    }
  ],
  'mesa-cozinha': [
    {
      id: 120,
      name: "Toalha de Mesa Bordada",
      price: 129.90,
      image: "https://images.unsplash.com/photo-1619123707367-bb5cbd42072d?q=80&w=500&auto=format&fit=crop",
      category: "Mesa e Cozinha",
      rating: 4.7
    },
    {
      id: 121,
      name: "Guardanapos Bordados Kit 12 Peças",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1598115553860-e5319475a589?q=80&w=500&auto=format&fit=crop",
      category: "Mesa e Cozinha",
      rating: 4.6
    }
  ],
  'tapete-cortinas': [
    {
      id: 130,
      name: "Tapete Artesanal Bordado",
      price: 179.90,
      image: "https://images.unsplash.com/photo-1576698483491-8c43f0862543?q=80&w=500&auto=format&fit=crop",
      category: "Tapete e Cortinas",
      rating: 4.9
    },
    {
      id: 131,
      name: "Cortina Bordada 2,80m",
      price: 249.90,
      image: "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?q=80&w=500&auto=format&fit=crop",
      category: "Tapete e Cortinas",
      rating: 4.8
    }
  ],
  'banho': [
    {
      id: 140,
      name: "Toalha de Banho Bordada",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1576698485592-ea6854087245?q=80&w=500&auto=format&fit=crop",
      category: "Banho",
      rating: 4.9
    },
    {
      id: 141,
      name: "Kit Toalhas Bordadas 4 Peças",
      price: 139.90,
      image: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e7?q=80&w=500&auto=format&fit=crop",
      category: "Banho",
      rating: 4.7
    }
  ],
  
  // Infantil
  'infantil': [
    {
      id: 150,
      name: "Kit Berço Bordado",
      price: 299.90,
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=500&auto=format&fit=crop",
      category: "Infantil",
      rating: 4.9
    },
    {
      id: 151,
      name: "Toalha Infantil Personalizada",
      price: 79.90,
      image: "https://images.unsplash.com/photo-1596045986621-1587b7a54b1a?q=80&w=500&auto=format&fit=crop",
      category: "Infantil",
      rating: 4.8
    }
  ],
  
  // Vestuário
  'vestuario': [
    {
      id: 160,
      name: "Camisa Bordada Social",
      price: 129.90,
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=500&auto=format&fit=crop",
      category: "Vestuário",
      rating: 4.7
    },
    {
      id: 161,
      name: "Jaleco Bordado Profissional",
      price: 149.90,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500&auto=format&fit=crop",
      category: "Vestuário",
      rating: 4.8
    }
  ],
  
  // Subcategorias de Vestuário
  'camisa': [
    {
      id: 170,
      name: "Camisa Bordada Masculina",
      price: 129.90,
      image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=500&auto=format&fit=crop",
      category: "Camisa",
      rating: 4.6
    },
    {
      id: 171,
      name: "Camisa Bordada Feminina",
      price: 119.90,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=500&auto=format&fit=crop",
      category: "Camisa",
      rating: 4.7
    }
  ],
  'jaleco': [
    {
      id: 180,
      name: "Jaleco Bordado Medicina",
      price: 159.90,
      image: "https://images.unsplash.com/photo-1612349514383-d488b3fab0a2?q=80&w=500&auto=format&fit=crop",
      category: "Jaleco",
      rating: 4.9
    },
    {
      id: 181,
      name: "Jaleco Bordado Enfermagem",
      price: 149.90,
      image: "https://images.unsplash.com/photo-1576671414121-aa3fcf770b7a?q=80&w=500&auto=format&fit=crop",
      category: "Jaleco",
      rating: 4.8
    }
  ],
  'pantufa': [
    {
      id: 190,
      name: "Pantufa Bordada Adulto",
      price: 69.90,
      image: "https://images.unsplash.com/photo-1543673195-fa05a1c3ab53?q=80&w=500&auto=format&fit=crop",
      category: "Pantufa",
      rating: 4.7
    },
    {
      id: 191,
      name: "Pantufa Bordada Infantil",
      price: 59.90,
      image: "https://images.unsplash.com/photo-1588117756507-ee41ec34f06b?q=80&w=500&auto=format&fit=crop",
      category: "Pantufa",
      rating: 4.6
    }
  ],
  
  // Portfolio pages
  'bordado-bone': [
    {
      id: 201,
      name: "Boné Bordado Personalizado",
      price: 59.90,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Boné",
      rating: 4.8
    },
    {
      id: 202,
      name: "Boné Bordado Empresarial",
      price: 69.90,
      image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Boné",
      rating: 4.7
    }
  ],
  'bordado-necessaire': [
    {
      id: 210,
      name: "Necessaire Bordada Flores",
      price: 49.90,
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Necessaire",
      rating: 4.9
    },
    {
      id: 211,
      name: "Necessaire Bordada Personalizada",
      price: 59.90,
      image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Necessaire",
      rating: 4.8
    }
  ],
  'bordado-bolsa': [
    {
      id: 220,
      name: "Bolsa Bordada Tradicional",
      price: 129.90,
      image: "https://images.unsplash.com/photo-1594016113411-8c1e12a40567?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Bolsa",
      rating: 4.9
    },
    {
      id: 221,
      name: "Bolsa Bordada Praia",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1601401380722-cc8e33831cc6?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Bolsa",
      rating: 4.7
    }
  ],
  'bordado-jaleco': [
    {
      id: 230,
      name: "Jaleco Bordado Premium",
      price: 179.90,
      image: "https://images.unsplash.com/photo-1608543195389-8f4b089c2121?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Jaleco",
      rating: 5.0
    },
    {
      id: 231,
      name: "Jaleco Bordado Odontologia",
      price: 159.90,
      image: "https://images.unsplash.com/photo-1598316560463-0083295ca951?q=80&w=500&auto=format&fit=crop", 
      category: "Bordado em Jaleco",
      rating: 4.8
    }
  ],
  'bordado-infantis': [
    {
      id: 240,
      name: "Roupão Infantil Bordado",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1596461202276-9e6d59e4a416?q=80&w=500&auto=format&fit=crop",
      category: "Bordado Infantis",
      rating: 4.9
    },
    {
      id: 241,
      name: "Toalha Infantil Bordada",
      price: 69.90,
      image: "https://images.unsplash.com/photo-1583334648584-6c2ba5035246?q=80&w=500&auto=format&fit=crop",
      category: "Bordado Infantis",
      rating: 4.8
    }
  ],
  'bordado-toalha-banho': [
    {
      id: 250,
      name: "Toalha de Banho Bordada Premium",
      price: 99.90,
      image: "https://images.unsplash.com/photo-1600431521340-491eca880813?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Toalha de Banho",
      rating: 5.0
    },
    {
      id: 251,
      name: "Kit Toalhas Bordadas Casal",
      price: 159.90,
      image: "https://images.unsplash.com/photo-1603046891744-1f66d6fc89c9?q=80&w=500&auto=format&fit=crop",
      category: "Bordado em Toalha de Banho",
      rating: 4.9
    }
  ]
};

// Category name translations for titles
const categoryTitles: Record<string, string> = {
  'cama-mesa-banho': 'Cama, Mesa e Banho',
  'cama': 'Cama',
  'mesa-cozinha': 'Mesa e Cozinha',
  'tapete-cortinas': 'Tapete e Cortinas',
  'banho': 'Banho',
  'infantil': 'Infantil',
  'vestuario': 'Vestuário',
  'camisa': 'Camisa',
  'jaleco': 'Jaleco',
  'pantufa': 'Pantufa',
  'bordado-bone': 'Bordado em Boné',
  'bordado-necessaire': 'Bordado em Necessaire',
  'bordado-bolsa': 'Bordado em Bolsa',
  'bordado-jaleco': 'Bordado em Jaleco',
  'bordado-infantis': 'Bordado Infantis',
  'bordado-toalha-banho': 'Bordado em Toalha de Banho'
};

const ProductPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (categoryName) {
      // In a real application, this would be an API call
      setLoading(true);
      setTimeout(() => {
        const categoryProducts = allProducts[categoryName] || [];
        setProducts(categoryProducts);
        setLoading(false);
      }, 500); // Simulate network request
    }
  }, [categoryName]);
  
  const categoryTitle = categoryName ? categoryTitles[categoryName] || categoryName : 'Produtos';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-10 md:py-16 bg-brand-light">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">{categoryTitle}</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map((product) => (
                <div key={product.id} className="product-card bg-white rounded-lg overflow-hidden shadow-md animate-scale-in">
                  <div className="relative overflow-hidden aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-red text-white text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-700">{product.rating.toFixed(1)}</span>
                    </div>
                    <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-brand-red">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </p>
                      <Link 
                        to={`/produto/${product.id}`}
                        className="text-brand-dark hover:text-brand-red transition-colors duration-300"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">Nenhum produto encontrado nesta categoria.</p>
              <Link to="/" className="inline-block mt-4 btn-primary">
                Voltar para página inicial
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
      <WhatsAppSupport />
    </div>
  );
};

export default ProductPage;
