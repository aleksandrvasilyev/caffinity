import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PinIcon from "../Icons/PinIcon";
import StarRating from "../StarRating/StarRating";
import { useNavigate } from "react-router-dom";
import HeartCardIcon from "../Icons/HeartCafeCardIcon";
import useFetch from "../../hooks/useFetch/useFetch";

const getTokenFromCookies = () => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return match ? match.split("=")[1] : null;
};

const CafeCard = ({ cafe, isFavorite, onFavoriteToggle }) => {
  const [isFav, setIsFav] = useState(isFavorite);
  const [errorMessage, setErrorMessage] = useState(null);
  const imageUrl =
    cafe.photos.length > 0
      ? `${process.env.BASE_IMAGE_URL || ""}${cafe.photos[0]}`
      : "/placeholder-image.jpg";
  const navigate = useNavigate();

  const { performFetch, error } = useFetch("/favorites", (data) => {
    if (data.success) {
      setIsFav(!isFav);
      if (onFavoriteToggle) {
        onFavoriteToggle(cafe._id, !isFav);
      }
    }
  });

  useEffect(() => {
    if (error) {
      setErrorMessage("Failed to update favorite status. Please try again.");
    }
  }, [error]);

  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  const handleHeartClick = async (e) => {
    e.stopPropagation();

    const token = getTokenFromCookies();

    if (!token) {
      setErrorMessage("Please log in to favorite cafes.");
      return;
    }

    const newIsFav = !isFav;
    setIsFav(newIsFav);

    if (!cafe._id) {
      setErrorMessage("Cafe ID is missing. Cannot update favorite status.");
      return;
    }

    const method = newIsFav ? "POST" : "DELETE";

    performFetch({
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cafeId: cafe._id }),
    });
  };

  return (
    <div
      className="bg-white rounded-3xl border border-text hover:shadow-lg transition-shadow duration-300 mx-[1%] my-4 w-[250px] h-[430px] sm:w-[270px] sm:h-[430px] sm:mx-auto md:w-[300px] md:h-[400px] md:mx-[1%] lg:w-[400px] cursor-pointer"
      onClick={() => navigate(`/cafe/${cafe._id}`)}
    >
      <div className="relative">
        <HeartCardIcon
          onClick={handleHeartClick}
          isActive={isFav}
          className="absolute top-2 right-2 z-10"
        />
        <img
          src={imageUrl}
          alt={cafe.title}
          className="w-full h-48 object-cover rounded-t-3xl"
        />
      </div>

      <div className="p-6 flex flex-col justify-center items-start">
        {errorMessage && (
          <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
        )}
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
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default CafeCard;
