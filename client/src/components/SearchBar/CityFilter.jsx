import React, { useState } from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const CityFilter = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCafes = async (city, page) => {
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
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (e) => {
    const city = e.target.dataset.search || e.target.textContent;
    const data = await fetchCafes(city, 1);

    if (data?.success) {
      navigate("/cafe-by-city", {
        state: {
          cafes: data.result,
          currentPage: 1,
          error: error,
          isLoading: isLoading,
          city: city,
        },
      });
    } else {
      setError("No cafes found for the selected city.");
    }
  };
  return (
    <div className="flex sm:flex-row flex-col flex-wrap gap-3 justify-between mx-auto my-[4%]  p-5 my-20 w-[85%] h-auto">
      <Button
        className="bg-primary rounded-full text-white font-medium"
        data-search="Amsterdam"
        onClick={handleClick}
      >
        Amsterdam
      </Button>

      <Button
        className="bg-primary rounded-full text-white font-medium"
        data-search="Den Haag"
        onClick={handleClick}
      >
        The Hague
      </Button>

      <Button
        className="bg-primary rounded-full text-white font-medium"
        data-search="Rotterdam"
        onClick={handleClick}
      >
        Rotterdam
      </Button>
    </div>
  );
};

export default CityFilter;
