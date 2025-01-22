import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import PrevIcon from "../Icons/PrevIcon";
import NextIcon from "../Icons/NextIcon";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-4 text-md">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="previous"
      >
        <PrevIcon />
      </Button>

      <ul className="flex gap-2">
        {pagesArray.map((page) => (
          <li key={page}>
            <button
              className={
                currentPage === page
                  ? "text-white bg-accent rounded-full px-2 py-1"
                  : "px-2 py-1"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="next"
      >
        <NextIcon />
      </Button>
    </div>
  );
};
Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
