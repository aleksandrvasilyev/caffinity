import React from "react";
import CafeCard from "../../components/CafeCard/CafeCard";
import { useLocation } from "react-router-dom";

const CafeByCity = () => {
  const location = useLocation();

  const cafes = location.state.cafes;

  return (
    <div>
      {cafes.map((cafe) => (
        <CafeCard key={cafe._id} cafe={cafe} />
      ))}
    </div>
  );
};

export default CafeByCity;
