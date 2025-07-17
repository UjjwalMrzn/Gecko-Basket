// src/components/home/Product Card/ProductCard.tsx
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/usecart";
import useWishlist from "../../../hooks/useWishlist";
import Button from "../../ui/Button";
import StarRating from "../../ui/StarRating";
import { Product } from "../../../types/products";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const isDiscounted = product.originalPrice != null && product.originalPrice > product.price;

  // This function calculates the discount percentage. By putting the logic
  // in a function, we ensure the calculation only happens when originalPrice is valid.
  const getDiscountPercent = () => {
    if (!isDiscounted || product.originalPrice == null) {
      return 0;
    }
    // Inside this block, TypeScript knows originalPrice is a number.
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
  };

  const discountPercent = getDiscountPercent();

  return (
    <Link
      to={`/product/${product._id}`}
      className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col overflow-hidden font-inter"
    >
      <div className="relative bg-gray-50 aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition z-10"
          title="Add to Wishlist"
        >
          <Heart size={18} className={`transition-colors ${isInWishlist(product._id) ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
        </button>
        {product.tag && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-[#59b143] to-[#9cd67d] text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow-sm uppercase tracking-wide">
            {product.tag}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 flex-grow">
        <h3 className="text-md font-semibold text-[#272343] truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        <StarRating rating={product.rating} reviews={product.numReviews} />

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-lg font-bold text-[#272343]">
              Rs. {product.price}
            </span>
            {isDiscounted && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>
          {isDiscounted && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
              -{discountPercent}%
            </span>
          )}
        </div>

        <div className="mt-auto pt-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            fullWidth
            icon={<ShoppingCart size={16} />}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;