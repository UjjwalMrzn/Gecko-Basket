// src/hooks/useAllProducts.ts
import { useState, useEffect } from 'react';
// ✅ CORRECTED: Changed 'fetchAllProducts' to 'getProducts'
import { getProducts } from '../api/productsApi';
import { Product } from '../types/products';

export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        // ✅ CORRECTED: Changed 'fetchAllProducts' to 'getProducts'
        const response = await getProducts();
        setProducts(response.data.data);
      } catch (err) {
        setError('Failed to load products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
};