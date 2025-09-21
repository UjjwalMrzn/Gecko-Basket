// src/context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { Product } from '../types/products';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import * as cartApi from '../api/cartApi';

export interface CartItem {
  product: Product;
  quantity: number;
}
interface CartApiResponse { cart: CartItem[] }

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { addToast } = useToast();
  const { isLoggedIn, token, authIsLoading } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authIsLoading) return;

    const syncCart = async () => {
      setLoading(true);
      const localCartData = localStorage.getItem('gecko-cart');
      const localCart = localCartData ? JSON.parse(localCartData) : [];

      if (isLoggedIn && token) {
        try {
          const res = localCart.length > 0
            ? await cartApi.mergeCarts(localCart, token)
            : await cartApi.getCart(token);
          setCartItems((res.data as CartApiResponse).cart || []);
          localStorage.removeItem('gecko-cart');
        } catch (error) { addToast("Could not sync your cart.", "error"); }
      } else {
        setCartItems(localCart);
      }
      setLoading(false);
    };
    syncCart();
  }, [isLoggedIn, token, authIsLoading, addToast]);

  const addToCart = useCallback(async (product: Product, quantity: number) => {
    if (isLoggedIn && token) {
        try {
            const res = await cartApi.addToCart(product._id, quantity, token);
            setCartItems((res.data as CartApiResponse).cart || []);
            addToast(`${product.name} added to cart`, 'success');
        } catch { 
            addToast("Failed to add item.", "error");
            throw new Error("Failed to add to cart");
        }
    } else {
        setCartItems(prev => {
            const newCart = [...prev];
            const existing = newCart.find(i => i.product._id === product._id);
            if (existing) { existing.quantity += quantity; }
            else { newCart.push({ product, quantity }); }
            localStorage.setItem('gecko-cart', JSON.stringify(newCart));
            return newCart;
        });
        addToast(`${product.name} added to cart`, 'success');
    }
  }, [isLoggedIn, token, addToast]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (isLoggedIn && token) {
        try {
            const res = await cartApi.removeFromCart(productId, token);
            setCartItems((res.data as CartApiResponse).cart || []);
            addToast('Item removed from cart', 'info');
        } catch { addToast("Failed to remove item.", "error"); }
    } else {
        setCartItems(prev => {
            const newCart = prev.filter(i => i.product._id !== productId);
            localStorage.setItem('gecko-cart', JSON.stringify(newCart));
            return newCart;
        });
        addToast('Item removed from cart', 'info');
    }
  }, [isLoggedIn, token, addToast]);

  const updateQuantity = useCallback(async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
      return;
    }
    setCartItems(prev => {
      const newCart = prev.map(item =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      );
      if(!isLoggedIn) {
        localStorage.setItem('gecko-cart', JSON.stringify(newCart));
      }
      return newCart;
    });
  }, [isLoggedIn, removeFromCart]);

  const clearCart = useCallback(async () => {
    if (isLoggedIn && token) {
        try {
            await cartApi.clearCart(token);
            setCartItems([]);
        } catch { addToast('Failed to clear cart.', 'error'); }
    } else {
        setCartItems([]);
        localStorage.removeItem('gecko-cart');
    }
  }, [isLoggedIn, token, addToast]);

  const contextValue = useMemo(() => ({
    cartItems, addToCart, removeFromCart, updateQuantity, clearCart, loading
  }), [cartItems, loading, addToCart, removeFromCart, updateQuantity, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};