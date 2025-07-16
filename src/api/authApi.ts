// src/api/authApi.ts
import axios from "axios";
import { User } from "../types/user"; // Create or import a User type

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

// Define the shape of the response from the login API
interface LoginResponse {
  user: User;
  token: string;
}

export const loginUser = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, credentials);
  if (response.data && response.data.token) {
    return response.data;
  }
  throw new Error("Login failed. Please check your credentials.");
};

export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};