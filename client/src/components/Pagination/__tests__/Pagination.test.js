import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "../Pagination";

let mockOnPageChange;

beforeEach(() => {
  mockOnPageChange = jest.fn();
});

const renderPagination = (totalPages, currentPage) => {
  render(
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={mockOnPageChange}
    />,
  );
};

test("renders Pagination correctly", () => {
  renderPagination(5, 1);

  // Check if the buttons are rendered
  const prevButton = screen.getByRole("button", { name: /previous/i });
  expect(prevButton).toBeInTheDocument();
  const nextButton = screen.getByRole("button", { name: /next/i });
  expect(nextButton).toBeInTheDocument();

  // Check if the pages are rendered correctly
  expect(screen.getByText("1")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();
  expect(screen.getByText("4")).toBeInTheDocument();
  expect(screen.getByText("5")).toBeInTheDocument();
});

test("highlights the current page", () => {
  renderPagination(5, 3);

  // Check if the correct page has the "active" class
  const currentPage = screen.getByText("3");
  expect(currentPage).toHaveClass("active");
});

test("disables Prev button on the first page", () => {
  renderPagination(5, 1);

  const prevButton = screen.getByRole("button", { name: /previous/i });
  expect(prevButton).toBeDisabled();
});

test("disables Next button on the last page", () => {
  renderPagination(5, 5);

  const nextButton = screen.getByRole("button", { name: /next/i });
  expect(nextButton).toBeDisabled();
});

test("clicking on a page number calls onPageChange with the correct page", () => {
  renderPagination(5, 1);

  const page2 = screen.getByText("2");
  fireEvent.click(page2);

  expect(mockOnPageChange).toHaveBeenCalledWith(2);
});

test("clicking on the Prev button calls onPageChange with the previous page", () => {
  renderPagination(5, 3);

  const prevButton = screen.getByRole("button", { name: /previous/i });
  fireEvent.click(prevButton);

  expect(mockOnPageChange).toHaveBeenCalledWith(2);
});

test("clicking on the Next button calls onPageChange with the next page", () => {
  renderPagination(5, 3);

  const nextButton = screen.getByRole("button", { name: /next/i });
  fireEvent.click(nextButton);

  expect(mockOnPageChange).toHaveBeenCalledWith(4);
});

test("does not call onPageChange if Prev is clicked on the first page", () => {
  renderPagination(5, 1);

  const prevButton = screen.getByRole("button", { name: /previous/i });
  fireEvent.click(prevButton);

  expect(mockOnPageChange).not.toHaveBeenCalled();
});

test("does not call onPageChange if Next is clicked on the last page", () => {
  renderPagination(5, 5);

  const nextButton = screen.getByRole("button", { name: /next/i });
  fireEvent.click(nextButton);

  expect(mockOnPageChange).not.toHaveBeenCalled();
});
