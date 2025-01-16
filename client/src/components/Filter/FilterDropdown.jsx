import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch/useFetch";

const FilterDropdown = ({ onFilterChange, selectedFilters }) => {
  const [utilities, setUtilities] = useState([]);

  const { performFetch } = useFetch("/utilities", (data) => {
    setUtilities(data.result);
  });

  useEffect(() => {
    performFetch();
  }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    let newFilters;

    if (e.target.checked) {
      newFilters = selectedFilters.includes(value)
        ? selectedFilters
        : [...selectedFilters, value];
    } else {
      newFilters = selectedFilters.filter((utility) => utility !== value);
    }
    onFilterChange(newFilters);
  };

  return (
    <div className="absolute top-13 right-0">
      <ul className="bg-primary text-white rounded-lg p-4 flex flex-col w-60 my-6 space-y-3 h-[200px] overflow-y-scroll">
        {utilities.map((utility) => (
          <li key={utility.index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={utility.index}
              name={utility.index}
              value={utility.index.toString()}
              checked={selectedFilters.includes(utility.index.toString())}
              onChange={handleCheckboxChange}
              className="w-4 h-4 accent-[#722231]"
            />
            <label htmlFor={utility.index} className="cursor-pointer">
              {utility.value.charAt(0).toUpperCase() + utility.value.slice(1)}
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
