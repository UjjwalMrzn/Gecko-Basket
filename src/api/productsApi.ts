// src/api/productApi.ts
import axios from "axios";
import { Product } from "../types/products"; // Make sure this exists

const BASE_URL = "http://localhost:5000/api/v1";

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${BASE_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
  return response.data;
};