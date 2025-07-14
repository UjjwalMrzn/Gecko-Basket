import { useWishlistContext } from "../context/WishlistContext";

const useWishlist = () => {
  const context = useWishlistContext();
  return context;
};

export default useWishlist;
