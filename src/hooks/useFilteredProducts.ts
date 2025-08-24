// src/hooks/useFilteredProducts.ts

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types/products';

export interface ProductFilters {
  category?: string | null;
  brands?: string[];
  priceRange?: string;
  rating?: number;
  sort?: string;
}

const useFilteredProducts = (filters: ProductFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        
        if (filters.category) params.append('category', filters.category);
        if (filters.brands && filters.brands.length > 0) params.append('brand', filters.brands.join(','));
        
        if (filters.priceRange && filters.priceRange !== 'all') {
          const [min, max] = filters.priceRange.split('-');
          if (min) params.append('price[gte]', min);
          if (max && max !== '+') params.append('price[lte]', max);
        }

        if (filters.rating && filters.rating > 0) {
            params.append('rating[gte]', String(filters.rating));
        }

        if (filters.sort) {
          const [sortBy, order] = filters.sort.split('-');
          params.append('sort', sortBy);
          params.append('order', order);
        }
        
        const response = await axios.get<Product[]>('/api/products', { params });
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters.category, filters.brands, filters.priceRange, filters.rating, filters.sort]); 

  return { products, loading, error };
};

export default useFilteredProducts;