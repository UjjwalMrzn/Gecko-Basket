// src/components/ui/StarRating.tsx
import { Star } from 'lucide-react';

type Props = {
  rating: number;
  reviews?: number;
};

const StarRating = ({ rating = 0, reviews }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
      {typeof reviews === 'number' && (
        <span className="text-xs text-gray-500">({reviews})</span>
      )}
    </div>
  );
};

export default StarRating;