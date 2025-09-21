// src/context/WishlistContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Product } from '../types/products';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import * as wishlistApi from '../api/wishlistApi';

interface WishlistApiResponse { wishlist: Product[] }

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToast();
  const { isLoggedIn, token, authIsLoading } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authIsLoading) return;

    const syncWishlist = async () => {
        setLoading(true);
        if (isLoggedIn && token) {
            try {
                const res = await wishlistApi.getWishlist(token);
                setWishlist((res.data as WishlistApiResponse).wishlist || []);
            } catch (error) {
                addToast("Could not sync your wishlist.", "error");
            }
        } else {
            const localData = localStorage.getItem('gecko-wishlist');
            setWishlist(localData ? JSON.parse(localData) : []);
        }
        setLoading(false);
    };
    syncWishlist();
  }, [isLoggedIn, token, authIsLoading, addToast]);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlist.some(p => p._id === productId);
  }, [wishlist]);

  const toggleWishlist = useCallback(async (product: Product) => {
    const isCurrentlyInWishlist = isInWishlist(product._id);
    
    if (isLoggedIn && token) {
        try {
            const res = await wishlistApi.toggleWishlist(product._id, token);
            setWishlist((res.data as WishlistApiResponse).wishlist || []);
            addToast( isCurrentlyInWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`, isCurrentlyInWishlist ? 'info' : 'success');
        } catch (error) {
            addToast("Failed to update wishlist.", "error");
            throw new Error("Failed to toggle wishlist");
        }
    } else {
        setWishlist(prev => {
            const newWishlist = isCurrentlyInWishlist
                ? prev.filter(p => p._id !== product._id)
                : [...prev, product];
            localStorage.setItem('gecko-wishlist', JSON.stringify(newWishlist));
            return newWishlist;
        });
        addToast(isCurrentlyInWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`, isCurrentlyInWishlist ? 'info' : 'success');
    }
  }, [isLoggedIn, token, addToast, isInWishlist]);

  const contextValue = useMemo(() => ({
    wishlist, toggleWishlist, isInWishlist, loading
  }), [wishlist, loading, toggleWishlist, isInWishlist]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};