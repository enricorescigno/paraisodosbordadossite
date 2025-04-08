
import { getProducts } from '../services/mysqlService';
import { allProducts } from '../utils/productUtils';

/**
 * Product API handler
 * Now attempts to use the MySQL database first, with fallback to mock data
 */
export const fetchProducts = async () => {
  // Try to fetch from MySQL database
  try {
    const result = await getProducts();
    
    // If we got valid data from the database, return it
    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      return {
        message: 'Data retrieved from MySQL database',
        data: result.data
      };
    }
    
    // If database connection failed or returned no data, fall back to mock data
    console.log("Using mock data instead of MySQL");
    return {
      message: 'Using mock data - MySQL connection unsuccessful or returned no data',
      data: allProducts
    };
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    return {
      message: 'Using mock data - MySQL connection error',
      data: allProducts
    };
  }
};

/**
 * Get a single product by ID
 * Now tries to retrieve from database first, with fallback to mock data
 */
export const fetchProductById = async (id: string | number) => {
  // Convert id to string for consistent comparison
  const stringId = String(id);
  
  try {
    // Try to get a connection and fetch the product from the database
    const connection = await (await import('../services/mysqlService')).getConnection();
    if (connection) {
      const [rows] = await connection.execute('SELECT * FROM produtos WHERE id = ?', [stringId]);
      await connection.end();
      
      // If we found the product, return it
      if (Array.isArray(rows) && rows.length > 0) {
        return {
          message: 'Product retrieved from MySQL database',
          data: rows[0]
        };
      }
    }
    
    // Fallback to mock data logic
    console.log(`Fetching product with ID: ${stringId} from mock data`);
    
    // Special case for product ID 204
    if (stringId === "204") {
      return {
        message: 'Mock data for Jogo Americano',
        data: {
          id: 204,
          name: "Jogo Americano Requinte Ondulado",
          type: "product",
          category: "Mesa e Cozinha",
          imageUrl: "/lovable-uploads/77ef9243-1485-4e45-b51d-6e05b692b7e7.png", 
          description: "Jogo americano com bordado elegante, conjunto com 4 unidades. Eleve sua experiência à mesa com o jogo americano Requinte Ondulado. Com uma composição inteligente de 75% polipropileno e 25% poliéster, este jogo americano é sinônimo de resistência e praticidade. Sua durabilidade o torna perfeito para o uso diário, e a limpeza é simples, graças à sua fácil lavagem. Além disso, seca rapidamente, estando pronto para ser usado sempre que você precisar. Com um diâmetro de 38cm, o formato redondo complementa sua mesa de maneira elegante. Adicione estilo e conveniência à sua refeição com este elegante jogo americano.",
          colors: ["Branco", "Dourado", "Bege", "Marrom", "Rosa", "Verde", "Vinho"],
          sizes: [],
          rating: 4.9,
          isNew: true,
          features: [
            "Composição: 75% polipropileno e 25% poliéster", 
            "Diâmetro: 38cm", 
            "Conjunto com 4 unidades",
            "Fácil lavagem e secagem rápida",
            "Resistente para uso diário"
          ],
          keywords: ["jogo americano", "mesa", "cozinha", "bordado"],
        }
      };
    }
    
    // Find the product in our mock data
    const product = allProducts.find(p => String(p.id) === stringId);
    
    if (product) {
      return {
        message: 'Mock data retrieved successfully',
        data: product
      };
    } else {
      console.log(`Product with ID ${stringId} not found in mock data`);
      return {
        message: 'Product not found',
        data: null
      };
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return {
      message: 'Error fetching product',
      data: null
    };
  }
};
