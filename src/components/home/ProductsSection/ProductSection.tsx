// src/components/home/ProductsSection/ProductSection.tsx

import useAllProducts from "../../../hooks/useAllProducts"; // Use the new, simple hook
import ProductCard from "../Product Card/ProductCard";
import ProductCardSkeleton from "../Product Card/ProductCardSkeleton";
import ErrorMessage from "../../ui/ErrorMessage";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

const ProductSection = () => {
  const { products, loading, error } = useAllProducts();

  // Show only the first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white font-inter">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#272343] mb-4">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our handpicked selection of quality goods, from nourishing staples to unique merchandise.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
            <Link to="/shop">
                <Button variant="outline">View All Products</Button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;