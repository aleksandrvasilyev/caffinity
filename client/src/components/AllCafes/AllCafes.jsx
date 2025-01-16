import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import CafeCard from "../CafeCard/CafeCard";
import Pagination from "../Pagination/Pagination";

const AllCafes = () => {
  const [cafes, setCafes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, performFetch } = useFetch("/cafes", setCafes);

  useEffect(() => {
    performFetch({ method: "GET", params: { page: currentPage, limit: 10 } });
  }, [currentPage]);

  const results = Array.isArray(cafes?.result?.data) ? cafes.result.data : [];

  return (
    <div>
      {isLoading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center text-red-500">
          Failed to fetch cafes: {error.message}
        </div>
      )}
      <div>
        {!isLoading && !error && results.length > 0 && (
          <div className="flex  flex-row flex-wrap justify-center items-center gap-4  ">
            {results.map((item) => (
              <CafeCard cafe={item} key={item._id} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        totalPages={cafes?.result?.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllCafes;
