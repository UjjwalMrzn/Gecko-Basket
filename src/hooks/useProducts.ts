import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types/products"; // ✅ IMPORT the centralized Product type

// The local 'BackendProduct' type has been removed.

const useProducts = () => {
  // ✅ USE the correct, centralized type for state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // ✅ USE axios for consistency and better error handling
        const response = await axios.get<Product[]>(`${import.meta.env.VITE_API_BASE_URL}/products`);
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // The empty dependency array ensures this runs only once on mount

  return { products, loading, error };
};

export default useProducts;