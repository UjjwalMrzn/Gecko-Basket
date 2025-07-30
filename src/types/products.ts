
export interface Product {
  _id: string; // The database ID from MongoDB
  id: string; // Keep this if you use it for other frontend logic
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number; 
  image: string;
  rating: number;
  numReviews: number;
  tag?: string;
  brand: string;
  countInStock: number;
}