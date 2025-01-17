import React from "react";
import PropTypes from "prop-types";
import FullStarIcon from "../Icons/FullStarIcon";
import EmptyStarIcon from "../Icons/EmptyStarIcon";

const EditableStarRating = ({ rating, onRatingChange, isEditable }) => {
  const handleStarClick = (index) => {
    if (isEditable && onRatingChange) {
      onRatingChange(index);
    }
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1;
        return (
          <span key={index}>
            {rating >= starIndex ? (
              <FullStarIcon onClick={() => handleStarClick(starIndex)} />
            ) : (
              <EmptyStarIcon onClick={() => handleStarClick(starIndex)} />
            )}
          </span>
        );
      })}
    </div>
  );
};

EditableStarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func,
  isEditable: PropTypes.bool.isRequired,
};

EditableStarRating.defaultProps = {
  isEditable: false,
  onRatingChange: null,
};

export default EditableStarRating;
