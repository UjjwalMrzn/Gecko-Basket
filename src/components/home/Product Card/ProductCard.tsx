// src/components/home/Product Card/ProductCard.tsx
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import StarRating from "../../ui/StarRating";
import { Product } from "../../../types/products";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCart();
  // ✅ DEFINITIVE FIX: Use the correctly named `toggleWishlist` function
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCartLoading(true);
    await addToCart(product, 1);
    setIsCartLoading(false);
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlistLoading(true);
    // ✅ DEFINITIVE FIX: Call the correct function
    await toggleWishlist(product);
    setIsWishlistLoading(false);
  };
  
  const isDiscounted = product.originalPrice != null && product.originalPrice > product.price;
  const discountPercent = isDiscounted && product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex flex-col overflow-hidden font-inter" data-testid={`product-card-${product._id}`}>
      <Link to={`/product/${product._id}`} className="absolute inset-0 z-0" aria-label={product.name} />
      <div className="relative bg-gray-50 aspect-[4/3] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <Button
          onClick={handleToggleWishlist}
          disabled={isWishlistLoading}
          className="absolute top-3 right-3 !p-2 h-auto rounded-full z-10"
          variant="outline"
          testId={`product-card-wishlist-button-${product._id}`}
        >
          <Heart size={18} className={`transition-colors ${isInWishlist(product._id) ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
        </Button>
        {isDiscounted && <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow-sm">-{discountPercent}%</span>}
      </div>

      <div className="flex flex-col gap-2 p-4 flex-grow z-10 bg-white">
        <h3 className="text-md font-semibold text-[#272343] truncate" title={product.name}>{product.name}</h3>
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        <StarRating rating={product.rating} reviews={product.numReviews} />
        <div className="flex items-baseline justify-between mt-2">
            <p className="text-lg font-bold text-[#272343]">Rs. {product.price.toLocaleString()}</p>
            {isDiscounted && <p className="ml-2 text-sm text-gray-400 line-through">Rs. {product.originalPrice?.toLocaleString()}</p>}
        </div>
        <div className="mt-auto pt-3">
          <Button
            onClick={handleAddToCart}
            fullWidth
            icon={<ShoppingCart size={16} />}
            disabled={isCartLoading}
            testId={`product-card-add-to-cart-button-${product._id}`}
          >
            {isCartLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;