// src/components/ui/StarRating.tsx
import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
  disabled?: boolean;
}

const StarRating = ({ rating, onRatingChange, size = 24, disabled = false }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className={`flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            onClick={() => !disabled && onRatingChange(starValue)}
            onMouseEnter={() => !disabled && setHover(starValue)}
            onMouseLeave={() => !disabled && setHover(0)}
            className="focus:outline-none bg-transparent border-none p-0.5"
            data-testid={`star-${starValue}`}
          >
            <Star
              size={size}
              className={`transition-colors duration-200 ${
                starValue <= (hover || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              fill={starValue <= (hover || rating) ? 'currentColor' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;