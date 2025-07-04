import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

type SearchBarProps = {
  onSubmit: (query: string) => void;
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search here..."
        className="w-full h-11 rounded-2xl pl-4 pr-11 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#59b143]"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#272343] hover:text-[#59b143]"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
