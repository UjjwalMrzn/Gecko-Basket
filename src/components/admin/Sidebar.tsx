import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logos/GeckoBasketLogo.png";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
  X, // ✅ IMPORT the Close icon
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

// ✅ DEFINE the props for the component
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose(); // Close the sidebar on logout
    logout();
    navigate("/");
  };
  
  const handleLinkClick = () => {
    onClose(); // Close the sidebar when a link is clicked
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        onClick={onClose} 
        className={`fixed inset-0 bg-black/40 z-20 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 flex flex-col bg-white border-r shadow-lg font-inter transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between h-20 px-6 border-b">
          <NavLink to="/admin/dashboard" onClick={handleLinkClick}>
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
          </NavLink>
          <button onClick={onClose} className="lg:hidden" aria-label="Close sidebar">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4 flex-grow">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={handleLinkClick}
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

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t">
          <Button
            onClick={handleLogout}
            fullWidth
            className="bg-transparent text-gray-700 hover:bg-gray-100 flex items-center justify-start gap-3 shadow-none"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

// Re-add the links constant here
const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default Sidebar;