import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

type Props = {
  onSubmit: (query: string) => void;
};

const SearchBar = ({ onSubmit }: Props) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length) {
      onSubmit(trimmed);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-lg font-inter"
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search here..."
        aria-label="Search products"
        className="w-full h-11 rounded-2xl pl-4 pr-11 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#59b143] focus:border-transparent transition"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#272343] hover:text-[#59b143] transition"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
