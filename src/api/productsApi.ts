// src/api/productsApi.ts
import axios from "axios";
import { Product } from "../types/products";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export const fetchAllProducts = () => {
  return axios.get<Product[]>(API_URL);
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get<Product>(`${API_URL}/${id}`);
  return data;
};

export const fetchFeaturedProducts = () => {
  return axios.get<Product[]>(`${API_URL}/featured`);
};

export const createProduct = async (productData: FormData, token: string) => {
  const response = await axios.post(API_URL, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProduct = async (id: string, productData: FormData | Partial<Product>, token: string) => {
    const isFormData = productData instanceof FormData;
    const response = await axios.put(`${API_URL}/${id}`, productData, {
        headers: {
            "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteProduct = async (id: string, token: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};