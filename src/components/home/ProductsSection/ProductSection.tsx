import { useEffect, useState } from "react";
import useProducts from "../../../hooks/useProducts";
import ProductCard from "../Product Card/ProductCard";
import Skeleton from "../../ui/Skeleton";
import ErrorMessage from "../../ui/ErrorMessage";

type Product = {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  tag?: string;
};

const ProductSection = () => {
  const { products, loading, error } = useProducts();

  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      setFeatured(products.slice(0, 4));
    }
  }, [products]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white font-inter">
      <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#272343] mb-4">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Discover our handpicked selection of quality goods, from nourishing staples to unique merchandise.
        </p>


        {/* Loading with Skeletons */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            {featured.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  title: product.title,
                  category: product.category,
                  description: product.description,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.image,
                  rating: product.rating ?? 0,
                  reviews: product.reviews ?? 0,
                  tag: product.tag ?? undefined,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
