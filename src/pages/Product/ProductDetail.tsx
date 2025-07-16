// src/pages/Product/ProductDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";

import { fetchProductById } from "../../api/productsApi";
import { Product } from "../../types/products";

import useCart from "../../hooks/usecart";
import useWishlist from "../../hooks/useWishlist";

import Skeleton from "../../components/ui/Skeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";
import StarRating from "../../components/ui/StarRating";
import TabSection from "../../components/ui/TabSection";
import Button from "../../components/ui/Button";

const ProductDetailSkeleton = () => (
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <Skeleton className="w-full aspect-square rounded-lg" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <div className="pt-4 space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const getProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct({ ...data, id: data._id });
      } catch (err) {
        setError("Product not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="bg-[#fdfcf2] font-inter py-12 px-4 sm:px-6 lg:px-8">
        <ProductDetailSkeleton />
      </section>
    );
  }

  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product could not be found." />;

  const isDiscounted = product.originalPrice && product.originalPrice > product.price;

  return (
    <section className="bg-[#fdfcf2] font-inter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[480px] object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#272343]">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-2 mb-3">
              Brand: {product.brand}
            </p>
            <StarRating rating={product.rating || 0} reviews={product.reviews || 0} />
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="mt-4">
            {product.countInStock > 0 ? (
              <p className="flex items-center text-sm text-green-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                In Stock ({product.countInStock} available)
              </p>
            ) : (
              <p className="flex items-center text-sm text-red-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                Out of Stock
              </p>
            )}
          </div>

          <div className="mt-4">
            <span className="text-3xl font-bold text-[#272343]">Rs. {product.price}</span>
            {isDiscounted && (
              <span className="ml-3 text-lg text-gray-400 line-through">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <label className="text-sm font-medium text-[#272343]">Quantity:</label>
            <div className="flex items-center border rounded-lg overflow-hidden w-fit">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-[#272343]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              onClick={() => addToCart(product, quantity)}
              className="flex items-center justify-center gap-2 w-full sm:flex-1"
              disabled={product.countInStock === 0}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
            <button
              onClick={() => addToWishlist(product)}
              className="w-full sm:w-auto px-4 py-2.5 border border-[#59b143] text-[#59b143] hover:bg-[#f3fef4] rounded-xl transition flex items-center justify-center"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16">
        <div className="border-t pt-8">
          <TabSection
            description={product.description}
            reviews={product.reviews || 0}
            rating={product.rating || 0}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;