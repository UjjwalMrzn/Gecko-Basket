import { useState } from "react";
import { Check, Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/GeckoBasketLogo.png";

const Navbar = () => {
  // State to track if dropdown is open
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="w-full font-inter">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#59b143] to-[#b1d447] h-9 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <p className="flex items-center gap-2 text-white text-sm capitalize justify-center">
            <Check size={16} /> 50% off on your first purchase
          </p>
        </div>
      </div>

      {/* Middle bar */}
      <div className="bg-[#f0f2f3] h-[70px] flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="flex justify-start">
            <Link to="/" aria-label="Homepage">
              <img src={Logo} alt="Gecko Basket Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <form action="#" className="relative w-full max-w-lg">
              <input
                type="search"
                placeholder="Search here..."
                aria-label="Search products"
                className="w-full h-11 rounded-2xl pl-4 pr-11 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#59b143] focus:border-transparent transition"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#272343] hover:text-[#59b143] transition"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* User actions */}
          <div className="flex justify-end items-center gap-6">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-[#272343] hover:text-[#59b143]"
              aria-label="View cart"
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-[#59b143] rounded-full">
                2
              </span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-[#272343] hover:text-[#59b143]"
              aria-label="View wishlist"
            >
              <Heart size={24} />
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-[#59b143] rounded-full">
                5
              </span>
            </Link>

            {/* User Menu */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
                aria-label="User account menu"
                className="text-[#272343] hover:text-[#59b143] focus:outline-none"
              >
                <User size={24} />
              </button>

              <ul
                className={`absolute right-0 top-full mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-sm z-20 transition-opacity duration-200 ${
                  isUserMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <li>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-black hover:bg-[#59b143] hover:text-white transition"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-black hover:bg-[#59b143] hover:text-white transition"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <nav className="bg-white border-b border-gray-200 h-[65px] flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Categories dropdown */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 capitalize hover:text-[#59b143]"
              >
                <Menu size={18} /> All Categories
              </button>

              <ul
                className={`absolute left-0 top-full mt-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-sm z-20 transition-opacity duration-200 ${
                  isCategoriesOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-black hover:bg-[#59b143] hover:text-white"
                  >
                    Food & Beverages
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-black hover:bg-[#59b143] hover:text-white"
                  >
                    Electronic Devices & Accessories
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigation links */}
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
                      isActive
                        ? "text-[#59b143]"
                        : "text-gray-600 hover:text-[#59b143]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
