import axios from "axios";

// 1. Correct the API URL to include the full path
const API_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

/**
 * Adds a product to the user's wishlist on the backend.
 * @param {string} productId - The ID of the product to add.
 * @param {string | null} token - The user's authentication token.
 */
// 2. Add the types for the function parameters
export const addProductToWishlist = async (productId: string, token: string | null) => {
  if (!token) {
    throw new Error("You must be logged in to add items to your wishlist.");
  }

  const response = await axios.post(API_URL,
    { productId },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  return response.data;
};