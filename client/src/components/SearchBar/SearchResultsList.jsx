import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SearchResultsList = ({ searchResults }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <ul className=" bg-white rounded-lg border-2 border-black shadow-lg divide-y divide-gray-200 my-6 max-h-[400px] overflow-y-auto">
        {searchResults.map((result) => (
          <li
            key={result._id}
            className="transition-colors duration-150 ease-in-out hover:bg-stone-100 hover:bg-stone-200 cursor-pointer p-4 "
            onClick={() => navigate(`/cafe/${result._id}`)}
          >
            <p>{result.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchResultsList.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SearchResultsList;
