import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { syncAddToCart, syncRemoveFromCart } from '../api/cartApi';

// 1. Correct the API URL to the full path
const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

// 2. Define the shape of a Product
interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

// 3. Define the shape of a Cart Item
interface CartItem {
  product: Product;
  quantity: number;
}

const useCart = () => {
  const { token, user } = useAuth();
  // 4. Give the state a specific type
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        setLoading(true);
        try {
          const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
          });
          // Tell TypeScript to expect an array of CartItems
          setCartItems(response.data as CartItem[]);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCartItems([]);
        setLoading(false);
      }
    };
    fetchCart();
  }, [user, token]);

  // 5. Add types to all function parameters
  const addToCart = async (product: Product, quantity: number) => {
    if (!token) throw new Error("Please log in to add items to your cart.");
    
    try {
      const updatedCart = await syncAddToCart(product._id, quantity, token);
      setCartItems(updatedCart as CartItem[]);
    } catch (error) {
      console.error("Failed to add to cart", error);
      throw new Error("Could not add item to cart.");
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!token) throw new Error("Please log in to manage your cart.");

    try {
      const updatedCart = await syncRemoveFromCart(productId, token);
      setCartItems(updatedCart as CartItem[]);
    } catch (error) {
      console.error("Failed to remove from cart", error);
      throw new Error("Could not remove item from cart.");
    }
  };

  return { cartItems, addToCart, removeFromCart, loading };
};

export default useCart;