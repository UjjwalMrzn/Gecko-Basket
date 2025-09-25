// src/pages/Shop/Shop.tsx
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
// ✅ CORRECTED: Added the required curly braces {} for the named import
import { useAllProducts } from '../../hooks/useAllProducts'; 
import { Product } from '../../types/products';
import ProductCard from '../../components/home/Product Card/ProductCard';
import ProductCardSkeleton from '../../components/home/Product Card/ProductCardSkeleton';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Button from '../../components/ui/Button';
import FilterSidebar, { Filters } from '../../components/shared/FilterSidebar/FilterSidebar';
import SortDropdown, { SortOption } from '../../components/ui/SortDropdown';
import ActiveFilters from '../../components/ui/ActiveFilters';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, error } = useAllProducts();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [sortOrder, setSortOrder] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'latest');

  const maxPriceFromProducts = useMemo(() => {
    if (products.length === 0) return 50000;
    // Assuming 'brand' was a typo and you meant price
    return Math.ceil(Math.max(...products.map(p => p.price)) / 1000) * 1000;
  }, [products]);
  
  const [filters, setFilters] = useState<Filters>({
    // Assuming your product type might not have 'brand'
    brands: searchParams.getAll('brands') || [],
    minPrice: 0,
    maxPrice: parseInt(searchParams.get('maxPrice') || maxPriceFromProducts.toString(), 10),
    rating: parseInt(searchParams.get('rating') || '0', 10),
  });

  useEffect(() => {
    if(!searchParams.get('maxPrice')) {
      setFilters(f => ({ ...f, maxPrice: maxPriceFromProducts }));
    }
  }, [maxPriceFromProducts, searchParams]);

  const allBrands = useMemo(() => {
    // This will throw an error if 'brand' does not exist on your Product type.
    // If you don't have brands, you can comment this out or adjust it.
    // const brands = products.map((p) => (p as any).brand).filter(Boolean);
    // return [...new Set(brands)].sort();
    return []; // Returning empty array if you don't have brands yet
  }, [products]);

  const processedProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      // const brandMatch = filters.brands.length === 0 || filters.brands.includes((p as any).brand);
      const priceMatch = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const ratingMatch = p.rating === 0 || p.rating >= filters.rating;
      // return brandMatch && priceMatch && ratingMatch;
      return priceMatch && ratingMatch; // Simplified if no brands
    });

    switch (sortOrder) {
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'latest':
      default:
        // Assuming your product type has createdAt for sorting by latest
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [products, filters, sortOrder]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.brands.length > 0) filters.brands.forEach(b => params.append('brands', b));
    if (filters.maxPrice < maxPriceFromProducts) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.rating > 0) params.set('rating', filters.rating.toString());
    if (sortOrder !== 'latest') params.set('sort', sortOrder);
    setSearchParams(params, { replace: true });
  }, [filters, sortOrder, setSearchParams, maxPriceFromProducts]);

  const handleClearFilter = (filterType: keyof Filters, value: any) => {
    if (filterType === 'brands') {
      setFilters(prev => ({...prev, brands: prev.brands.filter(b => b !== value)}));
    } else {
      const defaultValues = { maxPrice: maxPriceFromProducts, rating: 0 };
      setFilters(prev => ({...prev, [filterType]: defaultValues[filterType as keyof typeof defaultValues]}));
    }
  };

  const clearAllFilters = () => {
    setFilters({ brands: [], minPrice: 0, maxPrice: maxPriceFromProducts, rating: 0 });
    setSortOrder('latest');
    setIsFilterOpen(false);
  };

  return (
    <section className="bg-gray-50 font-inter">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            setFilters={setFilters}
            allBrands={allBrands}
            applyFilters={() => setIsFilterOpen(false)}
            clearFilters={clearAllFilters}
            maxPrice={maxPriceFromProducts}
          />

          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#272343]">Shop Products</h1>
                <p className="text-sm text-gray-600 mt-1" data-testid="product-count-display">
                  Showing {processedProducts.length} results
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <SortDropdown currentSort={sortOrder} onSortChange={setSortOrder} />
                <Button
                  variant="outline"
                  icon={<Filter size={16} />}
                  className="lg:hidden"
                  onClick={() => setIsFilterOpen(true)}
                  data-testid="open-filters-button"
                >
                  Filter
                </Button>
              </div>
            </div>
            
            <ActiveFilters filters={filters} onClear={handleClearFilter} onClearAll={clearAllFilters} />

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : error ? (
              <ErrorMessage message={error} />
            ) : processedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {processedProducts.map((p: Product) => <ProductCard key={p._id} product={p} />)}
              </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border">
                    <h3 className="text-xl font-semibold text-gray-800">No Products Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                    <Button onClick={clearAllFilters} variant="outline" className="mt-6" data-testid="clear-filters-no-results-button">Clear All Filters</Button>
                </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Shop;