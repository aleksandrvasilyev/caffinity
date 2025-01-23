import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import CafeCard from "../CafeCard/CafeCard";
import Pagination from "../Pagination/Pagination";
import FilterButtons from "../FilterButtons/FilterButtons";

const AllCafes = () => {
  const [cafes, setCafes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, performFetch } = useFetch("/cafes", setCafes);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const fetchCafes = (page, filter) => {
    const queryParams = {
      method: "GET",
      params: {
        page: page,
        limit: 10,
      },
    };

    if (filter !== null) {
      queryParams["food-options"] = filter;
    }

    performFetch(queryParams);
  };

  useEffect(() => {
    fetchCafes(currentPage, selectedFilter);
  }, [currentPage, selectedFilter]);

  const results = Array.isArray(cafes?.result?.data)
    ? cafes.result.data
    : Array.isArray(cafes?.data)
      ? cafes.data
      : [];

  const totalPages = cafes?.result?.totalPages || cafes?.totalPages || 1;

  const onFilterSelection = (filter) => {
    setSelectedFilter(filter.index);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage) setCurrentPage(newPage);
  };

  const handleFavoriteToggle = async (cafeId, newIsFav) => {
    const updatedFavorites = newIsFav
      ? [...favorites, cafeId]
      : favorites.filter((id) => id !== cafeId);

    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <div className="mx-auto my-10 max-w-screen-md">
        <p className="text-xl font-semibold text-center my-2">
          Looking for a particular food option ?
        </p>
        <FilterButtons onFilterSelection={onFilterSelection} />
      </div>
      {isLoading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center text-red-500">
          Failed to fetch cafes: {error.message}
        </div>
      )}
      <div>
        {!isLoading && !error && results.length > 0 && (
          <div className="flex flex-row flex-wrap justify-center items-center gap-4">
            {results.map((item) => (
              <CafeCard
                cafe={item}
                key={item._id}
                isFavorite={favorites.includes(item._id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllCafes;
