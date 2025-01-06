import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../Icons/SearchIcon";
import Filters from "../Filter/Filters";
import useFetch from "../../hooks/useFetch";
import SearchResultsList from "./SearchResultsList";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const [searchResults, setSearchResults] = useState(null);
  const { isLoading, error, performFetch } = useFetch("/cafes", (response) => {
    setSearchResults(response.result.data || []);
    setIsSearchOpen(true);
  });

  //eslint-disable-next-line no-unused-vars
  const [selectedFilters, setSelectedFilters] = useState([]);

  // to close the search results when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setSearchResults(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      performFetch({
        method: "GET",
        search: searchQuery,
      });
    }
  };

  return (
    <div ref={searchContainerRef} className="relative mx-10 my-10">
      <div className=" relative bg-white px-6 py-4 mx-10 my-10 border-2 rounded-full flex sm:justify-center sm:items-center flex-row h-50 border-black sm:flex-row justify-end items-end">
        <input
          className="h-[30%] px-3 pb-2 rounded-full w-[100%] focus:outline-none hover:none pl-10 text-text text-ellipsis bg-transparent "
          type="text"
          placeholder="Search for cafes by name, city, or features"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
          onFocus={() => setIsSearchOpen(true)}
        />

        <button onClick={handleSearchClick} aria-label="search">
          <span>
            <SearchIcon aria-hidden="true" />
          </span>
        </button>

        <div>
          <Filters onFilterChange={setSelectedFilters} />
        </div>
      </div>

      {isLoading && <div> Loading...</div>}
      {error && (
        <div className=" px-auto py-6 text-lg">
          Error: {error.message || "Something went wrong"}
        </div>
      )}

      {searchResults &&
        isSearchOpen &&
        !isLoading &&
        (searchResults.length > 0 ? (
          <div className="absolute top-[50%] w-[70%] z-50 mt-2 mx-[10%]">
            <SearchResultsList searchResults={searchResults} />
          </div>
        ) : (
          <p className="p-4 text-black border-2 border-black mt-2 w-[30%] mx-auto">
            No results found
          </p>
        ))}
    </div>
  );
};

export default SearchBar;
