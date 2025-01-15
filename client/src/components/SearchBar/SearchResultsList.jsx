import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SearchResultsList = ({ searchResults }) => {
  const navigate = useNavigate();

  return (
    <ul className=" bg-white rounded-md border-solid border-2 border-black flex flex-col  my-6 space-y-3 h-[400px] overflow-y-scroll ">
      {searchResults.map((result) => (
        <li
          key={result._id}
          className="text-black border-b-2 py-8 px-4 border-black bg-white hover:bg-stone-200 cursor-pointer "
          onClick={() => navigate(`/cafe/${result._id}`)}
        >
          <p>{result.title}</p>
        </li>
      ))}
    </ul>
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
