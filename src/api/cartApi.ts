import axios from "axios";

// 1. Correct the API URL to the full path
const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

/**
 * Adds or updates an item in the user's cart on the backend.
 * @param {string} productId - The ID of the product.
 * @param {number} quantity - The desired quantity.
 * @param {string | null} token - The user's auth token.
 */
// 2. Add types to the function parameters
export const syncAddToCart = async (productId: string, quantity: number, token: string | null) => {
  if (!token) throw new Error("You must be logged in to modify your cart.");

  const response = await axios.post(API_URL,
    { productId, quantity },
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
  return response.data;
};

/**
 * Removes an item from the cart on the backend.
 * @param {string} productId - The ID of the product to remove.
 * @param {string | null} token - The user's auth token.
 */
// 3. Add types to the function parameters
export const syncRemoveFromCart = async (productId: string, token: string | null) => {
  if (!token) throw new Error("You must be logged in to modify your cart.");

  const response = await axios.delete(`${API_URL}/${productId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};