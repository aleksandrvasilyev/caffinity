import React, { useEffect, useState } from "react";
import CafeCard from "../../components/CafeCard/CafeCard";
import useFetch from "../../hooks/useFetch/useFetch";

const getTokenFromCookies = () => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  return match ? match.split("=")[1] : null;
};

const Favorites = () => {
  const [cafes, setCafes] = useState([]);
  const { performFetch, isLoading, error } = useFetch(
    "/favorites",
    (data) => {
      if (data?.result) {
        setCafes(data.result);
      }
    },
    {
      headers: {
        Authorization: `Bearer ${getTokenFromCookies()}`,
      },
    },
  );

  useEffect(() => {
    const token = getTokenFromCookies();

    if (!token) {
      alert("You must be logged in to view your favorites.");
      return;
    }

    performFetch({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  if (isLoading) {
    return <div>Loading your favorite cafes...</div>;
  }

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Your Favorite Cafes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {cafes.length > 0 ? (
          cafes.map((cafe) => (
            <CafeCard
              key={cafe._id}
              cafe={cafe}
              isFavorite={true}
              onFavoriteToggle={() => {}}
            />
          ))
        ) : (
          <p className="text-gray-600 text-lg">No favorite cafes found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
