import { ShoppingCart, Heart } from "lucide-react";
import StarRating from "../../ui/StarRating/StarRating";
import useCart from "../../../hooks/usecart";
import useWishlist from "../../../hooks/useWishlist";

type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  rating: number;
  reviews: number;
  tag?: string | null;
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="group relative w-full flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 font-inter">
      {/* Image */}
      <div className="relative h-60 overflow-hidden rounded-t-2xl bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge */}
        {product.tag && (
          <span className={`absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-semibold text-white ${product.tag === "Sale" ? "bg-red-500" : "bg-[#59b143]"}`}>
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => addToWishlist(product)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-[#272343]">{product.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        </div>

        <div className="mt-3 mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#272343]">Rs. {product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-auto flex items-center justify-center rounded-md bg-[#59b143] px-5 py-2 text-sm font-semibold text-white hover:bg-[#4ca035] transition-all duration-200"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
