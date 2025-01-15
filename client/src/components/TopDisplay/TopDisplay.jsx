import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import CarouselDisplay from "./CarouselDisplay";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const TopDisplay = () => {
  const [topCafes, setTopCafes] = useState([]);
  const { isLoading, error, performFetch } = useFetch("/cafes", setTopCafes);
  const navigate = useNavigate();

  useEffect(() => {
    performFetch({ method: "GET" });
  }, []);

  const results = Array.isArray(topCafes)
    ? topCafes
    : topCafes?.result?.data || [];

  return (
    <>
      <div className="font-bold text-2xl text-center">Top Rated Cafes</div>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center text-red-500">
          Failed to fetch cafes: {error.message}
        </div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <CarouselDisplay
          results={results.sort((a, b) => b.rating - a.rating)}
        />
      )}

      <div className="flex justify-center items-center">
        <Button
          className="bg-primary rounded-full text-white font-medium my-10"
          onClick={() => {
            navigate("/catalog");
          }}
        >
          Browse All
        </Button>
      </div>
    </>
  );
};

export default TopDisplay;
