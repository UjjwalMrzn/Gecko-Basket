// src/api/addressApi.ts

import axios from 'axios';
import { ShippingAddress } from '../types/address';

const API_URL = `${import.meta.env.VITE_API_URL}/users/addresses`;

export const fetchUserAddresses = async (token: string): Promise<ShippingAddress[]> => {
  const response = await axios.get<ShippingAddress[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createNewAddress = async (addressData: Omit<ShippingAddress, '_id' | 'isDefault'>, token: string): Promise<ShippingAddress> => {
  const response = await axios.post<ShippingAddress>(API_URL, addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUserAddress = async (addressId: string, addressData: Partial<ShippingAddress>, token: string): Promise<ShippingAddress> => {
  const response = await axios.put<ShippingAddress>(`${API_URL}/${addressId}`, addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteUserAddress = async (addressId: string, token: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/${addressId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};