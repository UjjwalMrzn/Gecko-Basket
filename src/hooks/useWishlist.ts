import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// 1. Define the shape of a product to help TypeScript
interface Product {
  _id: string;
  name: string;
  // Add any other product properties you need here
}

// 2. Correct the API URL to the full path
const API_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

const useWishlist = () => {
  const { token, user } = useAuth();
  // 3. Give the wishlist state a specific type
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && token) {
        setLoading(true);
        try {
          const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }
          });
          // Tell TypeScript to expect an array of Products
          setWishlist(response.data as Product[]);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        } finally {
          setLoading(false);
        }
      } else {
        setWishlist([]);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user, token]);

  // 4. Add types to all function parameters
  const addToWishlist = async (product: Product) => {
    if (!token) throw new Error("Please log in to add to wishlist.");
    
    setWishlist(prev => [...prev, product]);
    
    try {
      await axios.post(API_URL, { productId: product._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      setWishlist(prev => prev.filter(p => p._id !== product._id));
      throw new Error("Failed to add product to wishlist.");
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!token) throw new Error("Please log in to manage your wishlist.");
    
    setWishlist(prev => prev.filter(p => p._id !== productId));
    
    try {
      await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Failed to remove product from wishlist", error);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(product => product._id === productId);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist, loading };
};

export default useWishlist;