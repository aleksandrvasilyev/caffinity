import React from "react";
import Button from "../Button/Button";

const TopDisplay = () => {
  return (
    <>
      <div className="flex sm:flex-row flex-col flex-wrap gap-3 justify-between p-5 mx-auto my-[10%] w-full h-[20%]">
        <Button className="bg-primary rounded-full text-white font-medium   ">
          Best for Solo work
        </Button>
        <Button className="bg-primary rounded-full text-white font-medium ">
          Vibrant Atmosphere
        </Button>
        <Button className="bg-primary rounded-full text-white font-medium ">
          Wifi Strength
        </Button>
        <Button className="bg-primary rounded-full text-white font-medium ">
          Specialty Coffee
        </Button>
      </div>

      <div className=" font-bold text-2xl text-center ">
        Top Rated Cafe&apos;s{" "}
      </div>

      <div>
        <div className=""></div>
      </div>
    </>
  );
};

export default TopDisplay;
