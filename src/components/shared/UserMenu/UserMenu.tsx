import { User } from "lucide-react";
import { Link } from "react-router-dom";

type UserMenuProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

const UserMenu = ({ isLoggedIn, onLogout }: UserMenuProps) => {
  return (
    <div className="relative group">
      <button className="text-[#272343] hover:text-[#59b143]">
        <User size={24} />
      </button>

      <ul className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-sm z-20 opacity-0
       group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 pointer-events-none">
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
    </div>
  );
};

export default UserMenu;
