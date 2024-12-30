import React from "react";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded focus:outline-none transition-all ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
