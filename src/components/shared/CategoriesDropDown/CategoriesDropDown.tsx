// src/components/shared/CategoriesDropDown/CategoriesDropDown.tsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, LayoutGrid } from "lucide-react";

type Props = {
  items: string[];
};

const CategoriesDropDown = ({ items }: Props) => {
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

  // Close dropdown on any route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  // Helper function to create a URL-friendly slug from a category name
  const createCategorySlug = (categoryName: string) => {
    return categoryName.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#59b143] transition-colors"
        data-testid="categories-dropdown-button"
      >
        <LayoutGrid size={16} />
        <span>All Categories</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div 
          className="absolute left-0 top-full mt-2 w-64 bg-white border rounded-xl shadow-lg z-20 py-2 font-inter text-sm"
          data-testid="categories-dropdown-menu"
        >
          <ul>
            <li>
              <Link
                to="/shop"
                className="block px-4 py-2.5 font-semibold text-gray-800 hover:bg-gray-100 hover:text-[#59b143] transition-colors"
                data-testid="category-link-all"
              >
                All Products
              </Link>
            </li>
            <hr className="my-1"/>
            {items.map((item) => (
              <li key={item}>
                <Link
                  to={`/shop?category=${createCategorySlug(item)}`}
                  className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 hover:text-[#59b143] transition-colors"
                  data-testid={`category-link-${createCategorySlug(item)}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropDown;