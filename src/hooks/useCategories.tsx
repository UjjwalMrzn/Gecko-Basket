import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCategories(["All", "Groceries", "Electronics", "Accessories", "Home & Kitchen"]);
      setLoading(false);
    }, 500);
  }, []);

  return { categories, loading };
};

export default useCategories;
