// src/components/ui/StarRating.tsx
import { FaStar, FaRegStar } from 'react-icons/fa';

type Props = {
  rating: number;
  reviews: number;
};

const StarRating = ({ rating, reviews }: Props) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, index) => {
          const starNumber = index + 1;
          return starNumber <= fullStars ? (
            <FaStar key={index} className="text-yellow-400" />
          ) : (
            <FaRegStar key={index} className="text-yellow-400" />
          );
        })}
      </div>
      {/* Only show review count if it's greater than 0 */}
      {reviews > 0 && (
        <span className="text-xs text-gray-500">({reviews})</span>
      )}
    </div>
  );
};

export default StarRating;