// src/hooks/useProducts.ts
import { useState, useEffect } from "react";
import { Product } from "../types/products";
import { fetchAllProducts } from "../api/productsApi"; // Import the updated function

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Now we get the full response and use .data
        const response = await fetchAllProducts();
        setProducts(response.data);
      } catch (err: unknown) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;