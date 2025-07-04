import { useState } from "react";

type DropDownProps = {
  items: string[];
};

const DropDown = ({ items }: DropDownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="text-sm font-medium text-gray-700 capitalize hover:text-[#59b143]">
        All Categories
      </button>
      <ul
        className={`absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 text-sm z-20 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {items.map((item) => (
          <li
            key={item}
            className="px-4 py-2 hover:bg-[#59b143] hover:text-white cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
