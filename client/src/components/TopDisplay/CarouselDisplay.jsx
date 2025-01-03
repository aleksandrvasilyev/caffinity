import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "./custom-swiper.css";

const CarouselDisplay = ({ results }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      navigation
      modules={[Navigation]}
      className="w-[80%] mx-auto"
    >
      <div className="w-[80%] mx-auto flex flex-row gap-4">
        {results.map((item) => (
          <SwiperSlide
            key={item._id}
            className="flex flex-col w-full h-[50%] border-solid border-2 border-black p-4 rounded-lg"
          >
            <div className="w-[100%] h-96">
              <img
                src={
                  `https://hyf-cohort-49-group-c.s3.eu-north-1.amazonaws.com/cafes/cafes/${item.photos[0]}` ||
                  "https://via.placeholder.com/300"
                }
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-xl">{item.title}</div>
              <div className="text-sm">{item.description}</div>
              <div className="text-sm">{item.rating}</div>
            </div>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
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
