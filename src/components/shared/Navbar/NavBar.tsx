import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    "Food & Beverages",
    "Electronic Devices & Accessories",
    "Home & Kitchen",
  ];
  
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    setIsMobileMenuOpen(false);
  };
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const mainNavLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <header className="w-full font-inter shadow-sm sticky top-0 bg-white z-40">
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-[#59b143] to-[#b1d447] h-9 flex items-center justify-center text-center px-4">
          <p className="text-white text-xs sm:text-sm font-medium">
            50% off on your first purchase
          </p>
        </div>

        {/* Main Header Content */}
        <div className="container mx-auto px-4">
          <div className="h-[70px] flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden" aria-label="Open menu">
                <Menu size={24} />
              </button>
              <NavLink to="/" aria-label="Homepage">
                <img src={Logo} alt="Gecko Basket Logo" className="h-10 sm:h-12 w-auto" />
              </NavLink>
            </div>

            <div className="hidden lg:flex flex-1 justify-center px-8">
              <SearchBar onSubmit={handleSearch} />
            </div>

            {/* ✅ RIGHT SECTION - Corrected */}
            <div className="flex items-center justify-end gap-4 sm:gap-6">
              {/* ✅ USER GREETING - Added back for desktop */}
              {user && (
                <span className="hidden lg:block text-sm font-medium text-gray-700">
                  Hello, {user.name?.split(' ')[0]}
                </span>
              )}
              <div className="hidden sm:flex items-center gap-5">
                <WishlistIcon count={wishlist.length} />
                <CartIcon count={totalCartQuantity} />
              </div>
              <UserMenu onLogout={logout} />
            </div>
          </div>
        </div>

        {/* Bottom Bar (Desktop) */}
        <nav className="border-t border-gray-200 h-[55px] hidden lg:flex items-center">
            <div className="container mx-auto px-4 flex items-center gap-8">
                <CategoriesDropDown items={categories} />
                {mainNavLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-medium capitalize transition ${isActive ? "text-[#59b143]" : "text-gray-600 hover:text-[#59b143]"}`}>
                    {label}
                </NavLink>
                ))}
            </div>
        </nav>
      </header>

      {/* MOBILE FLY-OUT MENU & OVERLAY */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div 
          className={`relative h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b flex items-center justify-between">
            <span className="font-semibold text-lg">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="p-4 space-y-6">
            <SearchBar onSubmit={handleSearch} />
            <nav className="flex flex-col gap-4">
              {mainNavLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className="text-gray-700 hover:text-[#59b143] py-2">
                  {label}
                </NavLink>
              ))}
              <div className="sm:hidden flex justify-around py-4 border-t border-b">
                 <WishlistIcon count={wishlist.length} />
                 <CartIcon count={totalCartQuantity} />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;