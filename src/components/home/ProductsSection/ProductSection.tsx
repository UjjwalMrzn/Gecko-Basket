import useProducts from "../../../hooks/useProducts";
import ProductCard from "../Product Card/ProductCard";
import Skeleton from "../../ui/Skeleton";
import ErrorMessage from "../../ui/ErrorMessage";
import { Product } from "../../../types/products"; 

const ProductSection = () => {
  const { products, loading, error } = useProducts();

  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white font-inter">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#272343] mb-4">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Discover our handpicked selection of quality goods, from nourishing staples to unique merchandise.
        </p>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Render 4 skeletons while loading */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow border border-gray-200 space-y-3"
              >
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
            {/* Map over the featured products and pass the full product object */}
            {featuredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;