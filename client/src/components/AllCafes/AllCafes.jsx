import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Pagination from "../Pagination/Pagination";

const AllCafes = () => {
  const [cafes, setCafes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, performFetch } = useFetch("/cafes", setCafes);

  useEffect(() => {
    performFetch({ method: "GET", params: { page: currentPage, limit: 10 } });
  }, [currentPage]);

  const results = Array.isArray(cafes?.result?.data) ? cafes.result.data : [];

  return (
    <div>
      {isLoading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center text-red-500">
          Failed to fetch cafes: {error.message}
        </div>
      )}
      <div className="">
        {!isLoading && !error && results.length > 0 && (
          <div className="flex justify-center  flex-wrap w-full mx-auto">
            {results.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-4 w-[400px] h-[400px] border-solid border-2 border-black  rounded-lg mx-4 my-4"
              >
                <div className="w-[100%] h-[300px]">
                  <img
                    src={
                      `https://hyf-cohort-49-group-c.s3.eu-north-1.amazonaws.com/cafes/cafes/${item.photos[0]}` ||
                      "https://via.placeholder.com/300"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col p-2">
                  <div className="font-bold text-xl">{item.title}</div>
                  <div className="text-sm">{item.description}</div>
                  <div className="text-sm">{item.rating}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination
        totalPages={cafes?.result?.totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllCafes;
