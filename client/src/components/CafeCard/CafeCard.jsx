import React from "react";
import PropTypes from "prop-types";
import PinIcon from "../Icons/PinIcon";
import StarRating from "../StarRating/StarRating";

const CafeCard = ({ cafe }) => {
  const imageUrl = `${process.env.BASE_IMAGE_URL}${cafe.photos[0]}`;

  return (
    <div className="bg-white rounded-3xl border border-text hover:shadow-lg transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={cafe.title}
        className="w-full h-48 object-cover rounded-t-3xl"
      />

      <div className="p-6 flex flex-col justify-center items-start">
        <h3 className="text-lg text-text font-semibold mb-2">{cafe.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{cafe.description}</p>

        <StarRating rating={cafe.rating} numReviews={cafe.numReviews} />

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
