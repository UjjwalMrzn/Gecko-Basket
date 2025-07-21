// src/pages/Wishlist/Wishlist.tsx
import { Link } from 'react-router-dom';
import ProductCard from '../../components/home/Product Card/ProductCard';
import Button from '../../components/ui/Button';
import { Product } from '../../types/products';
// ✅ FIX: Correctly import the hook from the context file
import { useWishlist } from '../../context/WishlistContext';

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto text-center py-20 px-4">
        <h1 className="text-3xl font-bold text-gray-800">Your Wishlist is Empty</h1>
        <p className="text-gray-600 mt-4">Items you add to your wishlist will appear here.</p>
        <Link to="/shop">
          <Button className="mt-6">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* ✅ FIX: Add explicit type for 'product' to prevent TS errors */}
          {wishlist.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;