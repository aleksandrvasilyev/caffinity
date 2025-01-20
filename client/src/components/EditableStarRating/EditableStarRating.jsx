import React from "react";
import PropTypes from "prop-types";
import EmptyStarIcon from "../Icons/EmptyStarIcon";

const EditableStarRating = ({ rating, onRatingChange, isEditable }) => {
  const handleStarClick = (newRating) => {
    if (isEditable && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        const isFull = starIndex <= rating;

        return (
          <EmptyStarIcon
            key={index}
            onClick={() => handleStarClick(starIndex)}
            className={isEditable ? "cursor-pointer" : ""}
            style={{
              fill: isFull ? "currentColor" : "none",
              stroke: "currentColor",
            }}
          />
        );
      })}
    </div>
  );
};

EditableStarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
};

EditableStarRating.defaultProps = {
  isEditable: false,
};

export default EditableStarRating;
