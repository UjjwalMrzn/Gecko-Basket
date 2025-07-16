import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/admin`;

export const fetchDashboardStats = async (token: string) => {
  const response = await axios.get(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};