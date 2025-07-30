import { Product } from "./products";

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: Product;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}