import { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash2, ShieldAlert, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../../types/products";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { fetchAllProducts, deleteProduct } from "../../api/productsApi";
import Skeleton from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";

const Products = () => {
  const { token } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetchAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (location.state?.updated) {
      loadProducts();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProductToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete || !token) return;
    try {
      await deleteProduct(productToDelete._id, token);
      setProducts(prev => prev.filter(p => p._id !== productToDelete._id));
      addToast("Product deleted successfully.", "success");
    } catch (err) {
      addToast("Failed to delete product.", "error");
    } finally {
      closeDeleteModal();
    }
  };

  if (loading) {
    return ( <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div> );
  }
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="font-inter">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#272343]">Manage Products</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input type="text" label="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name..." className="w-full" testId="product-search-input" />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Link to="/admin/products/add">
            <Button testId="add-product-button">Add Product</Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold w-16">S.N</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((p, index) => (
              <tr key={p._id}>
                <td className="px-4 py-3 font-medium text-gray-500">{indexOfFirstProduct + index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.category}</td>
                <td className="px-4 py-3 text-gray-600">Rs. {p.price}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${p.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {p.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-4">
                    <Link to={`/admin/products/edit/${p._id}`} title="Edit" data-testid={`edit-product-button-${p._id}`}>
                      <Pencil size={18} className="text-blue-500 hover:text-blue-700 transition" />
                    </Link>
                    <button onClick={() => openDeleteModal(p)} title="Delete" data-testid={`delete-product-button-${p._id}`}>
                      <Trash2 size={18} className="text-red-500 hover:text-red-700 transition" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handlePrevPage} disabled={currentPage === 1} testId="pagination-prev-button">
              <ChevronLeft size={16} /> Previous
            </Button>
            <Button size="sm" variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages} testId="pagination-next-button">
              Next <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <div className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Delete Product</h3>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={closeDeleteModal} variant="outline" testId="delete-cancel-button">Cancel</Button>
            <Button onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 focus:ring-red-500" testId="delete-confirm-button">Delete</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Products;