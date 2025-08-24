// src/pages/Admin/EditProducts.tsx

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Product } from "../../types/products";
import { fetchProductById, updateProduct } from "../../api/productsApi";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import ToggleSwitch from '../../components/ui/ToggleSwitch';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { addToast } = useToast();

  // The main state for the product data, matching the official type
  const [product, setProduct] = useState<Partial<Product>>({});
  // A separate state just for the tags input field (as a string)
  const [tagsInput, setTagsInput] = useState('');
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) { navigate("/admin/products"); return; }
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        // When data loads, convert the tags array to a string for the input field
        if (data.tags) {
          setTagsInput(data.tags.join(', '));
        }
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
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
    const newValue = isCheckbox ? checked : (type === 'number' ? (value === '' ? '' : Number(value)) : value);
    setProduct(prev => ({ ...prev, [name]: newValue }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !id) return;
    setIsSubmitting(true);
    
    try {
      // Before submitting, convert the tags string back into an array
      const dataToSubmit: Partial<Product> = {
        ...product,
        tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean),
      };

      if (imageFile) {
        const formData = new FormData();
        Object.entries(dataToSubmit).forEach(([key, value]) => {
          if (key !== 'reviews' && value !== null && value !== undefined) {
            // Handle array submission for FormData
            if (Array.isArray(value)) {
              value.forEach(item => formData.append(key, item));
            } else {
              formData.append(key, String(value));
            }
          }
        });
        formData.append("image", imageFile);
        await updateProduct(id, formData, token);
      } else {
        await updateProduct(id, dataToSubmit, token);
      }

      addToast("Product updated successfully!", "success");
      navigate("/admin/products", { state: { updated: true } });
    } catch (error) {
      addToast("Failed to update product.", "error");
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
        <textarea name="description" value={product.description || ''} onChange={handleChange} rows={4} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#59b143] transition" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Price (Rs)" type="number" name="price" value={product.price ?? ''} onChange={handleChange} required min={0} />
          <Input label="Original Price (Optional)" type="number" name="originalPrice" value={product.originalPrice ?? ''} onChange={handleChange} min={0} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <select name="category" value={product.category || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#59b143] transition">
            <option value="groceries">Groceries</option>
            <option value="electronics">Electronics</option>
            <option value="others">Others</option>
          </select>
          <Input label="Stock Count" type="number" name="countInStock" value={product.countInStock ?? ''} onChange={handleChange} required min={0} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#272343] mb-1.5">Tags (Comma-separated)</label>
          <Input label="" type="text" name="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="e.g. protein, healthy, snack" testId="edit-product-tags-input" />
        </div>
        <div className="space-y-4 pt-2">
            <div>
                <label className="block text-sm font-medium text-[#272343] mb-1.5">Product Image</label>
                <div className="flex items-center gap-4">
                    {imagePreview && <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover border" />}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                </div>
            </div>
            <ToggleSwitch
                id="isFeatured-edit"
                name="isFeatured"
                checked={product.isFeatured || false}
                onChange={handleChange}
                label="Mark as Featured"
                testId="edit-product-featured-toggle"
            />
        </div>
        <div className="pt-4">
            <Button type="submit" fullWidth disabled={isSubmitting} testId="edit-product-submit-button">
                {isSubmitting ? 'Updating...' : 'Update Product'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;