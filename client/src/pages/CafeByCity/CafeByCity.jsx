import React, { useState, useEffect } from "react";
import CafeCard from "../../components/CafeCard/CafeCard";
import Pagination from "../../components/Pagination/Pagination";
import { useLocation } from "react-router-dom";

const CafeByCity = () => {
  const location = useLocation();
  const [error, setError] = useState(location.state?.error || null);
  const [isLoading, setIsLoading] = useState(
    location.state?.isLoading || false,
  );
  const [cafes, setCafes] = useState(location.state?.cafes?.data || []);
  const [totalPages, setTotalPages] = useState(
    location.state?.cafes?.totalPages || 1,
  );
  const [currentPage, setCurrentPage] = useState(
    location.state?.currentPage || 1,
  );
  const city = location.state?.city;

  const fetchCafes = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/cafes?city=${city}&page=${page}&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setCafes(data.result.data);
        setTotalPages(data.result.totalPages);
      } else {
        setError("Failed to fetch cafes.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchCafes(newPage);
  };

  useEffect(() => {
    if (!cafes.length && city) {
      fetchCafes(currentPage); // Fetch only if no cafes are preloaded
    }
  }, [city, cafes.length, currentPage]);

  return (
    <div>
      <div className="flex flex-wrap justify-start mx-auto">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {cafes.map((cafe) => (
          <CafeCard key={cafe._id} cafe={cafe} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CafeByCity;
