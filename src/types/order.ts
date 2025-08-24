// src/types/order.ts

import { Product } from "./products";

// Interface for the user object nested inside an order
interface PopulatedUser {
  _id: string;
  name: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: Product;
}

export interface Order {
  _id: string;
  user: PopulatedUser;
  orderItems: OrderItem[];
  totalPrice: number;
  isPaid: boolean;
  createdAt: string;
  // This is the new, flexible status field from the backend
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}