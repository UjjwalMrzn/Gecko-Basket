// src/components/reviews/ProductReviewForm.tsx
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { addProductReview } from '../../api/productsApi';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';

// Define the validation schema for the form
const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z
    .string()
    .min(10, 'Review must be at least 10 characters long.')
    .max(500, 'Review cannot exceed 500 characters.'),
});

// Define the type for our form data
type ReviewFormData = z.infer<typeof reviewSchema>;

interface ProductReviewFormProps {
  productId: string;
  onReviewSubmit: () => void; // A function to call after a successful submission
}

const ProductReviewForm = ({ productId, onReviewSubmit }: ProductReviewFormProps) => {
  const { token } = useAuth();
  const { addToast } = useToast();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    if (!token) {
      addToast('You must be logged in to submit a review.', 'error');
      return;
    }

    try {
      await addProductReview(productId, data, token);
      addToast('Thank you for your review!', 'success');
      reset(); // Clear the form after successful submission
      onReviewSubmit(); // Notify the parent component
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Failed to submit review. You may have already reviewed this product.";
        addToast(errorMessage, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="product-review-form">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <StarRating
              rating={field.value}
              onRatingChange={field.onChange}
              disabled={isSubmitting}
            />
          )}
        />
        {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>}
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Your Review
        </label>
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="comment"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Share your thoughts about the product..."
              disabled={isSubmitting}
            />
          )}
        />
        {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>}
      </div>

      <div className="text-right">
        <Button type="submit" disabled={isSubmitting} testId="submit-review-button">
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </form>
  );
};

export default ProductReviewForm;