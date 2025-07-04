import { useCartContext } from "../context/CartContext";

const useCart = () => {
  const context = useCartContext();
  return context;
};

export default useCart;
