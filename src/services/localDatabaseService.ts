
import { Category, Product, ProductImage } from '../types/database';
import { allProducts } from '../utils/productUtils';
import { 
  camaProducts, 
  mesaCozinhaProducts, 
  banhoProducts, 
  infantilProducts, 
  vestuarioProducts 
} from '../utils/categoryProducts';

// Database keys
const PRODUCTS_KEY = 'paradise_products';
const CATEGORIES_KEY = 'paradise_categories';
const IMAGES_KEY = 'paradise_images';

// Initialize the database with default data
export const initializeDatabase = () => {
  console.info('Initializing local database...');
  
  // Check if database already exists
  if (localStorage.getItem(PRODUCTS_KEY)) {
    console.info('Database already initialized.');
    return;
  }

  // Create default categories
  const categories: Category[] = [
    { id: 1, name: 'Cama, Mesa e Banho', parent_id: null, type: 'product', slug: 'cama-mesa-banho' },
    { id: 2, name: 'Cama', parent_id: 1, type: 'product', slug: 'cama' },
    { id: 3, name: 'Mesa e Cozinha', parent_id: 1, type: 'product', slug: 'mesa-cozinha' },
    { id: 4, name: 'Banho', parent_id: 1, type: 'product', slug: 'banho' },
    { id: 5, name: 'Infantil', parent_id: null, type: 'product', slug: 'infantil' },
    { id: 6, name: 'Vestuário', parent_id: null, type: 'product', slug: 'vestuario' },
    { id: 7, name: 'Pantufas', parent_id: null, type: 'product', slug: 'pantufa' },
    { id: 8, name: 'Bordados', parent_id: null, type: 'portfolio', slug: 'bordados' },
    { id: 9, name: 'Bonés Bordados', parent_id: 8, type: 'portfolio', slug: 'bordado-bone' },
    { id: 10, name: 'Bordado em Necessaire', parent_id: 8, type: 'portfolio', slug: 'bordado-necessaire' },
    { id: 11, name: 'Bordado em Bolsa', parent_id: 8, type: 'portfolio', slug: 'bordado-bolsa' },
    { id: 12, name: 'Jalecos', parent_id: 8, type: 'portfolio', slug: 'bordado-jaleco' },
    { id: 13, name: 'Roupões Infantis', parent_id: 8, type: 'portfolio', slug: 'bordado-infantis' },
    { id: 14, name: 'Toalhas Infantis', parent_id: 8, type: 'portfolio', slug: 'bordado-toalha-banho' },
  ];

  // Map existing products to new structure
  const products: Product[] = allProducts.map(p => {
    // Find category ID based on product category name
    let categoryId = categories.find(c => 
      c.name.toLowerCase() === p.category.toLowerCase() || 
      p.category.toLowerCase().includes(c.name.toLowerCase()) ||
      c.name.toLowerCase().includes(p.category.toLowerCase())
    )?.id || 1;
    
    return {
      id: typeof p.id === 'string' ? parseInt(p.id) : p.id,
      name: p.name,
      type: p.type,
      category_id: categoryId,
      description: p.description || '',
      price: p.price || 'Sob consulta',
      colors: p.colors || [],
      sizes: p.sizes || [],
      rating: p.rating || 4.8,
      isNew: p.isNew || false,
      features: p.features || [],
      keywords: p.keywords || [],
      slug: p.slug || p.name.toLowerCase().replace(/\s+/g, '-'),
      highlight: false,
      imageUrl: p.imageUrl || ''
    };
  });

  // Create product images
  const images: ProductImage[] = [];
  let imageId = 1;

  products.forEach(product => {
    const origProduct = allProducts.find(p => 
      (typeof p.id === 'string' ? parseInt(p.id) : p.id) === product.id
    );

    if (!origProduct) return;

    // Handle simple image arrays
    if (origProduct.images && Array.isArray(origProduct.images)) {
      origProduct.images.forEach(img => {
        images.push({
          id: imageId++,
          product_id: product.id,
          image_url: img
        });
      });
    } 
    // Handle color variant images
    else if (origProduct.images && typeof origProduct.images === 'object') {
      Object.entries(origProduct.images).forEach(([color, colorImages]) => {
        if (Array.isArray(colorImages)) {
          colorImages.forEach(img => {
            images.push({
              id: imageId++,
              product_id: product.id,
              color_id: color,
              image_url: img
            });
          });
        }
      });
    } 
    // Handle single imageUrl
    else if (origProduct.imageUrl) {
      images.push({
        id: imageId++,
        product_id: product.id,
        image_url: origProduct.imageUrl
      });
    }
  });

  // Save to localStorage
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  localStorage.setItem(IMAGES_KEY, JSON.stringify(images));

  console.info('Database initialized successfully!');
};

// Get all categories
export const getCategories = (): Category[] => {
  const data = localStorage.getItem(CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
};

// Get category by ID
export const getCategoryById = (id: number): Category | null => {
  const categories = getCategories();
  return categories.find(category => category.id === id) || null;
};

// Get category by slug
export const getCategoryBySlug = (slug: string): Category | null => {
  const categories = getCategories();
  return categories.find(category => category.slug === slug) || null;
};

// Get subcategories
export const getSubcategories = (parentId: number): Category[] => {
  const categories = getCategories();
  return categories.filter(category => category.parent_id === parentId);
};

// Get all products
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

// Get products by type
export const getProductsByType = (type: 'product' | 'portfolio'): Product[] => {
  const products = getProducts();
  return products.filter(product => product.type === type);
};

// Get products by category ID
export const getProductsByCategoryId = (categoryId: number): Product[] => {
  const products = getProducts();
  return products.filter(product => product.category_id === categoryId);
};

// Get products by category slug
export const getProductsByCategorySlug = (slug: string): Product[] => {
  const category = getCategoryBySlug(slug);
  if (!category) return [];
  
  const products = getProducts();
  return products.filter(product => product.category_id === category.id);
};

// Get product by ID
export const getProductById = (id: number): Product | null => {
  const products = getProducts();
  return products.find(product => product.id === id) || null;
};

// Get product by slug
export const getProductBySlug = (slug: string): Product | null => {
  const products = getProducts();
  return products.find(product => product.slug === slug) || null;
};

// Get highlighted products
export const getHighlightedProducts = (type?: 'product' | 'portfolio'): Product[] => {
  const products = getProducts();
  return products.filter(product => 
    product.highlight && (type ? product.type === type : true)
  );
};

// Get product images
export const getProductImages = (productId: number): ProductImage[] => {
  const data = localStorage.getItem(IMAGES_KEY);
  const images = data ? JSON.parse(data) : [];
  return images.filter((image: ProductImage) => image.product_id === productId);
};

// Get product images by color
export const getProductImagesByColor = (productId: number, color: string): ProductImage[] => {
  const productImages = getProductImages(productId);
  return productImages.filter(image => image.color_id === color);
};

// Get product color variants
export const getProductColorVariants = (productId: number): ColorVariantImages => {
  const productImages = getProductImages(productId);
  const colorVariants: ColorVariantImages = {};

  productImages.forEach(image => {
    const color = image.color_id || 'default';
    if (!colorVariants[color]) {
      colorVariants[color] = [];
    }
    colorVariants[color].push(image.image_url);
  });

  return colorVariants;
};

// Create or update a product
export const saveProduct = (product: Omit<Product, 'id'> & { id?: number }): Product => {
  const products = getProducts();
  
  // Update existing product
  if (product.id) {
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...product } as Product;
    }
  } 
  // Create new product
  else {
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    const newProduct = { 
      ...product, 
      id: newId,
      slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-')
    } as Product;
    products.push(newProduct);
  }
  
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return getProductById(product.id || products[products.length - 1].id) as Product;
};

// Delete a product
export const deleteProduct = (id: number): boolean => {
  const products = getProducts();
  const newProducts = products.filter(product => product.id !== id);
  
  // If no products were removed, return false
  if (products.length === newProducts.length) {
    return false;
  }
  
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
  
  // Also delete related images
  const images = getAllImages();
  const newImages = images.filter(image => image.product_id !== id);
  localStorage.setItem(IMAGES_KEY, JSON.stringify(newImages));
  
  return true;
};

// Create or update a category
export const saveCategory = (category: Omit<Category, 'id'> & { id?: number }): Category => {
  const categories = getCategories();
  
  // Update existing category
  if (category.id) {
    const index = categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...category } as Category;
    }
  } 
  // Create new category
  else {
    const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
    const newCategory = { 
      ...category, 
      id: newId,
      slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-')
    } as Category;
    categories.push(newCategory);
  }
  
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  return getCategoryById(category.id || categories[categories.length - 1].id) as Category;
};

// Delete a category
export const deleteCategory = (id: number): boolean => {
  const categories = getCategories();
  
  // Check if there are subcategories
  const hasSubcategories = categories.some(category => category.parent_id === id);
  if (hasSubcategories) {
    return false;
  }
  
  // Check if there are associated products
  const products = getProducts();
  const hasProducts = products.some(product => product.category_id === id);
  if (hasProducts) {
    return false;
  }
  
  const newCategories = categories.filter(category => category.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(newCategories));
  
  return true;
};

// Get all images
export const getAllImages = (): ProductImage[] => {
  const data = localStorage.getItem(IMAGES_KEY);
  return data ? JSON.parse(data) : [];
};

// Save product image
export const saveProductImage = (image: Omit<ProductImage, 'id'> & { id?: number }): ProductImage => {
  const images = getAllImages();
  
  // Update existing image
  if (image.id) {
    const index = images.findIndex(img => img.id === image.id);
    if (index !== -1) {
      images[index] = { ...images[index], ...image } as ProductImage;
    }
  } 
  // Create new image
  else {
    const newId = Math.max(0, ...images.map(img => img.id)) + 1;
    const newImage = { ...image, id: newId } as ProductImage;
    images.push(newImage);
  }
  
  localStorage.setItem(IMAGES_KEY, JSON.stringify(images));
  return images.find(img => img.id === (image.id || images[images.length - 1].id)) as ProductImage;
};

// Delete product image
export const deleteProductImage = (id: number): boolean => {
  const images = getAllImages();
  const newImages = images.filter(image => image.id !== id);
  
  // If no images were removed, return false
  if (images.length === newImages.length) {
    return false;
  }
  
  localStorage.setItem(IMAGES_KEY, JSON.stringify(newImages));
  return true;
};
