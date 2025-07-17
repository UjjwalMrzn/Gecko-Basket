// The single source of truth for the Product data structure.
export type Product = {
  id: string; // Mapped from MongoDB's _id
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // For gallery images
  brand: string;
  category: string;
  rating: number;
  reviews: number;
  countInStock: number; // ✅ FIX: Added the missing stock property
  tag?: string;
};