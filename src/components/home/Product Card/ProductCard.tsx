// src/components/home/Product Card/ProductCard.tsx
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

  // Professional Check: Ensure originalPrice is a number and greater than price
  const isDiscount =
    typeof product.originalPrice === "number" &&
    product.originalPrice > product.price;

  // Calculate discount only if it's a valid discount scenario
  const discountPercent =
    isDiscount && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow border border-gray-200 hover:shadow-md transition-all flex flex-col overflow-hidden font-inter">
      <div className="relative bg-gray-50 aspect-[4/3] overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition z-10"
          title="Add to Wishlist"
        >
          <Heart size={18} className="text-gray-700" />
        </button>
        {product.tag && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-[#59b143] to-[#b1d447] text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow-sm uppercase tracking-wide">
            {product.tag}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4 flex-grow">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="text-md font-semibold text-[#272343] truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        <StarRating rating={product.rating || 0} reviews={product.reviews || 0} />
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-lg font-bold text-[#272343]">
              Rs. {product.price}
            </span>
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
        <button
          onClick={() => addToCart(product)}
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