// src/api/authApi.ts
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data && response.data.token) {
    return response.data;
  }
  throw new Error("Login failed. Please check your credentials.");
};

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};