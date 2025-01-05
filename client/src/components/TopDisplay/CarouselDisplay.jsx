import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import "./custom-swiper.css";
import CafeCard from "../CafeCard/CafeCard";

const CarouselDisplay = ({ results }) => {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView="auto"
        loop={true}
        autoplay={{
          delay: 3000, // Delay between slide transitions (in ms)
          disableOnInteraction: false, // Allow autoplay even after user interaction
          pauseOnMouseEnter: true, // Pause autoplay when user hovers over the slider
        }}
        className="w-[80%] mx-auto"
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          // Show only 1 slide on screens smaller than 600px
          0: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },

          1496: {
            slidesPerView: 3,
          },
        }}
      >
        <div className="w-[90%] mx-auto flex flex-row ">
          {results.map((item) => (
            <SwiperSlide
              key={item._id}
              className="flex flex-col w-full h-[50%] mt-[6%] mb-[10%]"
            >
              <CafeCard cafe={item} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
};

CarouselDisplay.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CarouselDisplay;
