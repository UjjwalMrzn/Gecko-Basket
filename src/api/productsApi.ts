import axios from "axios";
import { Product } from "../types/products";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export const fetchAllProducts = () => {
  return axios.get<Product[]>(API_URL);
};

export const fetchProductById = async (id: string) => {
  const res = await axios.get<Product>(`${API_URL}/${id}`);
  return res.data;
};

export const createProduct = async (data: FormData, token: string) => {
  const res = await axios.post<Product>(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ FIX: This function now correctly accepts either FormData or a plain object for the data payload.
export const updateProduct = async (id: string, data: FormData | Partial<Product>, token: string) => {
  const res = await axios.put<Product>(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProduct = async (id: string, token: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
