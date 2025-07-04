import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

type UserMenuProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const UserMenu = ({ isLoggedIn, onLogout }: UserMenuProps) => {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* User Icon Button */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className={`focus:outline-none transition-colors ${
          open ? "text-[#59b143]" : "text-[#272343] hover:text-[#59b143]"
        }`}
      >
        <User size={24} className="transition-colors" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-sm z-20">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/account"
                  className="block px-4 py-2 hover:bg-[#59b143] hover:text-white"
                >
                  Account
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-[#59b143] hover:text-white"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-[#59b143] hover:text-white"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
