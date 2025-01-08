import React from "react";
import PropTypes from "prop-types";

const Input = ({ placeholder, type, name, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      className="w-full p-3 rounded text-black mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
