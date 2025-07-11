// src/pages/Shop/Shop.tsx
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/home/Product Card/ProductCard";
import Loader from "../../components/ui/Loader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import ProductCardSkeleton from "../../components/home/Product Card/ProductCardSkeleton";
const Shop = () => {
  const { products, loading, error } = useProducts();

if (loading) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#fdfcf2] min-h-screen font-inter">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#fdfcf2] min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#272343] mb-6">
          Shop All Products
        </h2>
        <p className="text-sm text-gray-600 mb-10 max-w-2xl">
          Browse our complete range of products selected just for you.
        </p>

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
      </div>
    </section>
  );
};

export default Shop;
