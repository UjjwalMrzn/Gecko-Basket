// src/pages/Shop/Shop.tsx

import { useState, useEffect } from "react";
import axios from 'axios';
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/home/Product Card/ProductCard";
import ProductCardSkeleton from "../../components/home/Product Card/ProductCardSkeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { Category } from "../../types/category";
import FilterSidebar from "../../components/shared/FilterSidebar/FilterSidebar";
import CustomSelect from "../../components/ui/CustomSelect";
import { ChevronDown } from "lucide-react";

const sortOptions = [
  { value: 'createdAt-desc', label: 'Newest Arrivals' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' },
];

const Shop = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOrder, setSortOrder] = useState(sortOptions[0]);

  // Use the single, powerful hook to get the products that match the current filters
  const { products, loading: loadingProducts, error } = useProducts({
    category: selectedCategory,
    brands: selectedBrands,
    priceRange: selectedPriceRange,
    rating: selectedRating,
    sort: sortOrder.value,
  });
  
  // Use the same hook, without filters, to get all products for the brand list
  const { products: allProducts } = useProducts({});

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await axios.get<Category[]>('/api/categories');
            setCategories(response.data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };
    fetchCategories();
  }, []);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRange('all');
    setSelectedRating(0);
  };

  const renderSortTrigger = (value: { label: string }, isOpen: boolean) => (
    <div className="w-48 flex items-center justify-between px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white">
      <span className="text-gray-700">{value.label}</span>
      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </div>
  );

  const renderSortOption = (option: { label: string }, isSelected: boolean) => (
    <div className={`px-4 py-2 text-sm cursor-pointer ${isSelected ? 'bg-green-100 text-green-800' : 'hover:bg-gray-50 text-gray-800'}`}>
      {option.label}
    </div>
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <FilterSidebar
            products={allProducts}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            selectedPriceRange={selectedPriceRange}
            onPriceChange={setSelectedPriceRange}
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
            clearFilters={clearFilters}
          />

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#272343]">
                {selectedCategory || 'Shop All Products'}
              </h2>
              <CustomSelect
                value={sortOrder}
                options={sortOptions}
                onChange={setSortOrder}
                renderTrigger={(value, isOpen) => renderSortTrigger(value, isOpen)}
                renderOption={renderSortOption}
                testId="sort-by-select"
              />
            </div>
            
            {loadingProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => ( <ProductCardSkeleton key={i} /> ))}
              </div>
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((p) => ( <ProductCard key={p._id} product={p} /> ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <p className="font-semibold text-lg text-gray-700">No Products Found</p>
                    <p className="text-sm text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Shop;