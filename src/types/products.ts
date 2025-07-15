// src/types/products.ts
export type Product = {
  _id: string; // From MongoDB
  id: string;  // We will map _id to id for frontend consistency
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  rating?: number;
  reviews?: number;
  tag?: string;
  inStock?: boolean;
};