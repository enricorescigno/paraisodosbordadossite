
import { 
  getCategories, 
  getProductsByType, 
  getProductsByCategorySlug,
  getProductById, 
  getProductBySlug,
  getHighlightedProducts,
  getProductImages,
  getProductColorVariants,
  saveProduct,
  deleteProduct,
  saveCategory,
  deleteCategory,
  saveProductImage,
  deleteProductImage,
  getCategoryBySlug
} from './localDatabaseService';

import { Product, Category, ProductImage, ColorVariantImages } from '../types/database';

// For simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Categories API
export const fetchCategories = async (): Promise<Category[]> => {
  await delay(300); // Simulate network delay
  return getCategories();
};

export const fetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
  await delay(200);
  return getCategoryBySlug(slug);
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  await delay(300);
  return saveCategory(category);
};

export const updateCategory = async (category: Category): Promise<Category> => {
  await delay(300);
  return saveCategory(category);
};

export const removeCategory = async (id: number): Promise<boolean> => {
  await delay(300);
  return deleteCategory(id);
};

// Products API
export const fetchProducts = async (type: 'product' | 'portfolio'): Promise<Product[]> => {
  await delay(300);
  return getProductsByType(type);
};

export const fetchProductsByCategorySlug = async (slug: string): Promise<Product[]> => {
  await delay(300);
  return getProductsByCategorySlug(slug);
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  await delay(200);
  return getProductById(id);
};

export const fetchProductBySlug = async (slug: string): Promise<Product | null> => {
  await delay(200);
  return getProductBySlug(slug);
};

export const fetchHighlightedProducts = async (type?: 'product' | 'portfolio'): Promise<Product[]> => {
  await delay(300);
  return getHighlightedProducts(type);
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  await delay(400);
  return saveProduct(product);
};

export const updateProduct = async (product: Product): Promise<Product> => {
  await delay(400);
  return saveProduct(product);
};

export const removeProduct = async (id: number): Promise<boolean> => {
  await delay(300);
  return deleteProduct(id);
};

// Images API
export const fetchProductImages = async (productId: number): Promise<ProductImage[]> => {
  await delay(200);
  return getProductImages(productId);
};

export const fetchProductColorVariants = async (productId: number): Promise<ColorVariantImages> => {
  await delay(200);
  return getProductColorVariants(productId);
};

export const createProductImage = async (image: Omit<ProductImage, 'id'>): Promise<ProductImage> => {
  await delay(300);
  return saveProductImage(image);
};

export const updateProductImage = async (image: ProductImage): Promise<ProductImage> => {
  await delay(300);
  return saveProductImage(image);
};

export const removeProductImage = async (id: number): Promise<boolean> => {
  await delay(300);
  return deleteProductImage(id);
};
