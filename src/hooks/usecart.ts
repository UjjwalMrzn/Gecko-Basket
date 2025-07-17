// src/hooks/usecart.ts
import { useCart as useCartContext } from '../context/CartContext';

// This hook simply re-exports the context hook for clean, conventional access.
const useCart = () => {
  return useCartContext();
};

export default useCart;