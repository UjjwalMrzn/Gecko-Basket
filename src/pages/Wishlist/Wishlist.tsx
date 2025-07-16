import useWishlist from '../../hooks/useWishlist';
import ProductCard from '../../components/home/Product Card/ProductCard';
import Loader from '../../components/ui/Loader';

const WishlistPage = () => {
  const { wishlist, loading } = useWishlist();

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;