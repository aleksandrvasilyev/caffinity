import React, { useEffect } from "react";
import CafeCard from "../../components/CafeCard/CafeCard";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  const { isLoading, error, performFetch } = useFetch(
    "/cafes?limit=5&page=1",
    (response) => setCafes(response.result.data),
  );

  const [cafes, setCafes] = React.useState([]);

  useEffect(() => {
    performFetch();

    return () => performFetch.cancelFetch?.();
  }, []);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl m-2 font-bold mb-4 text-center">
        Top Rated Cafes
      </h1>
      {isLoading ? (
        <p className="text-center">Loading cafes...</p>
      ) : error ? (
        <p className="text-red-500 text-center">
          {error || "An unexpected error occurred."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cafes.map((cafe) => (
            <CafeCard key={cafe._id} cafe={cafe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
