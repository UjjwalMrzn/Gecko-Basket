// src/types/products.ts

// ✅ Defines the shape of a single review
export interface Review {
  _id: string;
  name: string; // User's name
  rating: number;
  comment: string;
  user: string; // User's ID
}

// ✅ Adds the reviews array to the Product type
export interface Product {
  _id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  reviews: Review[]; // This line is new
  createdAt: string;
  updatedAt: string;
}