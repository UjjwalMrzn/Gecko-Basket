// src/api/shippingApi.ts
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/shipping`;

// Gets all serviceable city locations for the address form dropdown
export const getServiceableLocations = () => {
  return axios.get<string[]>(`${API_URL}/locations`);
};

// Calculates shipping cost for the user's cart based on a location
export const calculateShipping = (location: string, token: string) => {
  return axios.post(
    `${API_URL}/calculate`,
    { location },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};