import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../Icons/SearchIcon";
import Filters from "../Filter/Filters";
import useFetch from "../../hooks/useFetch/useFetch";
import SearchResultsList from "./SearchResultsList";
import CityFilter from "./CityFilter";
import background from "../../../public/background-min.jpg";
import amsterdam from "../../../public/amsterdam-center-min.jpg";
import denHaag from "../../../public/denhaag-min.jpg";
import rotterdam from "../../../public/rotterdam-min.jpg";
import ReloadIcon from "../Icons/ReloadIcon";
import Button from "../Button/Button";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [hoveredCity, setHoveredCity] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
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

  // Hide feedback after 2 seconds
  useEffect(() => {
    if (isFeedbackVisible) {
      const timeout = setTimeout(() => {
        setIsFeedbackVisible(false);
      }, 1500);
      return () => clearTimeout(timeout); // cleanup
    }
  }, [isFeedbackVisible]);

  const handleSearchClick = () => {
    const utilities = selectedFilters
      .map((filter) => JSON.parse(filter))
      .filter((item) => item.type === "utility")
      .map((item) => item.value);

    const foodOptions = selectedFilters
      .map((filter) => JSON.parse(filter))
      .filter((item) => item.type === "food-option")
      .map((item) => item.value);

    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (
      normalizedQuery === "amsterdam" ||
      normalizedQuery === "den haag" ||
      normalizedQuery === "rotterdam"
    ) {
      performFetch({
        method: "GET",
        city: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
        utilities: utilities.join(","),
        ["food-option"]: foodOptions.join(","),
      });
    } else if (searchQuery.trim()) {
      performFetch({
        method: "GET",
        search: searchQuery,
        utilities: utilities.join(","),
        ["food-options"]: foodOptions.join(","),
      });
    } else if (searchQuery.trim() === "") {
      performFetch({
        method: "GET",
        utilities: utilities.join(","),
        ["food-options"]: foodOptions.join(","),
      });
    }

    if (!searchResults || searchResults.length === 0) {
      setIsFeedbackVisible(true);
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
          <div className="text-white text-center text-xl sm:text-2xl p-4 m-6 font-bold">
            <p> Find the perfect cafe near you </p> <br />
            <p>search now and discover your next favorite spot</p>
          </div>
          <div className="relative bg-white bg-opacity-80 p-6 rounded-full border-2 border-black">
            <div className="flex flex-wrap items-center space-x-4 w-full">
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
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <SearchIcon aria-hidden="true" />
              </button>

              <div className="w-auto">
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

      {isLoading || error ? (
        <div className="absolute inset-0 flex  flex-col items-center justify-center bg-black bg-opacity-50 text-white text-2xl text-center">
          {isLoading && <div> Loading...</div>}
          {error && (
            <div className="px-auto py-6 text-lg flex flex-col items-center justify-center">
              Error: {error.message || "Something went wrong"}
              <Button
                className="mx-2 border-2 border-white mt-4"
                onClick={() => {
                  window.location.reload();
                }}
              >
                <ReloadIcon />
              </Button>
            </div>
          )}
        </div>
      ) : null}

      {searchResults &&
        isSearchOpen &&
        !isLoading &&
        (searchResults.length > 0 ? (
          <div
            className="absolute top-[29%] w-full z-50 rounded-lg sm:top-[33%] "
            ref={searchContainerRef}
          >
            <SearchResultsList searchResults={searchResults} />
          </div>
        ) : (
          isFeedbackVisible && (
            <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto px-4 py-2 bg-white text-black text-lg text-center shadow-lg rounded">
              No results found
            </p>
          )
        ))}
    </div>
  );
};

export default SearchBar;
