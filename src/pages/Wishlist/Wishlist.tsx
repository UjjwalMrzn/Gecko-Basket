// src/pages/Wishlist/Wishlist.tsx
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/home/Product Card/ProductCard';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const Wishlist = () => {
    const { wishlist, loading } = useWishlist();

    if (loading) {
        return <div className="text-center py-20">Loading Wishlist...</div>;
    }

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter min-h-screen">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4 bg-white rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
                        <p className="text-gray-600 mb-8">You haven't added any products to your wishlist yet.</p>
                        <Link to="/shop">
                            <Button testId="wishlist-discover-products-button">Discover Products</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;