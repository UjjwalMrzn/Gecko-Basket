import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const fetchAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data;
};

export const fetchProductById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/products/${id}`);
  return res.data;
};
