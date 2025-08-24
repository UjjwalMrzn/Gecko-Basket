// src/api/orderApi.ts
import axios from "axios";
import { Order } from "../types/order";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

// --- Customer Facing ---
export const fetchMyOrders = (token: string) => {
  return axios.get<Order[]>(`${API_URL}/myorders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createOrder = (orderData: any, token: string) => {
  return axios.post<Order>(API_URL, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// --- ADMIN FUNCTIONS ---

export const adminGetAllOrders = (token: string) => {
  return axios.get<Order[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// This is now the ONLY function for updating an order's status.
export const adminUpdateOrderStatus = (orderId: string, status: string, token: string) => {
  return axios.put<Order>(`${API_URL}/${orderId}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};