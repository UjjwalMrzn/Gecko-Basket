import { NavLink } from "react-router-dom";
import Logo from "../../assets/logos/GeckoBasketLogo.png";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

type Props = {
  isMobileOpen: boolean;
  onClose: () => void;
};

const SidebarContent = ({ onClose }: { onClose: () => void }) => {
  const { logout } = useAuth(); // Get the logout function from our context
  return (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="flex items-center justify-between h-20 px-6 border-b">
        <NavLink to="/admin/dashboard" onClick={onClose}>
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </NavLink>
        <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col gap-1 p-4 flex-grow">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-[#eaf5e5] text-[#272343]" : "text-gray-700 hover:bg-gray-100"}`}
          >
            <Icon size={18} className="text-[#59b143]" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const Sidebar = ({ isMobileOpen, onClose }: Props) => {
  return (
    <>
      <aside className="hidden lg:block fixed top-0 left-0 z-20 h-full w-64">
        <SidebarContent onClose={() => {}} />
      </aside>
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
          <aside className="relative z-50 h-full w-64">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;