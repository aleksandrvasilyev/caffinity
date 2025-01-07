import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "../../components/TopDisplay/custom-swiper.css";
import useFetch from "../../hooks/useFetch";
import StarRating from "../../components/StarRating/StarRating";
import PinIcon from "../../components/Icons/PinIcon";

const Cafe = () => {
  const { id: cafeId } = useParams();
  const [cafe, setCafe] = useState(null);
  const { isLoading, error, performFetch } = useFetch(
    `/cafes/${cafeId}`,
    (data) => setCafe(data.result?.[0] || null),
  );

  useEffect(() => {
    performFetch({ method: "GET" });
  }, [cafeId]);

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

    // If there are 4 or more photos, show the Swiper
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
                src={`https://hyf-cohort-49-group-c.s3.eu-north-1.amazonaws.com/cafes/cafes/${photo}`}
                alt={`Cafe photo ${index + 1}`}
                className="rounded-lg shadow-lg object-cover transition-all duration-300 ease-in-out"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    // If there are 2 or 3 photos, display them side-by-side and make them responsive
    return (
      <div className="flex justify-start gap-4 w-full">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={`https://hyf-cohort-49-group-c.s3.eu-north-1.amazonaws.com/cafes/cafes/${photo}`}
            alt={`Cafe photo ${index + 1}`}
            className="rounded-lg shadow-lg object-cover w-1/2 sm:w-1/3 md:w-1/4"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col p-6">
        {renderPhotos()}
        <div className="text-left w-full mt-6">
          <h1 className="text-2xl font-semibold">
            {cafe.title || "Cafe Name"}
          </h1>
          <p className="text-gray-600 mt-2">
            {cafe.description || "No description available."}
          </p>
          {cafe.rating && (
            <StarRating
              rating={cafe.rating}
              numReviews={cafe.numReviews || 0}
            />
          )}
          <p className="text-text flex flex-row justify-start items-center mt-2">
            <PinIcon />
            {cafe.address || "No address provided"}
            {cafe.address && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline ml-2"
              >
                View on Google Maps
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cafe;
