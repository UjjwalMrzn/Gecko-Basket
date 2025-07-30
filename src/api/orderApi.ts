import axios from "axios";
import { Order } from "../types/order";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

// This function fetches orders for the currently logged-in user (for the account page)
export const fetchMyOrders = (token: string) => {
  return axios.get<Order[]>(`${API_URL}/myorders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchAllOrders = (token: string) => {
  return axios.get<Order[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};