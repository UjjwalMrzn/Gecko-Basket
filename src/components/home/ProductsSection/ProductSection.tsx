// src/components/home/ProductSection.tsx
import { useState, useEffect } from 'react';
// ✅ Corrected import to use the new function
import { getFeaturedProducts } from '../../../api/productsApi';
import { Product } from '../../../types/products';
import ProductCard from '../Product Card/ProductCard'; // Assuming a shared ProductCard component exists

const ProductSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getFeaturedProducts();
        setProducts(response.data.data);
      } catch (err) {
        setError('Failed to load featured products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading featured products...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Gecko's Picks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;