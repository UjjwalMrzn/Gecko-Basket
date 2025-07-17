// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { Product } from '../types/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

// FIX: Define the shape of the data we expect from the API
interface FetchCartResponse {
  cart: CartItem[];
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        setLoading(true);
        try {
          // FIX: Tell axios what type of data to expect
          const { data } = await axios.get<FetchCartResponse>(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(data.cart || []);
        } catch (error) {
          console.error("Failed to fetch cart", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [user, token]);

  const addToCart = async (product: Product, quantity: number) => {
    if (!token) {
      addToast("Please log in to add items to your cart.", "error");
      return;
    }
    const originalCart = [...cartItems];
    setCartItems(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    try {
      await axios.post(API_URL, { productId: product._id, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      addToast(`${product.name} added to cart!`, "success");
    } catch (error) {
      addToast("Could not add item to cart.", "error");
      setCartItems(originalCart);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!token) return;
    const originalCart = [...cartItems];
    const productName = originalCart.find(item => item.product._id === productId)?.product.name;
    setCartItems(prevCart => prevCart.filter(item => item.product._id !== productId));
    try {
      await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (productName) addToast(`${productName} removed from cart.`, "info");
    } catch (error) {
      addToast("Could not remove item.", "error");
      setCartItems(originalCart);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }
    if (!token) return;
    const originalCart = [...cartItems];
    setCartItems(prevCart => prevCart.map(item => 
      item.product._id === productId ? { ...item, quantity } : item
    ));
    try {
      await axios.post(API_URL, { productId, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      addToast("Could not update quantity.", "error");
      setCartItems(originalCart);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, loading, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};