// src/pages/Product/ProductDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Loader from "../../components/ui/Loader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import StarRating from "../../components/ui/StarRating";
import TabSection from "../../components/ui/TabSection";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";

import useCart from "../../hooks/usecart";
import useWishlist from "../../hooks/useWishlist";
import { fetchProductById } from "../../api/productsApi";

import { ShoppingCart, Heart, ShoppingBag, Plus, Minus } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then((res) => {
        setProduct(res);
        setError("");
      })
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="bg-[#fdfcf2] font-inter py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <Skeleton className="w-full aspect-square rounded-lg" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-24 mt-2" />
            <Skeleton className="h-10 w-1/2 mt-4" />
            <Skeleton className="h-4 w-full mt-6" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <section className="bg-[#fdfcf2] font-inter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[480px] object-contain rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#272343]">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-5 mb-3">Brand: {product.brand}</p>
            {/* <p className="text-sm text-gray-500 mt-1 mb-3">{product.category}</p> */}

            <StarRating rating={product.rating || 0} reviews={product.reviews || 0} />

            {product.tag && (
              <span
                className={`inline-block mt-4 px-3 py-1 text-xs rounded-full font-semibold text-white ${
                  product.tag === "Sale" ? "bg-red-500" : "bg-[#59b143]"
                }`}
              >
                {product.tag}
              </span>
            )}

            {/* Price */}
            <div className="mt-6 text-xl font-semibold text-[#272343]">
              Rs. {product.price}
              {product.originalPrice && (
                <span className="ml-3 text-base text-gray-400 line-through">
                  Rs. {product.originalPrice}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mt-4">
              {product.inStock ? (
                <p className="flex items-center text-sm text-green-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  In Stock
                </p>
              ) : (
                <p className="flex items-center text-sm text-red-500 font-medium">
                  Out of Stock
                </p>
              )}
                 {/* Quantity Counter */}
            <div className="flex items-center mt-4 border rounded-lg overflow-hidden w-fit">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>
              <span className="px-4 py-2 text-sm font-medium text-[#272343]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>
            </div>

            {/* <p className="mt-6 text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p> */}
          </div>

          {/* Quantity + Actions */}
          <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center">
         

            <Button
              onClick={() => addToCart(product, quantity)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <ShoppingBag size={18} />
              Buy
            </Button>
            <Button
              onClick={() => addToCart(product, quantity)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </Button>

            {/* Wishlist */}
            <button
              onClick={() => addToWishlist(product)}
              className="w-full sm:w-auto px-4 py-2.5 border border-[#59b143] text-[#59b143] hover:bg-[#f3fef4] rounded-xl transition flex items-center justify-center"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="border-t pt-6">
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
