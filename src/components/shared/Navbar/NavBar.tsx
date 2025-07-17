// src/components/shared/Navbar/NavBar.tsx
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../../../assets/logos/GeckoBasketLogo.png";
import CartIcon from "../CartIcon";
import WishlistIcon from "../WishlistIcon";
import UserMenu from "../UserMenu/UserMenu";
import SearchBar from "../SearchBar/SearchBar";
import CategoriesDropDown from "../CategoriesDropDown/CategoriesDropDown";
import { useAuth } from "../../../context/AuthContext";
import useCart from "../../../hooks/usecart";
import useWishlist from "../../../hooks/useWishlist";
import { CartItem } from "../../../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = ["Food & Beverages", "Electronic Devices & Accessories", "Home & Kitchen"];
  const totalCartQuantity = cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="w-full font-inter shadow-sm">
      {/* Top Bar - Unchanged */}
      <div className="bg-gradient-to-r from-[#59b143] to-[#b1d447] h-9 flex items-center justify-center px-4">
        <p className="text-white text-xs sm:text-sm text-center">
          50% off on your first purchase
        </p>
      </div>

      {/* Middle Bar - Now with responsive hamburger menu */}
      <div className="bg-[#f0f2f3]">
        <div className="container mx-auto px-4 flex items-center justify-between h-[70px]">
          <Link to="/">
            <img src={Logo} alt="Gecko Basket Logo" className="h-10 sm:h-12 w-auto" />
          </Link>

          <div className="hidden lg:flex flex-1 justify-center px-8">
            <SearchBar onSubmit={(q) => console.log(q)} />
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-4">
              <WishlistIcon count={wishlist.length} />
              <CartIcon count={totalCartQuantity} />
            </div>
            <UserMenu onLogout={logout} />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-gray-700 hover:text-[#59b143]"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Kept original structure, now hidden on mobile */}
      <nav className="hidden lg:flex bg-white border-t border-gray-200 h-[65px] items-center">
        <div className="container mx-auto px-4 flex items-center gap-8">
          <CategoriesDropDown items={categories} />
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `text-sm font-medium transition ${isActive ? "text-[#59b143]" : "text-gray-600 hover:text-[#59b143]"}`}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay - Clean and simple */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-bold text-lg text-[#272343]">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <SearchBar onSubmit={(q) => console.log(q)} />
              <nav className="flex flex-col gap-1">
                {navLinks.map(({ to, label }) => (
                  <NavLink key={to} to={to} onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `block px-4 py-3 rounded-lg text-base font-medium ${isActive ? "bg-green-50 text-[#59b143]" : "text-gray-700 hover:bg-gray-100"}`}>
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;