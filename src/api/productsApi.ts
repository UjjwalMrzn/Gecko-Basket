// src/api/productsApi.ts
import axios from 'axios';
import { Product } from '../types/products';

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

// Fetches all products
export const getProducts = () => {
  return axios.get<{ data: Product[] }>(API_URL);
};

// ✅ Fetches only featured products
export const getFeaturedProducts = () => {
  return axios.get<{ data: Product[] }>(`${API_URL}/featured`);
};

// Fetches a single product by its URL slug
export const getProductBySlug = (slug: string) => {
  return axios.get<{ data: Product }>(`${API_URL}/slug/${slug}`);
};

// -- Private Routes --

// Define the shape of the data for submitting a review
interface ReviewData {
  rating: number;
  comment: string;
}

/**
 * Adds a review to a specific product.
 */
export const addProductReview = (productId: string, reviewData: ReviewData, token: string) => {
  return axios.post(`${API_URL}/${productId}/reviews`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};