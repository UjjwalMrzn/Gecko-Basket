// src/api/userApi.ts
import axios from 'axios';
import { User } from '../types/user';

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

// Define the shape of the data for updating the profile
interface ProfileUpdateData {
  name?: string;
  gender?: string;
  birthday?: string;
}

// Define the shape of the data for changing the password
interface PasswordChangeData {
  oldPassword: string;
  newPassword: string;
}

// Makes the API call to update the user's profile information
export const updateUserProfile = (data: ProfileUpdateData, token: string) => {
  return axios.put<User>(`${API_URL}/profile`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Makes the API call to change the user's password
export const changeUserPassword = (data: PasswordChangeData, token: string) => {
  return axios.put(`${API_URL}/change-password`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};