import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types/products'; // ✅ IMPORT the correct, centralized Product type

// Define the shape of a single item in the cart
export interface CartItem {
  product: Product;
  quantity: number;
}

// ✅ FIX: Define the expected shape of the API response from the backend
interface CartApiResponse {
  items: CartItem[];
  // You can add other properties from the API response here if any (e.g., _id, user)
}

// Centralize the API URL for consistency
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/cart`;

const useCart = () => {
  const { user, token, authIsLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !token) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // ✅ FIX: Tell axios the expected response type using generics
        const response = await axios.get<CartApiResponse>(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // TypeScript now knows response.data contains an 'items' array
        setCartItems(response.data.items || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setError("Could not load your cart. Please try again later.");
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (!authIsLoading) {
      fetchCart();
    }
  }, [user, token, authIsLoading]);

  // Add a product to the cart
  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }
    
    try {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.product.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { product, quantity }];
      });

      await axios.post(API_URL, { productId: product.id, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });

    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Could not update your cart. Please try again.");
    }
  };

  // Remove a product from the cart
  const removeFromCart = async (productId: string) => {
    if (!token) return;

    try {
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));

      await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      alert("Could not remove item from cart. Please try again.");
    }
  };

  return { cartItems, addToCart, removeFromCart, loading, error };
};

export default useCart;