// src/api/productsApi.ts
import axios from "axios";
import { Product } from "../types/products";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

// This now returns the full AxiosResponse promise, consistent with other API calls
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

export const updateProduct = async (id: string, data: FormData, token: string) => {
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