// src/components/ui/SortDropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'rating-desc';

interface SortDropdownProps {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'latest', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
];

const SortDropdown: React.FC<SortDropdownProps> = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = sortOptions.find((opt) => opt.value === currentSort)?.label;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative font-inter" ref={dropdownRef} data-testid="sort-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full sm:w-56 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#59b143]"
        data-testid="sort-dropdown-button"
      >
        <span className="truncate">
          <span className="text-gray-500">Sort by:</span> {selectedLabel}
        </span>
        <ChevronDown size={16} className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        // ✅ DEFINITIVE FIX: Added z-20 to ensure the menu appears above other content
        <div className="absolute right-0 top-full mt-2 w-full bg-white border rounded-lg shadow-xl z-20" data-testid="sort-dropdown-menu">
          <ul className="py-1">
            {sortOptions.map((option) => (
              <li key={option.value}>
                <button
                  onClick={() => handleSelect(option.value)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  data-testid={`sort-option-${option.value}`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;