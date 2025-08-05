import { useState, useEffect } from 'react';
import Star from './Star';

const Rating = ({ initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 sm:gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= rating}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
      <span className="text-xs sm:text-sm text-gray-500 text-center">
        {rating ? `Your rating: ${rating}/5` : 'Rate this post'}
      </span>
    </div>
  );
};

export default Rating;
