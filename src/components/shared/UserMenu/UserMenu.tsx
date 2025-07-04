import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { useAuthModal } from "../../../context/AuthModalContext";

import Button from "../../ui/Button";

type Props = {
  onLogout: () => void;
};

const UserMenu = ({ onLogout }: Props) => {
  const { isLoggedIn } = useAuth();
  const { openModal } = useAuthModal();
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); 
  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

if (!isLoggedIn) {
  return (
    <Button onClick={() => openModal("login")} className="text-sm px-3 py-2 rounded-md shadow-none">
      Login
    </Button>
  );
}

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 text-[#272343] hover:text-[#59b143] transition"
      >
        <User size={22} />
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[160px] bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-2 font-inter text-sm">
          <ul className="py-1">
            <li>
              <Link
                to="/account"
                className="block px-4 py-2 hover:bg-[#59b143] hover:text-white transition rounded-md"
              >
                Account
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-[#59b143] hover:text-white transition rounded-md"
              >
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
