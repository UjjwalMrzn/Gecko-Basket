import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import Logo from "../../../assets/logos/GeckoBasketLogo.png";
import CartIcon from "../CartIcon";
import WishlistIcon from "../WishlistIcon";
import UserMenu from "../UserMenu/UserMenu";
import SearchBar from "../SearchBar/SearchBar";
import CategoriesDropDown from "../CategoriesDropDown/CategoriesDropDown";
import useCart from "../../../hooks/usecart";
import useWishlist from "../../../hooks/useWishlist";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  // Use the user object to determine login state and get user data
  const { user, logout } = useAuth(); 
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  const categories = [
    "Food & Beverages",
    "Electronic Devices & Accessories",
    "Home & Kitchen",
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <header className="w-full font-inter">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#59b143] to-[#b1d447] h-9 flex items-center justify-center">
        <p className="text-white text-sm capitalize">50% off on your first purchase</p>
      </div>

      {/* Middle Bar */}
      <div className="bg-[#f0f2f3] h-[70px] flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="flex justify-start">
            <NavLink to="/">
              <img src={Logo} alt="Gecko Basket Logo" className="h-12 w-auto" />
            </NavLink>
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <SearchBar onSubmit={handleSearch} />
          </div>

          {/* Icons */}
          <div className="flex justify-end items-center gap-6">
            {/* Display user's first name if logged in */}
            {user && (
              <span className="text-sm font-medium text-[#272343] hidden sm:inline">
                
                Hello, {user.name?.split(' ')[0]}
              </span>
            )}
            <CartIcon count={cartItems.length} />
            <WishlistIcon count={wishlist.length} />
            <UserMenu onLogout={logout} />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-b border-gray-200 h-[65px] flex items-center">
        <div className="container mx-auto px-4 flex items-center gap-8">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 capitalize hover:text-[#59b143]">
            <CategoriesDropDown items={categories} />
          </div>

          <div className="flex items-center gap-6">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium capitalize transition ${
                    isActive ? "text-[#59b143]" : "text-gray-600 hover:text-[#59b143]"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
