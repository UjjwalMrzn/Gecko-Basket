import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

type CartIconProps = {
  count?: number;
};

const CartIcon = ({ count = 0 }: CartIconProps) => (
  <Link to="/cart" className="relative text-[#272343] hover:text-[#59b143]">
    <ShoppingCart size={24} />
    {count > 0 && (
      <span className="absolute -top-2 -right-2 w-5 h-5 text-xs font-semibold text-white bg-[#59b143] rounded-full flex items-center justify-center">
        {count}
      </span>
    )}
  </Link>
);

export default CartIcon;
