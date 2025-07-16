// src/components/admin/Sidebar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
} from "lucide-react";
import Logo from "../../assets/logos/GeckoBasketLogo.png";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="fixed top-0 left-0 z-20 h-full w-64 flex flex-col bg-white border-r shadow-sm font-inter">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 px-6 border-b">
        <NavLink to="/admin/dashboard">
          <img src={Logo} alt="Gecko Basket Admin" className="h-10 w-auto" />
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 p-4 flex-grow">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#eaf5e5] text-[#272343]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <Icon size={18} className="text-[#59b143]" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-4 border-t">
        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;