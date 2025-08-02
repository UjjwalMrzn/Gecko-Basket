import axios from "axios";
import { User } from "../types/user";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export const fetchAllUsers = (token: string) => {
  return axios.get<User[]>(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};