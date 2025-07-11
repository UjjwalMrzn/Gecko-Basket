// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api"; // Adjust if hosted elsewhere

// export const loginUser = async (email: string, password: string) => {
//   const response = await axios.post(`${API_BASE_URL}/users/login`, {
//     email,
//     password,
//   });
//   return response.data; // contains token + user info
// };

// export const registerUser = async (formData: {
//   name: string;
//   email: string;
//   password: string;
// }) => {
//   const response = await axios.post(`${API_BASE_URL}/users/register`, formData);
//   return response.data;
// };

// export const getProfile = async (token: string) => {
//   const response = await axios.get(`${API_BASE_URL}/users/profile`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };
