// src/api/productsApi.ts
import axios from "axios";
import { Product } from "../types/products"; // Assuming this is your central type definition

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// Explicitly type the return value to tell axios what to expect
export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${BASE_URL}/products`);
  return res.data;
};

// Also type the single product response
export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get<Product>(`${BASE_URL}/products/${id}`);
  return res.data;
};

export const createProduct = async (data: FormData, token: string) => {
  const res = await axios.post(`${BASE_URL}/products`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProduct = async (id: string, data: FormData, token: string) => {
  const res = await axios.put(`${BASE_URL}/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteProduct = async (id: string, token: string) => {
  const res = await axios.delete(`${BASE_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};