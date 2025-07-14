import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: number;
  title: string;
  image: string;
};

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: number) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (item: Product) => {
    setWishlist((prev) => [...prev, item]);
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlistContext must be used inside WishlistProvider");
  return context;
};
