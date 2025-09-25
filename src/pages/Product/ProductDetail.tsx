// src/pages/Product/ProductDetail.tsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// ✅ Corrected import from your existing plural file
import { getProductBySlug } from '../../api/productsApi'; 
// ✅ Corrected import path and name
import { Product } from '../../types/products'; 
import ProductReviewForm from '../../components/reviews/ProductReviewForm';
import { Star } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      const response = await getProductBySlug(slug);
      setProduct(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load product. It might not exist.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleReviewSubmitted = () => {
    fetchProduct();
  };

  if (loading) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-inter">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mt-2">NPR {product.price}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'} fill="currentColor" />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">({product.numReviews} reviews)</span>
          </div>
          <p className="mt-4 text-gray-600">{product.description}</p>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Customer Reviews</h2>
        
        <div className="space-y-6 mb-8">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review) => ( // ✅ This will now be correctly typed
              <div key={review._id} className="border-b pb-4">
                 <p className="font-semibold">{review.name}</p>
                 <div className="flex items-center my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill="currentColor" />
                    ))}
                 </div>
                 <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>
          {user ? (
            <ProductReviewForm
              productId={product._id}
              onReviewSubmit={handleReviewSubmitted}
            />
          ) : (
            <p className="text-gray-600 bg-gray-50 p-4 rounded-md">
              You must be <Link to="/login" className="text-green-600 font-semibold hover:underline">logged in</Link> to post a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;