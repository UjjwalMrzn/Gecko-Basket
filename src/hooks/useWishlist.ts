import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types/products'; // ✅ IMPORT the correct, centralized Product type

// ✅ FIX: Define the expected shape of the API response from the backend
interface WishlistApiResponse {
  products: Product[];
  // Add other properties if your API sends them e.g., _id, user
}

// Centralize the API URL for consistency
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/wishlist`;

const useWishlist = () => {
  const { user, token, authIsLoading } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user || !token) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // ✅ FIX: Tell axios the expected response type using generics
        const response = await axios.get<WishlistApiResponse>(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // TypeScript now knows response.data contains a 'products' array
        setWishlist(response.data.products || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        setError("Could not load your wishlist. Please try again.");
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    if (!authIsLoading) {
      fetchWishlist();
    }
  }, [user, token, authIsLoading]);

  // Add a product to the wishlist
  const addToWishlist = async (product: Product) => {
    if (!token) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    // Prevent adding duplicates to the UI
    if (wishlist.some(p => p.id === product.id)) {
        return;
    }

    try {
      // Optimistic UI update
      setWishlist(prev => [...prev, product]);

      // Sync with backend
      await axios.post(API_URL, { productId: product.id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      // Revert the optimistic update on failure
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      alert("Could not add item to wishlist. Please try again.");
    }
  };

  // Remove a product from the wishlist
  const removeFromWishlist = async (productId: string) => {
    if (!token) return;

    try {
      // Optimistic UI update
      setWishlist(prev => prev.filter(p => p.id !== productId));
      
      // Sync with backend
      await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      alert("Could not remove item from wishlist. Please try again.");
      // Optionally, revert the optimistic update by re-fetching the wishlist
    }
  };
  
  const isInWishlist = (productId: string) => {
    return wishlist.some(product => product.id === productId);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist, loading, error };
};

export default useWishlist;