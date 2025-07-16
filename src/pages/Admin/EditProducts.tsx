// src/pages/Admin/EditProduct.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Skeleton from "../../components/ui/Skeleton";
import { fetchProductById, updateProduct } from "../../api/productsApi";
import { useAuth } from "../../context/AuthContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setError("");
      })
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !product.name ||
      !product.slug ||
      !product.description ||
      !product.category ||
      !product.price ||
      !product.countInStock ||
      !product.brand
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("slug", product.slug);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("countInStock", product.countInStock);
    formData.append("brand", product.brand);
    if (product.originalPrice)
      formData.append("originalPrice", product.originalPrice);
    if (imageFile) formData.append("image", imageFile);

    try {
      await updateProduct(id!, formData, token);
      navigate("/admin/products", { state: { updated: true } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update product.");
    }
  };

  if (loading) {
    return (
      <section className="p-6 font-inter bg-[#f9fafb] min-h-screen">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-8 w-1/2" />
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </section>
    );
  }

  if (!product) return null;

  return (
    <section className="p-6 font-inter bg-[#f9fafb] min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-[#272343] mb-6">Edit Product</h1>

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Product Name"
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <Input
            label="Slug"
            type="text"
            value={product.slug}
            onChange={(e) => setProduct({ ...product, slug: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              Description
            </label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              rows={4}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#59b143]"
            />
          </div>
          <Input
            label="Category"
            type="text"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          />
          <Input
            label="Price"
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <Input
            label="Original Price"
            type="number"
            value={product.originalPrice || ""}
            onChange={(e) =>
              setProduct({ ...product, originalPrice: e.target.value })
            }
          />
          <Input
            label="Stock Count"
            type="number"
            value={product.countInStock}
            onChange={(e) =>
              setProduct({ ...product, countInStock: e.target.value })
            }
          />
          <Input
            label="Brand"
            type="text"
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-[#272343] mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">Leave empty to keep existing image.</p>
          </div>

          <Button type="submit" fullWidth>
            Update Product
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
