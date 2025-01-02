import React, { useEffect, useState } from "react";
import CafeCard from "../../components/CafeCard/CafeCard";

const Home = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/cafes?limit=5&page=1",
        );
        const data = await response.json();
        setCafes(data.result.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching cafes");
        setLoading(false);
      }
    };

    fetchCafes();
  }, []);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl m-2 font-bold mb-4 text-center">
        Top Rated Cafes
      </h1>
      {loading ? (
        <p className="text-center">Loading cafes...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
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
