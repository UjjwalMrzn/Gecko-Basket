import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { fetchAllProducts, deleteProduct } from "../../api/productsApi";
import { Product } from "../../types/products";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addToast } = useToast();

  const loadProducts = () => {
    setLoading(true);
    fetchAllProducts()
      .then((data) => {
        setProducts(data as Product[]);
        setError("");
      })
      .catch(() => setError("Failed to fetch products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (location.state?.updated) {
      addToast('Product list has been updated!', 'success');
      loadProducts();
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, addToast]);

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    if (!token) {
        addToast("Authentication error. Please log in again.", 'error');
        return;
    }
    try {
      await deleteProduct(productId, token);
      addToast('Product deleted successfully.', 'success');
      loadProducts();
    } catch (err: any) {
      addToast(err.message || "Failed to delete product.", 'error');
    }
  };

  return (
    <section className="p-4 sm:p-6 font-inter bg-[#f9fafb] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#272343]">Manage Products</h1>
          <Link to="/admin/products/add">
            <Button className="w-full sm:w-auto">Add Product</Button>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products found.</p>
        ) : (
          <div>
            {/* ✅ DESKTOP TABLE - Hidden on mobile */}
            <div className="hidden md:block overflow-x-auto border rounded-xl bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Price</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                    <th className="px-4 py-3 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                      <td className="px-4 py-3">{p.category}</td>
                      <td className="px-4 py-3">Rs. {p.price}</td>
                      <td className="px-4 py-3">{p.countInStock > 0 ? `${p.countInStock}` : "Out"}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center items-center gap-4">
                          <Link to={`/admin/products/edit/${p.id}`} title="Edit">
                            <Pencil size={16} className="text-blue-500 hover:text-blue-700" />
                          </Link>
                          <button onClick={() => handleDelete(p.id)} title="Delete">
                            <Trash2 size={16} className="text-red-500 hover:text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ MOBILE CARD LIST - Hidden on desktop */}
            <div className="md:hidden space-y-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-md text-gray-800 mb-2">{p.name}</h3>
                    <div className="flex items-center gap-4">
                      <Link to={`/admin/products/edit/${p.id}`} title="Edit">
                        <Pencil size={16} className="text-blue-500" />
                      </Link>
                      <button onClick={() => handleDelete(p.id)} title="Delete">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p><span className="font-medium text-gray-700">Category:</span> {p.category}</p>
                    <p><span className="font-medium text-gray-700">Price:</span> Rs. {p.price}</p>
                    <p><span className="font-medium text-gray-700">Stock:</span> {p.countInStock > 0 ? `${p.countInStock} In Stock` : "Out of Stock"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;