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
        // fetchAllProducts is now correctly typed to return Promise<Product[]>
        const data = await fetchAllProducts();

        // Map the backend's _id to the frontend's id for consistency
        const formattedProducts = data.map((product: any) => ({
          ...product,
          id: product._id,
        }));
        setProducts(formattedProducts);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;