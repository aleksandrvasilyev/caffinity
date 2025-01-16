import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../Icons/SearchIcon";
import Filters from "../Filter/Filters";
import useFetch from "../../hooks/useFetch/useFetch";
import SearchResultsList from "./SearchResultsList";
import CityFilter from "./CityFilter";
import background from "../../../public/background.jpg";
import amsterdam from "../../../public/amsterdam.jpg";
import denHaag from "../../../public/denhaag.jpg";
import rotterdam from "../../../public/rotterdam.jpg";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(false);
  const { isLoading, error, performFetch } = useFetch("/cafes", (response) => {
    setSearchResults(response.result.data || []);
    setIsSearchOpen(true);
  });

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
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (
      normalizedQuery === "amsterdam" ||
      normalizedQuery === "den haag" ||
      normalizedQuery === "rotterdam"
    ) {
      performFetch({
        method: "GET",
        city: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
        utilities: selectedFilters.join(","),
      });
    } else if (searchQuery.trim()) {
      performFetch({
        method: "GET",
        search: searchQuery,
        utilities: selectedFilters.join(","),
      });
    } else if (searchQuery.trim() === "") {
      performFetch({
        method: "GET",
        utilities: selectedFilters.join(","),
      });
    }
  };

  const backgroundImages = {
    amsterdam: amsterdam,
    denHaag: denHaag,
    rotterdam: rotterdam,
    default: background,
  };

  const currentBackground = hoveredCity
    ? backgroundImages[hoveredCity]
    : backgroundImages.default;

  return (
    <div
      className="relative h-[700px] transition-all duration-1000"
      style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
        <div className="w-full max-w-2xl px-4">
          <div className="relative bg-white bg-opacity-80 p-6 rounded-full border-2 border-black">
            <div className="flex flex-row items-center space-x-4">
              <input
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-text placeholder:text-gray-600"
                type="text"
                placeholder="Search for cafes by name, city, or just select a filter"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
                onFocus={() => setIsSearchOpen(true)}
              />

              <button
                onClick={handleSearchClick}
                aria-label="search"
                className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <SearchIcon aria-hidden="true" />
              </button>

              <div className="flex-shrink-0 w-auto sm:w-12 md:w-auto">
                <Filters onFilterChange={setSelectedFilters} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-2xl px-4">
          <CityFilter
            onMouseEnter={(city) => setHoveredCity(city)}
            onMouseLeave={() => setHoveredCity(null)}
          />
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
          <div
            className="relative  top-[37%] w-full z-50 mt-4 rounded-lg"
            ref={searchContainerRef}
          >
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
