import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "../../components/TopDisplay/custom-swiper.css";
import useFetch from "../../hooks/useFetch";
import StarRating from "../../components/StarRating/StarRating";
import PinIcon from "../../components/Icons/PinIcon";
import utilityIcons from "../../constants/utilityIcons";
import foodOptionIcons from "../../constants/foodOptionIcons";

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

  return (
    <div className="container mx-auto p-4 grid gap-6">
      <div className="grid gap-6">{renderPhotos()}</div>
      <div className="grid gap-4 text-left">
        <h1 className="text-2xl font-semibold">{cafe.title || "Cafe Name"}</h1>
        <p className="text-gray-600">
          {cafe.description || "No description available."}
        </p>
        {cafe.rating && (
          <StarRating rating={cafe.rating} numReviews={cafe.numReviews || 0} />
        )}
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
      </div>
    </div>
  );
};

export default Cafe;
