import React from "react";
import PropTypes from "prop-types";
import PinIcon from "../Icons/PinIcon";
import StarRating from "../StarRating/StarRating";
import { useNavigate } from "react-router-dom";

const CafeCard = ({ cafe }) => {
  const imageUrl = `https://hyf-cohort-49-group-c.s3.eu-north-1.amazonaws.com/cafes/cafes/${cafe.photos[0]}`;
  const navigate = useNavigate();

  return (
    // added some fixed height and width for the card to make it look even in carousel and catalog page
    <div
      className="bg-white rounded-3xl border border-text hover:shadow-lg transition-shadow duration-300 mx-[1%] my-4 w-[250px] h-[430px] sm:w-[270px] sm:h-[430px] sm:mx-auto md:w-[300px] md:h-[400px] md:mx-[1%] lg:w-[400px] cursor-pointer"
      onClick={() => navigate(`/cafe/${cafe._id}`)}
    >
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
