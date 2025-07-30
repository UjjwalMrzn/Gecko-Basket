import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

/**
 * Adds or updates an item in the user's cart on the backend.
 * @param {string} productId - The ID of the product.
 * @param {number} quantity - The desired quantity.
 * @param {string | null} token - The user's auth token.
 */
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
export const syncRemoveFromCart = async (productId: string, token: string | null) => {
  if (!token) throw new Error("You must be logged in to modify your cart.");

  const response = await axios.delete(`${API_URL}/${productId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.data;
};