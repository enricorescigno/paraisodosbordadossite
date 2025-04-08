
# MySQL Database Integration - Status: ACTIVATED

This directory contains service files for database integration with MySQL. The integration is now **ACTIVE** and ready to use.

## Current Status

- MySQL connection logic is implemented and activated
- API endpoints will attempt to use the database connection first
- If database connection fails or returns no data, the system will fall back to mock data

## Configuration

The database connection is configured with the following credentials:

```
host: 'ENDEREÇO_DO_SERVIDOR',
user: 'USUÁRIO',
password: 'SENHA',
database: 'NOME_DO_BANCO_DE_DADOS'
```

For a production environment, these should be replaced with actual database credentials using environment variables.

## Security Notes

- Never commit database credentials to version control
- Use environment variables for all sensitive information
- Consider using a connection pool for production environments
- Implement proper error handling and connection management

## Activated Functions

- `getConnection()`: Establishes a MySQL connection and returns the connection object
- `getConnectionPool()`: Creates a MySQL connection pool for handling multiple concurrent requests
- `getProducts()`: Fetches the list of products from the database
- `getPortfolioItems()`: Fetches portfolio items from the database

## API Integration

The following API handlers now use the MySQL database:
- `fetchProducts()` in `products.ts`: Retrieves products from the database with fallback to mock data
- `fetchProductById()` in `products.ts`: Retrieves a specific product with fallback to mock data
- `fetchPortfolioItems()` in `portfolio.ts`: Retrieves portfolio items from the database
- `fetchPortfolioItemById()` in `portfolio.ts`: Retrieves a specific portfolio item from the database

---

**Note:** To use the actual database, replace the placeholder credentials with real ones.
