// src/hooks/useProducts.ts
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../api/productsApi";
import { Product } from "../types/products"; // Import the centralized type

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchAllProducts();
        const formattedProducts = data.map((product: any) => ({
          ...product,
          id: product._id, // Ensure frontend id matches backend _id
        }));
        setProducts(formattedProducts);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;