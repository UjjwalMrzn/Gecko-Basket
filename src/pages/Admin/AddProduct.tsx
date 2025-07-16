import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { createProduct } from "../../api/productsApi";
import { useToast } from "../../context/ToastContext"; // Import the useToast hook

const AddProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast(); // Use the toast hook

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("groceries");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [countInStock, setCountInStock] = useState("50");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setSlug(newName.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !slug || !brand || !description || !price || !category || !image || !countInStock) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }
    if (!token) {
      setError("You are not authorized. Please log in again.");
      setIsLoading(false);
      return;
    }

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
      addToast("Product added successfully!", "success");
      navigate("/admin/products", { state: { updated: true } });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to add product.";
      addToast(errorMessage, "error");
      setError(errorMessage);
    } finally {
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
          <Input label="Product Slug (URL-friendly)" type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
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
              className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#eaf5e5] file:text-[#59b143] hover:file:bg-[#d9f0d5]"
              required
            />
          </div>
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Product"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;