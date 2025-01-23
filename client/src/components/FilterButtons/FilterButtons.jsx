import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import useFetch from "../../hooks/useFetch/useFetch";

const FilterButtons = ({ onFilterSelection }) => {
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { error, isLoading, performFetch } = useFetch(
    "/food-options",
    (data) => {
      setFilters(data.result);
    },
  );

  useEffect(() => {
    performFetch();
  }, []);

  const handleFilterSelection = (index, value) => {
    const selected = selectedFilter === index ? null : index;
    setSelectedFilter(selected);
    onFilterSelection({ index: selected, value });
  };

  return (
    <div className="mx-auto my-10 max-w-screen-md">
      <div className="flex  flex-row flex-wrap  justify-center space-x-2 mx-auto">
        {filters.map((filter) => (
          <Button
            key={filter.index}
            text={filter.value}
            className={`m-1 p-2 ${
              selectedFilter === filter.index
                ? "bg-accent text-white border-4 border-primary"
                : "bg-accent text-white"
            } font-normal ${
              selectedFilter !== null && selectedFilter !== filter.index
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleFilterSelection(filter.index, filter.value)}
            disabled={
              selectedFilter !== null && selectedFilter !== filter.index
            }
          >
            {filter.value.charAt(0).toUpperCase() + filter.value.slice(1)}
          </Button>
        ))}
      </div>

      <div className="text-center">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
FilterButtons.propTypes = {
  onFilterSelection: PropTypes.func.isRequired,
};

export default FilterButtons;
