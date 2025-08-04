// src/api/orderApi.ts
import axios from "axios";
import { Order } from "../types/order";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

// Fetches all orders for the admin panel
export const fetchAllOrders = (token: string) => {
  return axios.get<Order[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Fetches orders for the currently logged-in user
export const fetchMyOrders = (token: string) => {
  return axios.get<Order[]>(`${API_URL}/myorders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ FIX: The new function to create an order
export const createOrder = (orderData: any, token: string) => {
  return axios.post<Order>(API_URL, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};