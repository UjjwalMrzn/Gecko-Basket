// src/components/ui/ActiveFilters.tsx
import { X } from 'lucide-react';
import { Filters } from '../shared/FilterSidebar/FilterSidebar';

interface ActiveFiltersProps {
  filters: Filters;
  onClear: (filterType: keyof Filters, value: any) => void;
  onClearAll: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onClear, onClearAll }) => {
  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.maxPrice < 50000 || // Assuming 50000 is the max default
    filters.rating > 0;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg" data-testid="active-filters-bar">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-gray-800">Active Filters:</span>
        {filters.brands.map((brand) => (
          <div key={brand} className="flex items-center gap-1 bg-white border rounded-full px-3 py-1 text-sm">
            <span>{brand}</span>
            <button onClick={() => onClear('brands', brand)} data-testid={`clear-brand-${brand}`}>
              <X size={14} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
        ))}
        {filters.maxPrice < 50000 && (
          <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-1 text-sm">
            <span>Price: &lt; Rs. {filters.maxPrice.toLocaleString()}</span>
            <button onClick={() => onClear('maxPrice', 50000)} data-testid="clear-price">
              <X size={14} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
        )}
        {filters.rating > 0 && (
          <div className="flex items-center gap-1 bg-white border rounded-full px-3 py-1 text-sm">
            <span>Rating: {filters.rating}+ Stars</span>
            <button onClick={() => onClear('rating', 0)} data-testid="clear-rating">
              <X size={14} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
        )}
        <button
          onClick={onClearAll}
          className="text-sm text-blue-600 hover:underline ml-auto"
          data-testid="clear-all-filters-button"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ActiveFilters;