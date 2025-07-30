import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

// This function will be used to update the user's name.
export const updateUserProfile = (name: string, token: string) => {
  return axios.put(`${API_URL}/profile`, { name }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// This function will be used to change the user's password.
export const changeUserPassword = (passwords: object, token: string) => {
  return axios.put(`${API_URL}/change-password`, passwords, {
    headers: { Authorization: `Bearer ${token}` },
  });
};