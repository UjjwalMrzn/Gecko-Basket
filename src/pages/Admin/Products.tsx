import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { fetchAllProducts } from "../../api/productsApi";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchAllProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to fetch products"))
      .finally(() => setLoading(false));
  }, []);

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
        ) : products.length === 0 ? (
          <p className="text-gray-500 text-sm">No products found.</p>
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
                    <td className="px-4 py-3">{p.inStock ? "In Stock" : "Out of Stock"}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <Link to={`/admin/products/edit/${p._id}`}>
                          <Pencil size={18} className="text-blue-500 hover:text-blue-700" />
                        </Link>
                        <button onClick={() => alert("Delete logic later")}>
                          <Trash2 size={18} className="text-red-500 hover:text-red-700" />
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
