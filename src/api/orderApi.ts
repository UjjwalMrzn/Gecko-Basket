// src/api/orderApi.ts
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

export const fetchAllOrders = (token: string) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};