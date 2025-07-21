// src/pages/Admin/AddProduct.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { createProduct } from "../../api/productsApi";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

// Define a type for our form state for better type safety
interface ProductFormData {
  name: string;
  brand: string;
  description: string;
  category: string;
  price: string;
  originalPrice: string;
  countInStock: string;
}

const AddProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    description: '',
    category: 'groceries', // Default category
    price: '',
    originalPrice: '',
    countInStock: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (!token || !imageFile) {
      addToast("Please fill all fields and select an image.", "error");
      return;
    }

    setIsSubmitting(true);
    const submissionData = new FormData();
    
    // Append all text fields from state
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    // Append the image file
    submissionData.append("image", imageFile);

    try {
      await createProduct(submissionData, token);
      addToast("Product created successfully!", "success");
      navigate("/admin/products", { state: { updated: true } });
    } catch (error) {
      addToast("Failed to create product.", "error");
      console.error("Create product failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#272343] mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Product Name" type="text" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Brand Name" type="text" name="brand" value={formData.brand} onChange={handleChange} required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#272343] mb-1.5">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#59b143] transition" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1.5">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#59b143] transition">
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
              <option value="health-wellness">Health & Wellness</option>
              <option value="others">Others</option>
            </select>
          </div>
          <Input label="Stock Count" type="number" name="countInStock" value={formData.countInStock} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Price (Rs)" type="number" name="price" value={formData.price} onChange={handleChange} required />
          <Input label="Original Price (Optional)" type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#272343] mb-1.5">Product Image</label>
          <div className="flex items-center gap-4">
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover border" />}
            <input type="file" accept="image/*" onChange={handleImageChange} required className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;