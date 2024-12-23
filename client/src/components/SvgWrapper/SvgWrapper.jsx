import React from "react";
import PropTypes from "prop-types";

const SvgWrapper = ({ children, className, size, ...props }) => {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
};

SvgWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SvgWrapper.defaultProps = {
  className: "",
  size: 30,
};

export default SvgWrapper;
