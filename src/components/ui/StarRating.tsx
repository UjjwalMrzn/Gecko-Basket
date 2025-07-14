import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
  rating: number;
  reviews: number;
};

const StarRating = ({ rating, reviews }: Props) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex">
        {[...Array(totalStars)].map((_, i) =>
          i < fullStars ? (
            <FaStar key={i} className="text-yellow-400" />
          ) : (
            <FaRegStar key={i} className="text-yellow-400" />
          )
        )}
      </div>
      <span className="text-xs text-gray-500">({reviews})</span>
    </div>
  );
};

export default StarRating;
