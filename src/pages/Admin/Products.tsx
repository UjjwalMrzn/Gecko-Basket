// src/pages/Admin/Products.tsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { fetchAllProducts, deleteProduct } from "../../api/productsApi";
import { Product } from "../../types/products";
import { useAuth } from "../../context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const { token } = useAuth();

  const loadProducts = () => {
    setLoading(true);
    fetchAllProducts()
      .then((data) => {
        const formatted = data.map((p: any) => ({ ...p, id: p._id }));
        setProducts(formatted);
      })
      .catch(() => setError("Failed to fetch products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (location.state?.updated) {
      loadProducts();
    }
  }, [location.state]);

  const handleDelete = async (id: string) => {
    if (!token) {
      alert("You are not authorized to perform this action.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        await deleteProduct(id, token);
        // After successful deletion, refetch the product list to update the UI
        loadProducts(); 
      } catch (err) {
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  return (
    <section className="p-6 font-inter bg-[#f9fafb] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#272343]">Manage Products</h1>
          <Link to="/admin/products/add">
            <Button>Add Product</Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-[#f0f2f3] text-[#272343] text-left">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p._id}>
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3">{p.brand}</td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3">Rs. {p.price}</td>
                    <td className="px-4 py-3">
                      {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <Link to={`/admin/products/edit/${p._id}`}>
                          <Pencil
                            size={18}
                            className="text-blue-500 hover:text-blue-700"
                          />
                        </Link>
                        <button onClick={() => handleDelete(p._id)}>
                          <Trash2
                            size={18}
                            className="text-red-500 hover:text-red-700"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;