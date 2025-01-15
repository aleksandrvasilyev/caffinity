import React from "react";
import { render, screen } from "@testing-library/react";
import FilterDropdown from "../FilterDropdown";

jest.mock("../../../hooks/useFetch", () => ({
  __esModule: true,
  default: () => ({
    performFetch: jest.fn(),
  }),
}));

describe("FilterDropdown", () => {
  const mockProps = {
    onFilterChange: jest.fn(),
    selectedFilters: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    const mockSetState = jest.fn();
    jest.spyOn(React, "useState").mockImplementation(() => [[], mockSetState]);

    render(<FilterDropdown {...mockProps} />);

    const containerElement = screen.getByRole("list");
    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass("bg-primary");
  });
});
