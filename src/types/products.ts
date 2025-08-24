// src/types/products.ts

export interface Product {
  _id: string;
  id: string; 
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number; 
  image: string;
  rating: number;
  numReviews: number;
  brand: string;
  countInStock: number;
  isFeatured?: boolean;
  tags?: string[]; // The official type is an array of strings
}