// src/context/WishlistContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { Product } from '../types/products';

// Define the shape of the data we expect from the API
interface FetchWishlistResponse {
  wishlist: Product[];
}

interface WishlistContextType {
  wishlist: Product[];
  loading: boolean;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const API_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && token) {
        setLoading(true);
        try {
          const { data } = await axios.get<FetchWishlistResponse>(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setWishlist(data.wishlist || []);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        } finally {
          setLoading(false);
        }
      } else {
        setWishlist([]);
      }
    };
    fetchWishlist();
  }, [user, token]);

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p._id === productId);
  };

  const addToWishlist = async (product: Product) => {
    if (!token) {
      addToast("Please log in to add items to your wishlist.", "error");
      return;
    }
    if (isInWishlist(product._id)) {
      addToast(`${product.name} is already in your wishlist.`, "info");
      return;
    }

    const originalWishlist = [...wishlist];
    setWishlist(prev => [...prev, product]); // Optimistic update

    try {
      await axios.post(API_URL, { productId: product._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      addToast(`${product.name} added to wishlist!`, "success");
    } catch (error) {
      addToast("Could not add item to wishlist.", "error");
      setWishlist(originalWishlist); // Revert on failure
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!token) return;
    
    const originalWishlist = [...wishlist];
    const productName = originalWishlist.find(p => p._id === productId)?.name;
    setWishlist(prev => prev.filter(p => p._id !== productId)); // Optimistic update

    try {
      await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (productName) addToast(`${productName} removed from wishlist.`, "info");
    } catch (error) {
      addToast("Could not remove item from wishlist.", "error");
      setWishlist(originalWishlist); // Revert on failure
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};