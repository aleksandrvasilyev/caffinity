import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AllCafes from "../AllCafes";
import useFetch from "../../../hooks/useFetch";

// Mock the useFetch hook
jest.mock("../../../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the Pagination component
jest.mock("../../Pagination/Pagination", () => {
  const PropTypes = require("prop-types");

  const MockPagination = ({ currentPage, onPageChange }) => (
    <div>
      <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
    </div>
  );

  MockPagination.displayName = "MockPagination";

  MockPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };

  return MockPagination;
});

// Mock data
const mockResults = [
  {
    _id: "1",
    photos: ["photo1.jpg"],
    title: "Cafe 1",
    description: "A cozy cafe",
    rating: "4.5",
  },
  {
    _id: "2",
    photos: ["photo2.jpg"],
    title: "Cafe 2",
    description: "Another cozy cafe",
    rating: "4.0",
  },
];

// Test cases
describe("AllCafes Component", () => {
  test("shows loading state", () => {
    useFetch.mockReturnValue({
      isLoading: true,
      error: null,
      performFetch: jest.fn(),
    });

    render(<AllCafes />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(
      screen.queryByText(/Failed to fetch cafes:/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Cafe/i)).not.toBeInTheDocument();
  });

  test("displays error message when fetching fails", () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: { message: "Network Error" },
      performFetch: jest.fn(),
    });

    render(<AllCafes />);

    expect(screen.getByText(/Failed to fetch cafes:/i)).toBeInTheDocument();
    expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
  });

  test("handles pagination changes", () => {
    const mockPerformFetch = jest.fn();
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: mockPerformFetch,
      data: { result: { data: mockResults, totalPages: 2 } },
    });

    render(<AllCafes />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockPerformFetch).toHaveBeenCalledWith({
      method: "GET",
      params: { page: 2, limit: 10 },
    });
  });
});
