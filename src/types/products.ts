// src/types/products.ts

export interface Product {
  _id: string; // The database ID from MongoDB
  id: string; // Keep this if you use it for other frontend logic
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number; // Optional, for items not on sale
  image: string;
  rating: number;
  numReviews: number; // Corrected from 'reviews' to match backend
  tag?: string;
  brand: string;
  countInStock: number;
}