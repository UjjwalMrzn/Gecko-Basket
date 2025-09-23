import { useWishlist as useWishlistContext } from '../context/WishlistContext';

const useWishlist = () => {
  return useWishlistContext();
};

export default useWishlist;