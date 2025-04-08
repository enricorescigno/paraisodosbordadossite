
// MySQL Service for Paraíso dos Bordados
// This service is now ACTIVATED

import mysql from 'mysql2/promise';

// Database configuration
// Replace these with environment variables in a production setting
const dbConfig = {
  host: 'ENDEREÇO_DO_SERVIDOR',
  user: 'USUÁRIO',
  password: 'SENHA',
  database: 'NOME_DO_BANCO_DE_DADOS',
};

/**
 * Creates and returns a MySQL connection
 */
export const getConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('MySQL connection established');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    return null;
  }
};

/**
 * Creates a connection pool for handling multiple requests
 * To be used when the application needs to handle many concurrent database operations
 */
export const getConnectionPool = async () => {
  try {
    const pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('MySQL connection pool established');
    return pool;
  } catch (error) {
    console.error('Error creating MySQL connection pool:', error);
    return null;
  }
};

/**
 * Fetches products from the database
 */
export const getProducts = async () => {
  const connection = await getConnection();
  if (!connection) return { error: 'Database connection failed', data: [] };
  
  try {
    const [rows] = await connection.execute('SELECT * FROM produtos');
    await connection.end();
    return { data: rows };
  } catch (error) {
    console.error('Error fetching products:', error);
    await connection.end();
    return { error: 'Failed to fetch products', data: [] };
  }
};

/**
 * Fetches portfolio items from the database
 */
export const getPortfolioItems = async () => {
  const connection = await getConnection();
  if (!connection) return { error: 'Database connection failed', data: [] };
  
  try {
    const [rows] = await connection.execute('SELECT * FROM portfolio');
    await connection.end();
    return { data: rows };
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    await connection.end();
    return { error: 'Failed to fetch portfolio items', data: [] };
  }
};
