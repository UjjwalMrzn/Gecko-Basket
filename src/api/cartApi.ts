// src/api/cartApi.ts
import axios from 'axios';
import { CartItem } from '../context/CartContext';

const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

export const getCart = (token: string) => {
  return axios.get<{ cart: CartItem[] }>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addToCart = (productId: string, quantity: number, token: string) => {
  return axios.post(API_URL, { productId, quantity }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const removeFromCart = (productId: string, token: string) => {
  return axios.delete(`${API_URL}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const clearCart = (token: string) => {
    return axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const mergeCarts = (localCart: CartItem[], token: string) => {
    return axios.post(`${API_URL}/merge`, { localCart }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};