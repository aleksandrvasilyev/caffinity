import React from "react";
import PropTypes from "prop-types";
import PinIcon from "../Icons/PinIcon";

const CafeCard = ({ cafe }) => {
  const fullStars = Math.floor(cafe.rating);
  const halfStars = cafe.rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - (fullStars + halfStars);

  return (
    <div className="bg-white rounded-3xl border border-text hover:shadow-lg transition-shadow duration-300">
      <img
        src={`https://hyf-cohort-49-group-c.s3.eu-north-1.amazonaws.com/cafes/cafes/${cafe.photos[0]}`}
        alt={cafe.title}
        className="w-full h-48 object-cover rounded-t-3xl"
      />
      <div className="p-6 flex flex-col justify-center items-start">
        <h3 className="text-lg text-text font-semibold mb-2">{cafe.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{cafe.description}</p>
        <div className="flex items-center mb-2">
          {[...Array(fullStars)].map((_, index) => (
            <svg
              key={`full-${index}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-4 h-4 text-text"
              viewBox="0 0 20 20"
              stroke="currentColor"
              alt="full star"
            >
              <path
                fillRule="evenodd"
                d="M10 15.27l4.15 2.18-1.58-5.43L18 7.24l-5.48-.44L10 2 7.48 6.8 2 7.24l4.43 4.78-1.58 5.43L10 15.27z"
                clipRule="evenodd"
              />
            </svg>
          ))}

          {halfStars > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-4 h-4 text-text"
              viewBox="0 0 20 20"
              stroke="currentColor"
              alt="half star"
            >
              <path
                fillRule="evenodd"
                d="M10 15.27l4.15 2.18-1.58-5.43L18 7.24l-5.48-.44L10 2 7.48 6.8 2 7.24l4.43 4.78-1.58 5.43L10 15.27z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {[...Array(emptyStars)].map((_, index) => (
            <svg
              key={`empty-${index}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 text-gray-300"
              viewBox="0 0 20 20"
              strokeWidth="2"
              alt="empty star"
            >
              <path
                fillRule="evenodd"
                d="M10 15.27l4.15 2.18-1.58-5.43L18 7.24l-5.48-.44L10 2 7.48 6.8 2 7.24l4.43 4.78-1.58 5.43L10 15.27z"
                clipRule="evenodd"
              />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({cafe.numReviews} reviews)
          </span>
        </div>

        <p className="text-sm text-text flex flex-row justify-start items-center">
          <PinIcon />
          {cafe.address}
        </p>
      </div>
    </div>
  );
};

CafeCard.propTypes = {
  cafe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default CafeCard;
