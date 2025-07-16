export type Product = {
  _id: string; // The unique ID from MongoDB
  id: string;  // We will map _id to id for frontend consistency
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;      // The primary image URL
  images?: string[];  // An optional array for multiple image URLs
  brand: string;
  category: string;
  countInStock: number;
  rating?: number;
  reviews?: number;
  tag?: string;
};