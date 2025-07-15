// src/context/WishlistContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/products"; // Import the centralized type

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void; // Use string for MongoDB _id
  isInWishlist: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    // Prevent duplicates
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistContext must be used within a WishlistProvider");
  }
  return context;
};