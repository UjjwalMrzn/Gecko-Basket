// src/api/wishlistApi.ts
import axios from 'axios';
import { Product } from '../types/products';

const API_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

export const getWishlist = (token: string) => {
  return axios.get<{ wishlist: Product[] }>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toggleWishlist = (productId: string, token: string) => {
  return axios.post<{ wishlist: Product[] }>(API_URL, { productId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};