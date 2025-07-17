import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { createProduct } from "../../api/productsApi";
import { useToast } from "../../context/ToastContext";

const AddProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("groceries");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(
      newName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !slug || !brand || !description || !price || !category || !image || !countInStock) {
      setError("All fields except original price are required.");
      return;
    }
    if (!token) {
        addToast("Authentication error. Please log in again.", 'error');
        return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    if (originalPrice) formData.append("originalPrice", originalPrice);
    formData.append("countInStock", countInStock);
    formData.append("image", image);

    try {
      await createProduct(formData, token);
      // ✅ FIX: Navigate with state to trigger a refresh on the products page
      navigate("/admin/products", { state: { updated: true } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add product. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <section className="p-6 font-inter bg-[#f9fafb] min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-[#272343] mb-6">Add New Product</h1>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Product Name" type="text" value={name} onChange={handleNameChange} required />
          <Input label="Brand Name" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          <Input label="Product Slug" type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59b143] transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#59b143] transition"
            >
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="gym-equipment">Gym Equipment</option>
              <option value="others">Others</option>
            </select>
          </div>
          <Input label="Price (Rs)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <Input label="Original Price (Optional)" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
          <Input label="Stock Count" type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required />
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="text-sm"
              required
            />
          </div>
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Product'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;