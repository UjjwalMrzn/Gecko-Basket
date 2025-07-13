import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  LogOut,
} from "lucide-react";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 shadow-md fixed top-0 left-0 z-20 px-6 py-8 font-inter hidden md:flex flex-col">
      <h1 className="text-2xl font-bold text-[#59b143] mb-10 tracking-tight">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[#59b143] text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto text-xs  px-4 pt-10">
  <button className="flex items-center gap-2 mt-10 px-4 py-2 rounded-lg hover:bg-white/20 transition text-sm">
        <LogOut size={18} />
        Logout
      </button>      </div>
    
    </aside>
  );
};

export default Sidebar;
