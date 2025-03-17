
import { getProducts } from '../services/mysqlService';
import { allProducts } from '../utils/productUtils';

/**
 * Product API handler
 * This is a placeholder that will be connected to actual routes later
 * Currently returns mock data or empty arrays
 */
export const fetchProducts = async () => {
  // When activated, this will use the MySQL connection
  // For now, it returns the inactive message and empty data
  return await getProducts();
};

/**
 * Get a single product by ID
 * This returns mock data from the productUtils file
 */
export const fetchProductById = async (id: string | number) => {
  // This would normally fetch from the database
  // When integration is activated, this will be updated
  
  // Normalize the ID to string for comparison
  const normalizedId = id.toString();
  
  // Find the product in our mock data
  const mockProduct = allProducts.find(product => product.id.toString() === normalizedId);
  
  // Add debugging logs
  console.log(`Fetching product with ID: ${normalizedId}`);
  console.log(`Product found: ${mockProduct ? 'Yes - ' + mockProduct.name : 'No'}`);
  
  return {
    message: 'Using mock data (MySQL integration is prepared but not activated)',
    data: mockProduct || null
  };
};
