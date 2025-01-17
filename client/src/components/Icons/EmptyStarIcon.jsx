import React from "react";
import PropTypes from "prop-types";
const EmptyStarIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    className="w-4 h-4 text-gray-300"
    viewBox="0 0 20 20"
    strokeWidth="2"
    alt="empty star"
    onClick={onClick}
  >
    <path
      fillRule="evenodd"
      d="M10 15.27l4.15 2.18-1.58-5.43L18 7.24l-5.48-.44L10 2 7.48 6.8 2 7.24l4.43 4.78-1.58 5.43L10 15.27z"
      clipRule="evenodd"
    />
  </svg>
);
EmptyStarIcon.propTypes = {
  onClick: PropTypes.func,
};
export default EmptyStarIcon;
