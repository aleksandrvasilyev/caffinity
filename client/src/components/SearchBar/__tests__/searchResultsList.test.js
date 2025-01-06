import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import SearchResultsList from "../SearchResultsList";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("SearchResultsList", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders search results correctly", () => {
    const searchResults = [
      { _id: 1, title: "Cafe One" },
      { _id: 2, title: "Cafe Two" },
    ];

    render(<SearchResultsList searchResults={searchResults} />);

    // Assert that all search results are displayed
    expect(screen.getByText("Cafe One")).toBeInTheDocument();
    expect(screen.getByText("Cafe Two")).toBeInTheDocument();
  });

  it("navigates to the correct cafe when a result is clicked", () => {
    const searchResults = [
      { _id: 1, title: "Cafe One" },
      { _id: 2, title: "Cafe Two" },
    ];

    render(<SearchResultsList searchResults={searchResults} />);

    // Click on a result
    fireEvent.click(screen.getByText("Cafe One"));

    // Assert navigation was triggered with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith("/cafes/1");
  });

  it("handles an empty results array without errors", () => {
    render(<SearchResultsList searchResults={[]} />);

    // Ensure nothing is displayed
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
