import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SearchBar from "../SearchBar";

beforeEach(() => {
  fetch.resetMocks();
});

test("makes an API call on search", async () => {
  fetch.mockResponseOnce(JSON.stringify({ results: [{ name: "Amsterdam" }] }));
  render(<SearchBar />);

  const input = screen.getByPlaceholderText(
    "Search for cafes by name, city, or features",
  );
  const filtersButton = screen.getByRole("button", { name: /filters/i });
  const searchButton = screen.getByRole("button", { name: "search" });

  // Select filters
  fireEvent.click(filtersButton);
  fireEvent.click(screen.getByRole("checkbox", { name: /wifi/i }));
  fireEvent.click(screen.getByRole("checkbox", { name: /outdoor-seating/i }));

  // search
  fireEvent.change(input, { target: { value: "Amsterdam" } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/search"),
      expect.objectContaining({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          query: "Amsterdam",
          filters: ["Wifi", "Outdoor-seating"],
        }),
      }),
    );
  });
});

test("selected filters persist after reopening filter menu", () => {
  render(<SearchBar />);

  const filtersButton = screen.getByRole("button", { name: /filters/i });

  // Open filter menu and select options
  fireEvent.click(filtersButton);
  fireEvent.click(screen.getByRole("checkbox", { name: /wifi/i }));
  fireEvent.click(screen.getByRole("checkbox", { name: /outdoor-seating/i }));
  fireEvent.click(filtersButton); // Close menu

  // Reopen and verify selections
  fireEvent.click(filtersButton);
  expect(screen.getByRole("checkbox", { name: /wifi/i })).toBeChecked();
  expect(
    screen.getByRole("checkbox", { name: /outdoor-seating/i }),
  ).toBeChecked();
});

test("renders default state correctly", () => {
  render(<SearchBar />);

  expect(
    screen.getByPlaceholderText("Search for cafes by name, city, or features"),
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /filters/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "search" })).toBeInTheDocument();
});
