import React from "react";
import Button from "../Button/Button";

const HomeFilters = () => {
  return (
    <div
      className="flex sm:flex-row flex-col flex-wrap gap-3 justify-between mx-auto my-[4%]  p-5 my-20 w-full h-auto"
      data-utility={["cozy-atmosphere"]}
    >
      <Button
        className="bg-primary rounded-full text-white font-medium"
        data-utility={["wifi", "non-smoking-area"]}
      >
        Quiet Space
      </Button>

      <Button
        className="bg-primary rounded-full text-white font-medium"
        data-utility={["live-music", "board-games", "playground"]}
      >
        Vibrant Atmosphere
      </Button>

      <Button
        className="bg-primary rounded-full text-white font-medium"
        data-utility={["wifi"]}
      >
        Wifi Strength
      </Button>

      <Button
        className="bg-primary rounded-full text-white font-medium"
        data-utility={["cozy-atmosphere", "non-smoking-area", "pet-friendly"]}
      >
        Cozy & Relaxing Space
      </Button>
    </div>
  );
};

export default HomeFilters;
