import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Product } from "../../types/products";
import { fetchProductById, updateProduct } from "../../api/productsApi";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addToast } = useToast();

  const [product, setProduct] = useState<Partial<Product>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/admin/products");
      return;
    }
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setImagePreview(data.image);
      } catch (error) {
        addToast("Failed to load product.", "error");
        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate, addToast]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      addToast("Image updates are not supported by the current backend. Please ask your friend to add image upload handling to the product update route.", "info");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !id) return;
    setIsSubmitting(true);

    try {
      // ✅ THE DEFINITIVE FIX:
      // We will now ONLY send a plain JSON object because the backend PUT route
      // does not support FormData for image uploads. This will make text edits work.
      await updateProduct(id, product, token);
      
      addToast("Product updated successfully!", "success");
      navigate("/admin/products", { state: { updated: true } });

    } catch (error) {
      console.error("Update failed:", error);
      addToast("Failed to update product. Check console for details.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Loader /></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#272343] mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Product Name" type="text" name="name" value={product.name || ''} onChange={handleChange} required />
          <Input label="Brand Name" type="text" name="brand" value={product.brand || ''} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#272343] mb-1.5">Description</label>
          <textarea name="description" value={product.description || ''} onChange={handleChange} rows={4} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#59b143] transition" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1.5">Category</label>
            <select name="category" value={product.category || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#59b143] transition">
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
              <option value="health-wellness">Health & Wellness</option>
              <option value="others">Others</option>
            </select>
          </div>
          <Input label="Stock Count" type="number" name="countInStock" value={product.countInStock || 0} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Price (Rs)" type="number" name="price" value={product.price || 0} onChange={handleChange} required />
          <Input label="Original Price (Optional)" type="number" name="originalPrice" value={product.originalPrice || ''} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#272343] mb-1.5">Product Image</label>
          <div className="flex items-center gap-4">
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover border" />}
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Note: Image updates are currently not supported by the backend.</p>
        </div>
        <div className="pt-4">
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
