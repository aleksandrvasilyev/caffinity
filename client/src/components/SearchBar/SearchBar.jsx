import React, { useState } from "react";
import SearchIcon from "../Icons/SearchIcon";
import Filters from "../Filter/Filters";
import useFetch from "../../hooks/useFetch";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  // searchResults is not used in this component it will be used in catalog page to display the search results.
  // eslint-disable-next-line no-unused-vars
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (data) => {
    setSearchResults(data);
  };

  const { isLoading, error, performFetch } = useFetch(
    "/search",
    handleSearchResults,
  );

  const handleSearch = () => {
    performFetch({
      method: "POST",
      body: JSON.stringify({
        query: searchQuery,
        filters: selectedFilters,
      }),
    });
  };

  return (
    <>
      <div className=" relative bg-white px-6 py-4 mx-10 my-10 border-2 rounded-full flex sm:justify-center sm:items-center flex-row h-50 border-black sm:flex-row justify-end items-end">
        {isLoading && <div> Loading...</div>}
        {error && (
          <div className=" px-auto py-6 text-lg">
            Error: {error.massage || "Something went wrong"}
          </div>
        )}

        <input
          className="h-[30%] px-3 pb-2 rounded-full w-[100%] focus:outline-none hover:none pl-10 text-text text-ellipsis bg-transparent "
          type="text"
          placeholder="Search for cafes by name, city, or features"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} aria-label="search">
          <span>
            <SearchIcon aria-hidden="true" />
          </span>
        </button>
        <div>
          <Filters onFilterChange={setSelectedFilters} />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
