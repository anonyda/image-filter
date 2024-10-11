import { useState } from 'react';
import './StarRating.css'; // CSS for star styling

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  return (
    <div className="review-container">
      <h3>Liked the filter? Please leave a review!</h3>

      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              className={starValue <= (hover || rating) ? 'on' : 'off'}
              onClick={() => handleRatingClick(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>

      <textarea
        className="review-input"
        placeholder="Write your review here..."
        value={review}
        onChange={handleReviewChange}
      />

      <div className="review-summary">
        <h4>Your Rating: {rating} stars</h4>
      </div>
    </div>
  );
};

export default StarRating;
