import { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      // Use the onSubmit function passed from the parent
      onSubmit(trimmedQuery);
      // Also navigate to the search page
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
      setQuery("");
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
        placeholder="Search for products..."
        className="w-full h-11 rounded-2xl pl-4 pr-12 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#59b143] transition"
      />
      <button
        type="submit"
        aria-label="Submit search"
        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-[#59b143] transition"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;