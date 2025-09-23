import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Product } from '../types/products';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToast();
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const localData = localStorage.getItem('gecko-wishlist');
      if (!localData) return [];

      const parsedData = JSON.parse(localData);
      if (Array.isArray(parsedData)) {
        // Ensure that the loaded items are valid products
        return parsedData.filter(item => item && item._id);
      }
      return [];
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gecko-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlist.some(p => p._id === productId);
  }, [wishlist]);

  const removeFromWishlist = useCallback((productId: string) => {
    const productName = wishlist.find(p => p._id === productId)?.name || 'Item';
    setWishlist(prev => prev.filter(p => p._id !== productId));
    addToast(`${productName} removed from wishlist`, 'info');
  }, [addToast, wishlist]);

  const addToWishlist = useCallback((product: Product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      setWishlist(prev => [...prev, product]);
      addToast(`${product.name} added to wishlist`, 'success');
    }
  }, [addToast, isInWishlist, removeFromWishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
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