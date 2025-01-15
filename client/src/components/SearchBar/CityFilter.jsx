import React, { useState } from "react";
import Button from "../Button/Button";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const CityFilter = () => {
  const navigate = useNavigate();
  const [cafeByCity, setCafeByCity] = useState([]);

  const { performFetch } = useFetch("/search", setCafeByCity);

  const handleClick = (e) => {
    const city = e.target.value;

    performFetch({
      method: "GET",
      city: city,
    });

    navigate("/cafeByCity", { state: { cafes: cafeByCity } });
  };

  return (
    <div className="flex sm:flex-row flex-col flex-wrap gap-3 justify-between mx-auto my-[4%]  p-5 my-20 w-[85%] h-auto">
      <Button
        className="bg-primary rounded-full text-white font-medium"
        value="Amsterdam"
        onClick={handleClick}
      >
        Amsterdam
      </Button>

      <Button className="bg-primary rounded-full text-white font-medium">
        The Hague
      </Button>

      <Button className="bg-primary rounded-full text-white font-medium">
        Rotterdam
      </Button>
    </div>
  );
};

export default CityFilter;
