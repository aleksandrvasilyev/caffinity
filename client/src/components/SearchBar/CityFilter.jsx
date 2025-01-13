import React from "react";
import Button from "../Button/Button";

const CityFilter = () => {
  return (
    <div className="flex sm:flex-row flex-col flex-wrap gap-3 justify-between mx-auto my-[4%]  p-5 my-20 w-[85%] h-auto">
      <Button className="bg-primary rounded-full text-white font-medium">
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
