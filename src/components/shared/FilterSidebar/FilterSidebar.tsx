// src/components/shared/FilterSidebar/FilterSidebar.tsx
import React from 'react';
import { X } from 'lucide-react';
import Button from '../../ui/Button';
import StarRating from '../../ui/StarRating';
import Input from '../../ui/Input'; // Import the Input component

export interface Filters {
  brands: string[];
  minPrice: number;
  maxPrice: number;
  rating: number;
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  allBrands: string[];
  applyFilters: () => void;
  clearFilters: () => void;
  maxPrice: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  allBrands,
  applyFilters,
  clearFilters,
  maxPrice,
}) => {
  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    setFilters({ ...filters, brands: newBrands });
  };

  // ✅ FIX: Handle changes for both min and max price inputs
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value === '' ? 0 : parseInt(value, 10) });
  };

  const handleRatingChange = (newRating: number) => {
    const rating = filters.rating === newRating ? 0 : newRating;
    setFilters({ ...filters, rating });
  };

  const content = (
    // ✅ FIX: Removed h-full and flex-col to fix the button gap
    <div className="p-6 font-inter">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#272343]">Filters</h3>
        <button onClick={onClose} className="lg:hidden" data-testid="close-filters-button">
          <X size={24} />
        </button>
      </div>

      {/* ✅ FIX: Replaced slider with professional min/max input fields */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-gray-800">Price</h4>
        <div className="flex items-center gap-3">
            <Input
                label=""
                name="minPrice"
                type="number"
                value={filters.minPrice === 0 ? '' : filters.minPrice}
                onChange={handlePriceInputChange}
                placeholder="Min"
                testId="min-price-input"
            />
            <span className="text-gray-400">-</span>
            <Input
                label=""
                name="maxPrice"
                type="number"
                value={filters.maxPrice === maxPrice ? '' : filters.maxPrice}
                onChange={handlePriceInputChange}
                placeholder="Max"
                testId="max-price-input"
            />
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6 border-t pt-6">
        <h4 className="font-semibold mb-3 text-gray-800">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {allBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="h-4 w-4 rounded border-gray-300 text-[#59b143] focus:ring-[#59b143]"
                data-testid={`brand-checkbox-${brand}`}
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6 border-t pt-6">
        <h4 className="font-semibold mb-3 text-gray-800">Rating</h4>
        <div className="flex flex-col items-start gap-1">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => handleRatingChange(r)}
              className={`p-1 rounded w-full text-left ${filters.rating === r ? 'bg-green-100' : ''}`}
              data-testid={`rating-filter-${r}-star`}
            >
              <StarRating rating={r} isStatic />
            </button>
          ))}
        </div>
      </div>

      {/* ✅ FIX: Buttons are now positioned correctly below the filters */}
      <div className="pt-6 border-t">
        <div className="flex flex-col gap-3">
          <Button onClick={applyFilters} fullWidth data-testid="apply-filters-button">Apply Filters</Button>
          <Button onClick={clearFilters} variant="outline" fullWidth data-testid="clear-filters-button">Clear Filters</Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile view (off-canvas) */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'bg-black/40' : 'bg-transparent pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="filters-sidebar-mobile"
      >
        <div className="overflow-y-auto h-full">
          {content}
        </div>
      </div>

      {/* Desktop view (static) */}
      <aside className="hidden lg:block w-72 flex-shrink-0" data-testid="filters-sidebar-desktop">
        <div className="bg-white rounded-xl shadow-sm border h-full">
            {content}
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;