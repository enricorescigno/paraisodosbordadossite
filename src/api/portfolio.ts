
import { getPortfolioItems } from '../services/mysqlService';

/**
 * Portfolio API handler
 * Now uses activated MySQL integration to fetch portfolio items
 */
export const fetchPortfolioItems = async () => {
  try {
    // Attempt to fetch from the MySQL database
    const result = await getPortfolioItems();
    
    // If we got data from the database, return it
    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      return {
        message: 'Portfolio items retrieved from MySQL database',
        data: result.data
      };
    } else {
      // If no data or error, return empty array with message
      return {
        message: 'No portfolio items found in database or connection issue',
        data: []
      };
    }
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return {
      message: 'Error fetching portfolio items from database',
      data: []
    };
  }
};

/**
 * Get a single portfolio item by ID
 * Now attempts to fetch from MySQL database
 */
export const fetchPortfolioItemById = async (id: string | number) => {
  try {
    // Try to get a connection and fetch the portfolio item
    const connection = await (await import('../services/mysqlService')).getConnection();
    if (connection) {
      const [rows] = await connection.execute('SELECT * FROM portfolio WHERE id = ?', [id]);
      await connection.end();
      
      // If we found the item, return it
      if (Array.isArray(rows) && rows.length > 0) {
        return {
          message: 'Portfolio item retrieved from MySQL database',
          data: rows[0]
        };
      } else {
        // Item not found
        return {
          message: 'Portfolio item not found in database',
          data: null
        };
      }
    } else {
      // Connection failed
      return {
        message: 'Database connection failed',
        data: null
      };
    }
  } catch (error) {
    console.error("Error fetching portfolio item by ID:", error);
    return {
      message: 'Error fetching portfolio item from database',
      data: null
    };
  }
};
