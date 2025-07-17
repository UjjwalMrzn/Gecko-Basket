import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/home/Product Card/ProductCard";
import Skeleton from "../../components/ui/Skeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { Product } from "../../types/products"; // ✅ IMPORT the centralized Product type

const Shop = () => {
  const { products, loading, error } = useProducts();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#fdfcf2] min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#272343] mb-6">
          Shop All Products
        </h2>
        <p className="text-sm text-gray-600 mb-10 max-w-2xl">
          Browse our complete range of products selected just for you.
        </p>

        {loading ? (
          // ✅ Standardized Skeleton Layout
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow border border-gray-200 space-y-3">
                <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-9 w-full rounded-lg mt-2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* ✅ CLEAN: Pass the product object directly. No more manual mapping. */}
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;