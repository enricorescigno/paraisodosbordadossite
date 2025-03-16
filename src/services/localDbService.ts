
import { Product, Category, ProductImage, ColorOption } from '../types/database';

// Initial color options for the system
const initialColors: ColorOption[] = [
  { id: 'branco', name: 'Branco', hex_code: '#ffffff' },
  { id: 'preto', name: 'Preto', hex_code: '#000000' },
  { id: 'azul', name: 'Azul', hex_code: '#0066cc' },
  { id: 'azul-claro', name: 'Azul Claro', hex_code: '#66a3ff' },
  { id: 'verde', name: 'Verde', hex_code: '#4cd964' },
  { id: 'vermelho', name: 'Vermelho', hex_code: '#ff3b30' },
  { id: 'rosa', name: 'Rosa', hex_code: '#ff9eb6' },
  { id: 'amarelo', name: 'Amarelo', hex_code: '#ffcc00' },
  { id: 'laranja', name: 'Laranja', hex_code: '#ff9500' },
  { id: 'roxo', name: 'Roxo', hex_code: '#5856d6' },
  { id: 'cinza', name: 'Cinza', hex_code: '#8e8e93' },
  { id: 'bege', name: 'Bege', hex_code: '#e6d2b5' },
  { id: 'marrom', name: 'Marrom', hex_code: '#8b4513' },
  { id: 'creme', name: 'Creme', hex_code: '#fffdd0' },
  { id: 'dourado', name: 'Dourado', hex_code: '#d4af37' },
  { id: 'vinho', name: 'Vinho', hex_code: '#722f37' },
  { id: 'cobre', name: 'Cobre', hex_code: '#b87333' },
  { id: 'champagne', name: 'Champagne', hex_code: '#f7e7ce' },
];

// Initialize the database with some example data
const initializeDatabase = () => {
  // Only initialize if the database doesn't exist yet
  if (!localStorage.getItem('db_initialized')) {
    console.log('Initializing local database...');
    
    // Initial categories
    const categories: Category[] = [
      // Product categories (parent categories)
      { id: 1, name: 'Cama, Mesa e Banho', parent_id: null, type: 'product', slug: 'cama-mesa-banho' },
      { id: 2, name: 'Infantil', parent_id: null, type: 'product', slug: 'infantil' },
      { id: 3, name: 'Vestuário', parent_id: null, type: 'product', slug: 'vestuario' },
      
      // Product subcategories
      { id: 4, name: 'Cama', parent_id: 1, type: 'product', slug: 'cama' },
      { id: 5, name: 'Mesa e Cozinha', parent_id: 1, type: 'product', slug: 'mesa-cozinha' },
      { id: 6, name: 'Tapete e Cortinas', parent_id: 1, type: 'product', slug: 'tapete-cortinas' },
      { id: 7, name: 'Banho', parent_id: 1, type: 'product', slug: 'banho' },
      
      // Vestuário subcategories
      { id: 8, name: 'Camisa', parent_id: 3, type: 'product', slug: 'camisa' },
      { id: 9, name: 'Jaleco', parent_id: 3, type: 'product', slug: 'jaleco' },
      { id: 10, name: 'Pantufa', parent_id: 3, type: 'product', slug: 'pantufa' },
      
      // Portfolio parent category
      { id: 11, name: 'Bordados Personalizados', parent_id: null, type: 'portfolio', slug: 'bordados-personalizados' },
      
      // Portfolio subcategories
      { id: 12, name: 'Bordado em Boné', parent_id: 11, type: 'portfolio', slug: 'bordado-bone' },
      { id: 13, name: 'Bordado em Necessaire', parent_id: 11, type: 'portfolio', slug: 'bordado-necessaire' },
      { id: 14, name: 'Bordado em Bolsa', parent_id: 11, type: 'portfolio', slug: 'bordado-bolsa' },
      { id: 15, name: 'Bordado em Jaleco', parent_id: 11, type: 'portfolio', slug: 'bordado-jaleco' },
      { id: 16, name: 'Bordado Infantil', parent_id: 11, type: 'portfolio', slug: 'bordado-infantis' },
      { id: 17, name: 'Bordado em Toalha de Banho', parent_id: 11, type: 'portfolio', slug: 'bordado-toalha-banho' },
    ];
    
    // Add example products
    const products: Product[] = [
      // Example product: Jogo Americano
      {
        id: 204,
        name: "Jogo Americano Requinte Ondulado",
        description: "Eleve sua experiência à mesa com o jogo americano Tessi. Com uma composição inteligente de 75% polipropileno e 25% poliéster, este jogo americano é sinônimo de resistência e praticidade. Sua durabilidade o torna perfeito para o uso diário, e a limpeza é simples, graças à sua fácil lavagem. Além disso, seca rapidamente, estando pronto para ser usado sempre que você precisar. Com um diâmetro de 38cm, o formato redondo complementa sua mesa de maneira elegante. Adicione estilo e conveniência à sua refeição com o jogo americano Tessi.",
        shortDescription: "Jogo americano com bordado elegante, conjunto com 4 unidades.",
        category_id: 5, // Mesa e Cozinha
        type: 'product',
        highlight: true,
        price: "Sob consulta",
        colors: ["Branco", "Dourado", "Cobre", "Rosa", "Verde", "Vinho", "Marrom"],
        sizes: ["38cm (diâmetro)"],
        rating: 4.8,
        isNew: true,
        features: [
          "Composição: 75% polipropileno e 25% poliéster",
          "Formato redondo ondulado",
          "Secagem rápida",
          "Conjunto com 4 unidades"
        ],
        slug: "jogo-americano-requinte-ondulado"
      },
      // Add more example products as needed
    ];
    
    // Add example product images
    const productImages: ProductImage[] = [
      // Images for Jogo Americano in different colors
      { id: 1, product_id: 204, color_id: "branco", image_url: "/lovable-uploads/71c6178b-1439-499f-9354-f8bd6d43c514.png", is_primary: true },
      { id: 2, product_id: 204, color_id: "branco", image_url: "/lovable-uploads/c7b9448d-b4d0-4cd8-9bf3-74d9694e5f1c.png" },
      { id: 3, product_id: 204, color_id: "dourado", image_url: "/lovable-uploads/55ee7159-6ba2-4ea8-ba47-fe26c718040d.png", is_primary: true },
      { id: 4, product_id: 204, color_id: "dourado", image_url: "/lovable-uploads/dd9ced21-2cf3-4c5b-af78-8859edfebb2d.png" },
      { id: 5, product_id: 204, color_id: "cobre", image_url: "/lovable-uploads/e8fbdabd-3ce9-4d51-bbcf-0ecf9bed4a44.png", is_primary: true },
      { id: 6, product_id: 204, color_id: "cobre", image_url: "/lovable-uploads/9abff6f1-4ffa-4049-9055-1a34b0c4ccb9.png" },
      { id: 7, product_id: 204, color_id: "rosa", image_url: "/lovable-uploads/901b9c40-ca3f-48a8-9135-38facf09b3da.png", is_primary: true },
      { id: 8, product_id: 204, color_id: "rosa", image_url: "/lovable-uploads/8277533f-4870-4627-896d-ba16fc386d29.png" },
      { id: 9, product_id: 204, color_id: "verde", image_url: "/lovable-uploads/f28c69c5-853f-469b-afba-91b8202120d0.png", is_primary: true },
      { id: 10, product_id: 204, color_id: "verde", image_url: "/lovable-uploads/ad0cfed6-c98f-401b-9c50-a554468342e6.png" },
      { id: 11, product_id: 204, color_id: "vinho", image_url: "/lovable-uploads/1bb354e7-598f-421d-9f97-f716da838757.png", is_primary: true },
      { id: 12, product_id: 204, color_id: "vinho", image_url: "/lovable-uploads/d797a77e-cf02-4711-9ecc-d409cc56157a.png" },
      { id: 13, product_id: 204, color_id: "marrom", image_url: "/lovable-uploads/b8507f62-379e-42ba-b9c4-e08ff04db821.png", is_primary: true },
      { id: 14, product_id: 204, color_id: "marrom", image_url: "/lovable-uploads/1f1315c2-0f15-4525-9fdb-6c6574d95634.png" },
    ];
    
    // Store data in local storage
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('productImages', JSON.stringify(productImages));
    localStorage.setItem('colors', JSON.stringify(initialColors));
    localStorage.setItem('db_initialized', 'true');
    
    console.log('Database initialized successfully!');
  }
};

// Call initialization on import
initializeDatabase();

// Generic CRUD operations
const localDbService = {
  // Categories
  getCategories: (): Category[] => {
    return JSON.parse(localStorage.getItem('categories') || '[]');
  },
  
  getCategoryById: (id: number | string): Category | null => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    return categories.find((cat: Category) => cat.id === id) || null;
  },
  
  getCategoriesByType: (type: 'product' | 'portfolio'): Category[] => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    return categories.filter((cat: Category) => cat.type === type);
  },
  
  getCategoriesByParent: (parentId: number | string | null): Category[] => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    return categories.filter((cat: Category) => cat.parent_id === parentId);
  },
  
  createCategory: (category: Omit<Category, 'id'>): Category => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const newId = categories.length > 0 ? Math.max(...categories.map((c: Category) => Number(c.id))) + 1 : 1;
    const newCategory = { ...category, id: newId };
    
    categories.push(newCategory);
    localStorage.setItem('categories', JSON.stringify(categories));
    
    return newCategory;
  },
  
  updateCategory: (id: number | string, updates: Partial<Category>): Category | null => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const index = categories.findIndex((cat: Category) => cat.id === id);
    
    if (index === -1) return null;
    
    categories[index] = { ...categories[index], ...updates };
    localStorage.setItem('categories', JSON.stringify(categories));
    
    return categories[index];
  },
  
  deleteCategory: (id: number | string): boolean => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const initialLength = categories.length;
    
    const filteredCategories = categories.filter((cat: Category) => cat.id !== id);
    localStorage.setItem('categories', JSON.stringify(filteredCategories));
    
    // Also update any categories with this as parent to have null parent
    const updatedCategories = filteredCategories.map((cat: Category) => {
      if (cat.parent_id === id) {
        return { ...cat, parent_id: null };
      }
      return cat;
    });
    
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    return filteredCategories.length < initialLength;
  },
  
  // Products
  getProducts: (): Product[] => {
    return JSON.parse(localStorage.getItem('products') || '[]');
  },
  
  getProductById: (id: number | string): Product | null => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return products.find((prod: Product) => prod.id === id || prod.slug === id) || null;
  },
  
  getProductsByType: (type: 'product' | 'portfolio'): Product[] => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return products.filter((prod: Product) => prod.type === type);
  },
  
  getProductsByCategory: (categoryId: number | string): Product[] => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return products.filter((prod: Product) => prod.category_id === categoryId);
  },
  
  getHighlightedProducts: (): Product[] => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    return products.filter((prod: Product) => prod.highlight === true);
  },
  
  createProduct: (product: Omit<Product, 'id'>): Product => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newId = products.length > 0 ? Math.max(...products.map((p: Product) => Number(p.id))) + 1 : 1;
    const newProduct = { ...product, id: newId };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    return newProduct;
  },
  
  updateProduct: (id: number | string, updates: Partial<Product>): Product | null => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const index = products.findIndex((prod: Product) => prod.id === id || prod.slug === id);
    
    if (index === -1) return null;
    
    products[index] = { ...products[index], ...updates };
    localStorage.setItem('products', JSON.stringify(products));
    
    return products[index];
  },
  
  deleteProduct: (id: number | string): boolean => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const initialLength = products.length;
    
    const filteredProducts = products.filter((prod: Product) => prod.id !== id && prod.slug !== id);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    
    // Also delete related images
    const productImages = JSON.parse(localStorage.getItem('productImages') || '[]');
    const filteredImages = productImages.filter((img: ProductImage) => img.product_id !== id);
    localStorage.setItem('productImages', JSON.stringify(filteredImages));
    
    return filteredProducts.length < initialLength;
  },
  
  // Product Images
  getProductImages: (): ProductImage[] => {
    return JSON.parse(localStorage.getItem('productImages') || '[]');
  },
  
  getImagesByProductId: (productId: number | string): ProductImage[] => {
    const images = JSON.parse(localStorage.getItem('productImages') || '[]');
    return images.filter((img: ProductImage) => img.product_id === productId);
  },
  
  getImagesByProductAndColor: (productId: number | string, colorId: string | null): ProductImage[] => {
    const images = JSON.parse(localStorage.getItem('productImages') || '[]');
    return images.filter((img: ProductImage) => 
      img.product_id === productId && img.color_id === colorId
    );
  },
  
  createProductImage: (image: Omit<ProductImage, 'id'>): ProductImage => {
    const images = JSON.parse(localStorage.getItem('productImages') || '[]');
    const newId = images.length > 0 ? Math.max(...images.map((i: ProductImage) => Number(i.id))) + 1 : 1;
    const newImage = { ...image, id: newId };
    
    images.push(newImage);
    localStorage.setItem('productImages', JSON.stringify(images));
    
    return newImage;
  },
  
  updateProductImage: (id: number | string, updates: Partial<ProductImage>): ProductImage | null => {
    const images = JSON.parse(localStorage.getItem('productImages') || '[]');
    const index = images.findIndex((img: ProductImage) => img.id === id);
    
    if (index === -1) return null;
    
    images[index] = { ...images[index], ...updates };
    localStorage.setItem('productImages', JSON.stringify(images));
    
    return images[index];
  },
  
  deleteProductImage: (id: number | string): boolean => {
    const images = JSON.parse(localStorage.getItem('productImages') || '[]');
    const initialLength = images.length;
    
    const filteredImages = images.filter((img: ProductImage) => img.id !== id);
    localStorage.setItem('productImages', JSON.stringify(filteredImages));
    
    return filteredImages.length < initialLength;
  },
  
  // Color options
  getColors: (): ColorOption[] => {
    return JSON.parse(localStorage.getItem('colors') || '[]');
  },
  
  getColorById: (id: string): ColorOption | null => {
    const colors = JSON.parse(localStorage.getItem('colors') || '[]');
    return colors.find((color: ColorOption) => color.id === id) || null;
  },
  
  // Reset database
  resetDatabase: () => {
    localStorage.removeItem('categories');
    localStorage.removeItem('products');
    localStorage.removeItem('productImages');
    localStorage.removeItem('colors');
    localStorage.removeItem('db_initialized');
    initializeDatabase();
  }
};

export default localDbService;
