import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopDisplay from "../../components/TopDisplay/TopDisplay";

const Home = () => {
  return (
    <div>
      <p className="text-4xl font-bold"> Welcome to Caffinity! </p>

      <SearchBar />
      <TopDisplay />
    </div>
  );
};

export default Home;
