import { useState, useRef } from "react";
import { Menu } from "lucide-react";

type Props = {
  items: string[];
  onSelect?: (value: string) => void;
};

const CategoriesDropDown = ({ items, onSelect }: Props) => {
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
      {/* Trigger: icon + label */}
      <div
        className={`flex items-center gap-2 text-sm font-medium capitalize cursor-pointer transition-colors ${
          open ? "text-[#59b143]" : "text-gray-700 hover:text-[#59b143]"
        }`}
      >
        <Menu size={18} className="transition-colors" />
        <button
          type="button"
          className="focus:outline-none"
          aria-haspopup="true"
          aria-expanded={open}
        >
          All Categories
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <ul className="absolute left-0 top-full mt-1 w-56 bg-white border text-gray-700 border-gray-200 rounded-md shadow-lg py-1 text-sm z-20">
          {items.map((category) => (
            <li
              key={category}
              className="px-4 py-2 hover:bg-[#59b143] hover:text-white cursor-pointer"
              onClick={() => onSelect?.(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesDropDown;
