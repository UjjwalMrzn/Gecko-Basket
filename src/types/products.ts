// src/types/Product.ts
export type Product = {
  id: string;
  name: string;
//   title: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  tag?: string;
};

