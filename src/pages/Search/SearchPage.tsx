import { useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/home/Product Card/ProductCard";
import ProductCardSkeleton from "../../components/home/Product Card/ProductCardSkeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { Product } from "../../types/products"; 

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { products, loading, error } = useProducts();

  const filteredProducts = products.filter((product: Product) => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <h2 className="text-2xl sm:text-3xl font-bold text-[#272343] mb-10">
            Searching for products...
          </h2>
        ) : (
          <h2 className="text-2xl sm:text-3xl font-bold text-[#272343] mb-10">
            {filteredProducts.length} results for <span className="text-[#59b143]">"{query}"</span>
          </h2>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p: Product) => ( 
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-800">No Products Found</h3>
            <p className="text-gray-500 mt-2">
              Sorry, we couldn't find any products matching your search for "{query}".
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;