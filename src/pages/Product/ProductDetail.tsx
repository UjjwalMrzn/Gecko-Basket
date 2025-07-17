// src/pages/Product/ProductDetail.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../types/products";
import Loader from "../../components/ui/Loader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import StarRating from "../../components/ui/StarRating";
import TabSection from "../../components/ui/TabSection";
import Button from "../../components/ui/Button";
import useCart from "../../hooks/usecart";
import useWishlist from "../../hooks/useWishlist";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Product not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-[60vh]"><Loader /></div>;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <section className="bg-gray-50 font-inter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Side: Product Image */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex justify-center items-center border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[480px] object-contain"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500 mt-2">Brand: <span className="font-medium text-gray-700">{product.brand}</span></p>
          
          <div className="mt-4">
            <StarRating rating={product.rating} reviews={product.numReviews} />
          </div>

          <div className="mt-6">
            <span className="text-3xl font-bold text-gray-900">Rs. {product.price}</span>
            {product.originalPrice && (
              <span className="ml-3 text-lg text-gray-400 line-through">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>

          <p className={`mt-4 text-sm font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          
          <hr className="my-6" />

          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold text-gray-800">Quantity:</p>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition">
                <Minus size={16} />
              </button>
              <span className="px-5 font-bold text-md text-gray-800">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button onClick={handleBuyNow} disabled={product.countInStock === 0}>
              Buy Now
            </Button>
            <Button onClick={() => addToCart(product, quantity)} disabled={product.countInStock === 0} variant="outline" icon={<ShoppingCart size={18} />}>
              Add to Cart
            </Button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => addToWishlist(product)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#59b143] font-medium transition py-2"
            >
              <Heart size={16} className={isInWishlist(product._id) ? 'text-red-500 fill-red-500' : ''} />
              {isInWishlist(product._id) ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 sm:mt-20">
        <div className="border-t pt-10">
          <TabSection
            description={product.description}
            reviews={product.numReviews}
            rating={product.rating}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;