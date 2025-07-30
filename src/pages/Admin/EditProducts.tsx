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
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    setProduct(prev => ({ ...prev, [name]: newValue }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !id) return;
    setIsSubmitting(true);

    try {

      if (imageFile) {
        const formData = new FormData();
        Object.entries(product).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, String(value));
          }
        });
        formData.append("image", imageFile);
        await updateProduct(id, formData, token);
      } else {
        await updateProduct(id, product, token);
      }

      addToast("Product updated successfully!", "success");
      navigate("/admin/products", { state: { updated: true } });
    } catch (error) {
      console.error("Update failed:", error);
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
        <Input label="Product Name" type="text" name="name" value={product.name || ''} onChange={handleChange} required testId="edit-product-name-input" />
        <Input label="Brand Name" type="text" name="brand" value={product.brand || ''} onChange={handleChange} required testId="edit-product-brand-input" />
        <textarea name="description" value={product.description || ''} onChange={handleChange} rows={4} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#59b143] transition" data-testid="edit-product-description-textarea" />
        <select name="category" value={product.category || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#59b143] transition" data-testid="edit-product-category-select">
          <option value="groceries">Groceries</option>
          <option value="electronics">Electronics</option>
          <option value="health-wellness">Health & Wellness</option>
          <option value="others">Others</option>
        </select>
        <Input label="Stock Count" type="number" name="countInStock" value={product.countInStock ?? ''} onChange={handleChange} required min={0} testId="edit-product-stock-input" />
        <Input label="Price (Rs)" type="number" name="price" value={product.price ?? ''} onChange={handleChange} required min={0} testId="edit-product-price-input" />
        <Input label="Original Price (Optional)" type="number" name="originalPrice" value={product.originalPrice ?? ''} onChange={handleChange} min={0} testId="edit-product-original-price-input" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm ..." data-testid="edit-product-image-input" />
        <Button type="submit" fullWidth disabled={isSubmitting} testId="edit-product-submit-button">
          {isSubmitting ? 'Updating...' : 'Update Product'}
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;