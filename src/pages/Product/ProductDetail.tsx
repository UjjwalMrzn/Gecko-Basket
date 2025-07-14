import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ErrorMessage from "../../components/ui/ErrorMessage";
import StarRating from "../../components/ui/StarRating";
import TabSection from "../../components/ui/TabSection";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";

import useCart from "../../hooks/usecart";
import useWishlist from "../../hooks/useWishlist";
import { useAuth } from "../../context/AuthContext";
import { fetchProductById } from "../../api/productsApi";
import { addProductToWishlist } from "../../api/wishlistApi";


import { ShoppingCart, Heart } from "lucide-react";

// Define a type for your product to help TypeScript
interface ProductType {
  _id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  numReviews: number;
  countInStock: number;
  reviews: any[]; // You can define a stricter type for reviews later
  tag?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  const { token } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Give the product state a specific type
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then((res: ProductType) => { // Expect the response to be of type ProductType
        setProduct(res);
        setError("");
      })
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);
  
  const isWishlisted = product ? isInWishlist(product._id) : false;

  const handleWishlistToggle = async () => {
    setFeedbackMessage("");
    if (!product) return;

    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
        setFeedbackMessage("Removed from wishlist.");
      } else {
        await addToWishlist(product);
        setFeedbackMessage("Added to wishlist!");
      }
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (err: any) { // Handle the error type correctly
      setFeedbackMessage(err.message || "An error occurred.");
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };
  const handleAddToCart = async () => {
    setFeedbackMessage("");
    if (!product) return;

    try {
      await addToCart(product, quantity);
      setFeedbackMessage("Added to cart successfully!");
      setTimeout(() => setFeedbackMessage(""), 3000);
    } catch (error) {
      setFeedbackMessage(error.message || "Failed to add to cart.");
      setTimeout(() => setFeedbackMessage(""), 3000);
    }
  };

  if (loading) {
    return (
      <section className="bg-[#fdfcf2] font-inter py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-6 shadow-md"><Skeleton className="w-full aspect-square rounded-lg" /></div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-24 mt-2" /><Skeleton className="h-10 w-1/2 mt-4" /><Skeleton className="h-4 w-full mt-6" />
            <Skeleton className="h-10 w-full rounded-lg" /><Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product could not be loaded." />;

  return (
    <section className="bg-[#fdfcf2] font-inter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex justify-center items-center">
          <img src={product.image} alt={product.name} className="w-full max-h-[480px] object-contain rounded-lg" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold text-[#272343]">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1 mb-3">{product.category}</p>
            <StarRating rating={product.rating || 0} reviews={product.numReviews || 0} />
            {/* Price */}
            <div className="mt-6 text-xl font-semibold text-[#272343]">
              Rs. {product.price}
              {product.originalPrice > 0 && (
                <span className="ml-3 text-base text-gray-400 line-through">Rs. {product.originalPrice}</span>
              )}
            </div>
            {/* Stock and Quantity */}
            <div className="mt-4">
              {product.countInStock > 0 ? (
                <p className="flex items-center text-sm text-green-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>In Stock
                </p>
              ) : (
                <p className="flex items-center text-sm text-red-500 font-medium">Out of Stock</p>
              )}
              <div className="flex items-center mt-4 border rounded-lg overflow-hidden w-fit">
                <button onClick={() => setQuantity((p) => Math.max(p - 1, 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100">–</button>
                <span className="px-4 py-2 text-sm font-medium text-[#272343]">{quantity}</span>
                <button onClick={() => setQuantity((p) => p + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100">+</button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex gap-4">
               <Button 
            onClick={handleAddToCart} 
            className="flex items-center justify-center gap-2 flex-grow"
          >
            <ShoppingCart size={18} /> Add to Cart
          </Button>
              <button
                onClick={handleWishlistToggle}
                className={`px-4 py-2.5 border rounded-xl transition flex items-center justify-center ${isWishlisted ? 'bg-red-100 border-red-500 text-red-500' : 'border-[#59b143] text-[#59b143] hover:bg-[#f3fef4]'}`}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
            {feedbackMessage && <p className="text-sm text-green-600 mt-2">{feedbackMessage}</p>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="border-t pt-6">
          <TabSection description={product.description} reviews={product.reviews || []} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;