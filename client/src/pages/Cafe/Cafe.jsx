import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "../../components/TopDisplay/custom-swiper.css";
import useFetch from "../../hooks/useFetch/useFetch";
import EditableStarRating from "../../components/EditableStarRating/EditableStarRating";
import PinIcon from "../../components/Icons/PinIcon";
import utilityIcons from "../../constants/utilityIcons";
import foodOptionIcons from "../../constants/foodOptionIcons";
import UserDefaultIcon from "../../components/Icons/UserDefaultIcon";
import Button from "../../components/Button/Button";
import WriteIcon from "../../components/Icons/WriteIcon";
import useAuth from "../../hooks/useAuth/useAuth";
import StarRating from "../../components/StarRating/StarRating";

const getTokenFromCookies = () => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return match ? match.split("=")[1] : null;
};

const Cafe = () => {
  const { id: cafeId } = useParams();
  const [cafe, setCafe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const { isAuthenticated } = useAuth();
  const { isLoading, error, performFetch } = useFetch(
    `/cafes/${cafeId}`,
    (data) => setCafe(data.result?.[0] || null),
  );

  useEffect(() => {
    performFetch({ method: "GET" });
  }, [cafeId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const showMessage = (message, type) => {
    setMessageModal({ isOpen: true, message, type });
    setTimeout(
      () => setMessageModal({ isOpen: false, message: "", type: "" }),
      3000,
    );
  };

  const handleReviewSubmit = async () => {
    if (!isAuthenticated) {
      showMessage("You need to be logged in to submit a review.", "error");
      return;
    }

    if (!reviewText || rating === 0) {
      showMessage("Please provide both a review and a rating.", "error");
      return;
    }

    try {
      const token = getTokenFromCookies();
      if (!token) throw new Error("Authentication token not found");

      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cafeId,
            review: reviewText,
            rating,
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to submit review");
      }

      showMessage("Review submitted successfully", "success");
      closeModal();
      setReviewText("");
      setRating(0);
      performFetch({ method: "GET" });
    } catch (error) {
      showMessage(
        error.message || "Error submitting review. Please try again.",
        "error",
      );
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Failed to fetch cafe: {error.message}
      </div>
    );

  if (!cafe)
    return <div className="text-center">Cafe details not available.</div>;

  const renderPhotos = () => {
    const photos = cafe.photos || [];
    if (photos.length >= 4) {
      return (
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 20000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          navigation={true}
          modules={[Pagination, Autoplay, Navigation]}
          className="w-full cafe-swiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            1024: { slidesPerView: Math.min(photos.length, 3) },
          }}
        >
          {photos.map((photo, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center slide"
            >
              <img
                src={`${process.env.BASE_IMAGE_URL}${photo}`}
                alt={`Cafe photo ${index + 1}`}
                className="rounded-lg shadow-lg object-cover transition-all duration-300 ease-in-out"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    const gridCols = photos.length === 2 ? "grid-cols-2" : "grid-cols-3";

    return (
      <div className={`grid ${gridCols} gap-4 w-full`}>
        {photos.map((photo, index) => (
          <img
            key={index}
            src={`${process.env.BASE_IMAGE_URL}${photo}`}
            alt={`Cafe photo ${index + 1}`}
            className="rounded-lg shadow-lg object-cover w-full h-64"
          />
        ))}
      </div>
    );
  };

  const renderReviews = () => {
    const reviews = cafe.reviews || [];
    if (reviews.length === 0) {
      return (
        <p className="text-gray-600">No reviews available for this cafe.</p>
      );
    }

    return (
      <div className="reviews-section">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 bg-gray-50 border rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4 mb-2">
                <UserDefaultIcon />
                <div>
                  <p className="font-semibold">{review.user?.username}</p>
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="text-gray-700">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="container my-8 mx-auto p-4 grid gap-6">
      {messageModal.isOpen && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-md shadow-md text-white ${
            messageModal.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {messageModal.message}
        </div>
      )}
      <div className="grid gap-6">{renderPhotos()}</div>
      <div className="grid gap-4 text-left">
        <h1 className="text-2xl font-semibold">{cafe.title || "Cafe Name"}</h1>
        <p className="text-gray-600">
          {cafe.description || "No description available."}
        </p>
        {cafe.rating && <StarRating rating={cafe.rating} />}
        <p className="text-text flex items-center gap-2">
          <PinIcon />
          {cafe.address || "No address provided"}
          {cafe.address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                cafe.address,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View on Google Maps
            </a>
          )}
        </p>
        <div className="flex flex-wrap gap-4">
          {cafe.utilitiesDetails.map((utility) => {
            const IconComponent = utilityIcons[utility.value];
            return (
              <div
                key={utility._id}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 "
              >
                {IconComponent && (
                  <span className="text-gray-700">
                    <IconComponent />
                  </span>
                )}
                <span className="text-sm text-gray-600">{utility.value}</span>
              </div>
            );
          })}

          {cafe.foodoptions.map((option) => {
            const IconComponent = foodOptionIcons[option.value];
            return (
              <div
                key={option._id}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 "
              >
                {IconComponent && (
                  <span className="text-gray-700">
                    <IconComponent />
                  </span>
                )}
                <span className="text-sm text-gray-600">{option.value}</span>
              </div>
            );
          })}
        </div>

        {isAuthenticated ? (
          <Button
            className="bg-primary w-40 flex flex-row items-center justify-center gap-1 text-text text-sm rounded-3xl hover:bg-background border-primary border"
            onClick={openModal}
          >
            <WriteIcon /> Write a Review
          </Button>
        ) : (
          <Button
            className="bg-gray-500 w-40 flex flex-row items-center justify-center gap-1 text-text text-sm rounded-3xl hover:bg-background border-primary border"
            disabled
          >
            <WriteIcon /> Write a Review
          </Button>
        )}

        {renderReviews()}

        {isModalOpen && (
          <div className="fixed z-50 inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md shadow-md w-96">
              <h2 className="text-xl  font-semibold mb-4">Write a Review</h2>
              <textarea
                className="w-full p-4 border rounded-md mb-4"
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />

              <EditableStarRating
                rating={rating}
                onRatingChange={setRating}
                isEditable={true}
              />

              <div className="flex gap-4 mt-4">
                <Button
                  className="px-4 py-2  rounded-3xl bg-accent text-white "
                  onClick={handleReviewSubmit}
                >
                  Submit
                </Button>
                <Button
                  className="px-4 py-2 rounded-3xl bg-gray-400 text-white"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cafe;
