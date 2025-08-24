// src/api/userApi.ts

import axios from "axios";
import { User } from "../types/user";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

// FIX: Update this function to accept a data object instead of just a name string
export const updateUserProfile = async (data: { name: string; gender?: string; birthday?: string }, token: string) => {
  const response = await axios.put<User>(
    `${API_URL}/profile`, 
    data, // Send the entire data object
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// This function for changing password remains the same
export const changeUserPassword = async (passwords: object, token: string) => {
  const response = await axios.put(
    `${API_URL}/change-password`, 
    passwords, 
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};