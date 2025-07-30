import axios from 'axios';
import { User } from '../types/user';

// Define the shape of the successful login response from your backend
interface LoginResponse {
  token: string;
  user: User;
}

// Define the credentials required for the login function
interface LoginCredentials {
  email: string;
  password: string;
}

// Define the data required for the registration function
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Centralized API function for user login
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      // Re-throw the specific error message from the backend
      throw new Error(error.response.data.message);
    }
    // Generic fallback error
    throw new Error('An unexpected error occurred during login.');
  }
};

// Centralized API function for user registration
export const registerUser = async (userData: RegisterData): Promise<{ message: string }> => {
  try {
    const response = await axios.post<{ message: string }>(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('An unexpected error occurred during registration.');
  }
};