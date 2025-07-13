// src/pages/Shop/Shop.tsx
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/home/Product Card/ProductCard";
import Skeleton from "../../components/ui/Skeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";

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

        {/* 🔁 Show Skeletons */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={{
                  id: p._id,
                  name: p.name,
                  title: p.title,
                  category: p.category,
                  description: p.description,
                  price: p.price,
                  originalPrice: p.originalPrice ?? undefined,
                  image: p.image,
                  rating: p.rating ?? 0,
                  reviews: p.reviews ?? 0,
                  tag: p.tag ?? undefined,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
