// src/api/addressApi.ts
import axios from 'axios';
import { Address } from '../types/address';

type AddressPayload = Omit<Address, '_id'>;

const API_URL = `${import.meta.env.VITE_API_URL}/users/addresses`;

// Gets all of a user's saved addresses
export const getAddresses = (token: string) => {
  // We expect the backend to return an array of Address objects
  return axios.get<Address[]>(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Adds a new address for a user
export const addAddress = (addressData: AddressPayload, token: string) => {
  return axios.post<Address>(API_URL, addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Updates an existing address
export const updateAddress = (id: string, addressData: Partial<AddressPayload>, token:string) => {
  return axios.put<Address>(`${API_URL}/${id}`, addressData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Deletes an address
export const deleteAddress = (id: string, token: string) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};