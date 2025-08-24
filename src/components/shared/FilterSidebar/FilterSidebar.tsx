// src/components/shared/FilterSidebar.tsx

import React from 'react';
import { Product } from '../../../types/products';
import { Star } from 'lucide-react';

interface FilterSidebarProps {
  products: Product[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  selectedPriceRange: string;
  onPriceChange: (range: string) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  clearFilters: () => void;
}

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '0-1000', label: 'Under Rs. 1,000' },
  { value: '1000-5000', label: 'Rs. 1,000 to Rs. 5,000' },
  { value: '5000-10000', label: 'Rs. 5,000 to Rs. 10,000' },
  { value: '10000+', label: 'Over Rs. 10,000' },
];

const ratingFilters = [
  { value: 4, label: '4 Stars & Up' },
  { value: 3, label: '3 Stars & Up' },
  { value: 2, label: '2 Stars & Up' },
  { value: 1, label: '1 Star & Up' },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  products,
  selectedBrands,
  onBrandChange,
  selectedPriceRange,
  onPriceChange,
  selectedRating,
  onRatingChange,
  clearFilters
}) => {
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  return (
    <aside className="w-full md:w-72 flex-shrink-0" data-testid="filter-sidebar">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#272343]">Filters</h3>
        <button 
          onClick={clearFilters} 
          className="text-xs font-semibold text-gray-500 hover:text-red-500 transition"
          data-testid="clear-filters-button"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Brand Filter */}
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-800 mb-3">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => onBrandChange(brand)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="ml-2">{brand}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Filter */}
      <div className="border-t pt-4 mt-6">
        <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.value} className="flex items-center text-sm text-gray-700 cursor-pointer">
              <input type="radio" name="price-range" value={range.value} checked={selectedPriceRange === range.value} onChange={(e) => onPriceChange(e.target.value)} className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="ml-2">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Rating Filter */}
      <div className="border-t pt-4 mt-6">
        <h4 className="font-semibold text-gray-800 mb-3">Rating</h4>
        <div className="space-y-2">
          {ratingFilters.map(rating => (
            <label key={rating.value} className="flex items-center text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="rating-filter" value={rating.value} checked={selectedRating === rating.value} onChange={() => onRatingChange(rating.value)} className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500" />
                <div className="ml-2 flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className={i < rating.value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                    ))}
                    <span className="ml-1.5 text-xs text-gray-500">& Up</span>
                </div>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;