import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/usecart";
import useWishlist from "../../../hooks/useWishlist";
import StarRating from "../../ui/StarRating";
import { Product } from "../../../types/products";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const isDiscount =
    product.originalPrice !== undefined && product.originalPrice > product.price;

  const discountPercent = isDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-all flex flex-col overflow-hidden font-inter">
      {/* Image Container */}
      <div className="relative bg-gray-50 aspect-[4/3] overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition z-10"
          title="Add to Wishlist"
        >
          <Heart size={18} className="text-gray-700" />
        </button>

        {/* Product Tag */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-[#59b143] to-[#9cd67d] text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow-sm uppercase tracking-wide">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col gap-2 p-4 flex-grow">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="text-md font-semibold text-[#272343] truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        
        {/* ✅ FIX: Provide default values of 0 if rating or reviews are undefined */}
        <StarRating rating={product.rating ?? 0} reviews={product.reviews ?? 0} />

        {/* Price Section */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-lg font-bold text-[#272343]">Rs. {product.price}</span>
            {isDiscount && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>
          {isDiscount && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* ✅ FIX: Pass the quantity (defaulting to 1) to the addToCart function */}
        <button
          onClick={() => addToCart(product, 1)}
          className="mt-3 inline-flex items-center justify-center gap-2 bg-[#59b143] hover:bg-[#4ca035] text-white text-sm font-medium px-4 py-2 rounded-lg transition w-full"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;