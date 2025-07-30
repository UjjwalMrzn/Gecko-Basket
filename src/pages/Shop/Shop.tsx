import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/home/Product Card/ProductCard";
import ProductCardSkeleton from "../../components/home/Product Card/ProductCardSkeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";

const Shop = () => {
  const { products, loading, error } = useProducts();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#272343] mb-4">
          Shop All Products
        </h2>
        <p className="text-sm text-gray-600 mb-10 max-w-2xl">
          Browse our complete range of products selected just for you.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;