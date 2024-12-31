import React from "react";
import PropTypes from "prop-types";
import FilterIcon from "../Icons/FilterIcon";
import { useState } from "react";
import FilterDropdown from "./FilterDropdown";

const Filters = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUtilities, setSelectedUtilities] = useState([]);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCheckboxChange = (filters) => {
    setSelectedUtilities(filters);
    onFilterChange(filters);
  };

  return (
    <div>
      <button
        className="bg-primary text-white px-4 py-2 rounded-full h-10 flex justify-center items-center "
        onClick={handleShowFilters}
        aria-label="filters"
      >
        <span className="mr-1" aria-hidden="true">
          Filters
        </span>
        <FilterIcon aria-hidden="true" />
      </button>
      {showFilters && (
        <FilterDropdown
          onFilterChange={handleCheckboxChange}
          selectedFilters={selectedUtilities}
        />
      )}
    </div>
  );
};
Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
