import React from "react";
import PropTypes from "prop-types";

const EmptyStarIcon = ({ className, style, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    className={className}
    style={style}
    onClick={onClick}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

EmptyStarIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

EmptyStarIcon.defaultProps = {
  className: "",
  style: {},
  onClick: undefined,
};

export default EmptyStarIcon;
