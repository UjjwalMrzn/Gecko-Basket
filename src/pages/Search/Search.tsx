import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/home/Product Card/ProductCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const { products, loading, error } = useProducts();
  const [filtered, setFiltered] = useState<typeof products>([]);

  useEffect(() => {
    if (!query || products.length === 0) return;

    const matched = products.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );

    setFiltered(matched);
  }, [query, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-inter">
      <h1 className="text-2xl font-bold text-[#272343] mb-6">
        Search Results for: <span className="text-[#59b143]">"{query}"</span>
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : filtered.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default Search;
