import React from "react";
import PropTypes from "prop-types";

// List of utilities that can be filtered, later to be fetched from the server when the app loads to make it dynamic or hardcoded like this.

const utilities = [
  "Indoor-seating",
  "Outdoor-seating",
  "Wifi",
  "Wheelchair-accessible",
  "Budget-friendly",
  "Parking",
  "Delivery",
  "Cozy-atmosphere",
  "Non-smoking-area",
  "Family-friendly",
  "Pet-friendly",
  "Charging-stations",
  "Terrace",
  "Smoking-area",
  "Playground",
  "Live-music",
  "Board-games",
];

const FilterDropdown = ({ onFilterChange, selectedFilters }) => {
  const handleCheckboxChange = (e) => {
    let newFilters;
    if (e.target.checked) {
      newFilters = [...selectedFilters, e.target.value];
    } else {
      newFilters = selectedFilters.filter(
        (utility) => utility !== e.target.value,
      );
    }
    onFilterChange(newFilters);
  };

  return (
    <div className="absolute top-13 right-0">
      <ul className="bg-primary text-white rounded-lg p-4 flex flex-col w-60 my-6 space-y-3 h-[200px] overflow-y-scroll">
        {utilities.map((utility) => (
          <li key={utility} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={utility}
              name={utility}
              value={utility}
              checked={selectedFilters.includes(utility)}
              onChange={handleCheckboxChange}
              className="w-4 h-4 accent-[#722231]"
            />
            <label htmlFor={utility} className="cursor-pointer">
              {utility}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

FilterDropdown.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FilterDropdown;
