export const fetchAllProducts = async () => {
  const response = await fetch("/api/products"); 
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
};
