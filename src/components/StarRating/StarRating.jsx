import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, reviews }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0; // Not used here, but easy to add a half-star icon

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
      <span>({reviews})</span>
    </div>
  );
};

export default StarRating;