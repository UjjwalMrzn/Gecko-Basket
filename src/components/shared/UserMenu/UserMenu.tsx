import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useAuthModal } from "../../../context/AuthModalContext";
import Button from "../../ui/Button";

interface UserMenuProps {
  onLogout: () => void;
}

const UserMenu = ({ onLogout }: UserMenuProps) => {
  const { isLoggedIn } = useAuth();
  const { openModal } = useAuthModal();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (!isLoggedIn) {
    return (
      <Button onClick={() => openModal("login")} size="sm">
        Login
      </Button>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-1 text-[#272343] hover:text-[#59b143] transition"
      >
        <User size={22} />
        <ChevronDown size={18} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[160px] bg-white border rounded-xl shadow-lg z-20 py-2 font-inter text-sm">
          <ul>
            <li>
              <Link to="/account" className="block px-4 py-2 hover:bg-gray-100 transition">
                Account
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;