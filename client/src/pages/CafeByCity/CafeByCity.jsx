import React from "react";
import CafeCard from "../../components/CafeCard/CafeCard";
import { useLocation } from "react-router-dom";

const CafeByCity = () => {
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const cafes = location.state.cafes;

  return (
    <div>
      <CafeCard />
    </div>
  );
};

export default CafeByCity;
