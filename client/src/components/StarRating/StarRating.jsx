import React from "react";
import PropTypes from "prop-types";
import FullStarIcon from "../Icons/FullStarIcon";
import HalfStarIcon from "../Icons/HalfStarIcon";
import EmptyStarIcon from "../Icons/EmptyStarIcon";

const StarRating = ({ rating, numReviews }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStars);

   // arrays with guaranteed non-negative lengths
   const fullStarsArray = Array.from({ length: fullStars });
   const emptyStarsArray = Array.from({ length: emptyStars });

  return (
    <div className="flex items-center mb-2">
      {fullStarsArray.map((_, index) => (
        <FullStarIcon key={`full-${index}`} />
      ))}

      {halfStars > 0 && <HalfStarIcon />}

      {emptyStarsArray.map((_, index) => (
        <EmptyStarIcon key={`empty-${index}`} />
      ))}

      <span className="ml-2 text-sm text-gray-600">{numReviews} </span>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
};

export default StarRating;
