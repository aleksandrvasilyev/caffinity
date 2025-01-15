import React from "react";
import { render, screen } from "@testing-library/react";
import Filters from "../Filters";

describe("Filters component", () => {
  it("renders the filter button correctly", () => {
    render(<Filters onFilterChange={jest.fn()} />);
    const filterButton = screen.getByRole("button", { name: /filters/i });

    expect(filterButton).toBeInTheDocument();
    expect(filterButton).toHaveTextContent("Filters");
  });
});
