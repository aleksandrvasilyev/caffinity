import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch/useFetch";

const FilterDropdown = ({ onFilterChange, selectedFilters }) => {
  const [utilities, setUtilities] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const filterList = utilities.concat(foodOptions);

  const { performFetch: fetchUtilities } = useFetch("/utilities", (data) => {
    const updatedUtilities = data.result.map((item) => ({
      ...item,
      type: "utility",
      index: item.index.toString(),
    }));
    setUtilities(updatedUtilities);
  });

  const { performFetch: fetchFoodOptions } = useFetch(
    "/food-options",
    (data) => {
      const updatedFoodOptions = data.result.map((item) => ({
        ...item,
        type: "food-option",
        index: item.index.toString(),
      }));
      setFoodOptions(updatedFoodOptions);
    },
  );

  useEffect(() => {
    fetchUtilities();
    fetchFoodOptions();
  }, []);

  const handleCheckboxChange = (e, item) => {
    const newFilter = JSON.stringify({
      type: item.type,
      value: item.index,
    });

    let newFilters;
    if (e.target.checked) {
      newFilters = [...selectedFilters, newFilter];
    } else {
      newFilters = selectedFilters.filter((filter) => {
        const parsedFilter = JSON.parse(filter);
        const parsedNewFilter = JSON.parse(newFilter);
        return !(
          parsedFilter.type === parsedNewFilter.type &&
          parsedFilter.value === parsedNewFilter.value
        );
      });
    }

    onFilterChange(newFilters);
  };

  const isFilterSelected = (item) => {
    return selectedFilters.some((filter) => {
      const parsedFilter = JSON.parse(filter);
      const itemValue = item.index.toString();
      return (
        parsedFilter.type === item.type && parsedFilter.value === itemValue
      );
    });
  };

  return (
    <div className="absolute top-13 right-0">
      <ul className="bg-primary text-white rounded-lg p-4 flex flex-col w-60 my-6 space-y-3 h-[200px] overflow-y-scroll">
        {filterList.map((item) => (
          <li key={item.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={item.index}
              name={item.index}
              value={JSON.stringify({
                type: item.type,
                value: item.index.toString(),
              })}
              checked={isFilterSelected(item)}
              onChange={(e) => handleCheckboxChange(e, item)}
              className="w-4 h-4 accent-[#722231]"
            />
            <label htmlFor={item.index} className="cursor-pointer">
              {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
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
