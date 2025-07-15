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
import Button from "../ui/Button"; // Import your custom Button
import { useAuth } from "../../context/AuthContext"; // Import useAuth to get the logout function

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
    navigate("/"); // Redirect to the public homepage after logout
  };

  return (
    <aside className="fixed top-0 left-0 z-20 h-full w-64 flex flex-col bg-white border-r shadow-md font-inter">
      <div className="flex items-center justify-center h-20 px-6 border-b">
        <NavLink to="/admin/dashboard">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </NavLink>
      </div>

      <nav className="flex flex-col gap-1 p-4 flex-grow">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[#eaf5e5] text-[#272343] border-l-4 border-[#59b143] shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} className="text-[#59b143]" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t">
        {/* Use the custom Button component for a consistent look */}
        <Button
          onClick={handleLogout}
          className="w-full justify-start gap-3 bg-transparent text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-none font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;