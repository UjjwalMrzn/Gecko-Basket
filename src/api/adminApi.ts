import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export const fetchAllUsers = (token: string) => {
  return axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};