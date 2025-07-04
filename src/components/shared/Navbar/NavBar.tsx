import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import Logo from "../../../assets/logos/GeckoBasketLogo.png";

import CartIcon from "../CartIcon";
import WishlistIcon from "../WishlistIcon";
import UserMenu from "../UserMenu/UserMenu";
import SearchBar from "../SearchBar/SearchBar";
import DropDown from "../../home/DropDown/DropDown";

const Navbar = () => {
  const [userLoggedIn] = useState(true);
  const cartCount = 2;
  const wishlistCount = 5;
  const categories = [
    "Food & Beverages",
    "Electronic Devices & Accessories",
    "Home & Kitchen",
  ];

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <header className="w-full font-inter">
      {/* Top Offer Bar */}
      <div className="bg-gradient-to-r from-[#59b143] to-[#b1d447] h-9 flex items-center justify-center">
        <p className="text-white text-sm capitalize">50% off on your first purchase</p>
      </div>

      {/* Middle Bar: Logo - Search - Icons */}
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
            <CartIcon count={cartCount} />
            <WishlistIcon count={wishlistCount} />
            <UserMenu isLoggedIn={userLoggedIn} onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-b border-gray-200 h-[65px] flex items-center">
        <div className="container mx-auto px-4 flex items-center gap-8">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 capitalize hover:text-[#59b143]">
            <Menu size={18} />
            <DropDown items={categories} />
          </div>

          {/* Main Nav Links */}
          <div className="flex items-center gap-6">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/product", label: "Product" },
              { to: "/pages", label: "Pages" },
              { to: "/about", label: "About" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium capitalize transition ${
                    isActive ? "text-[#59b143]" : "text-gray-600 hover:text-[#59b143]"
                  }`
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
