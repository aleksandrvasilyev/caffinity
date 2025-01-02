import React from "react";
import { render, screen } from "@testing-library/react";
import CafeCard from "../CafeCard";

const mockCafe = {
  _id: "1",
  title: "Cafe Mocha",
  description: "A cozy place with great coffee and Wi-Fi.",
  address: "123 Coffee St, Amsterdam",
  rating: 4.5,
  numReviews: 120,
  photos: ["photo1.jpg"],
};

describe("CafeCard", () => {
  test("renders the cafe title", () => {
    render(<CafeCard cafe={mockCafe} />);
    const titleElement = screen.getByText(mockCafe.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the cafe description", () => {
    render(<CafeCard cafe={mockCafe} />);
    const descriptionElement = screen.getByText(mockCafe.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders the correct number of reviews", () => {
    render(<CafeCard cafe={mockCafe} />);
    const reviewsElement = screen.getByText(`(${mockCafe.numReviews} reviews)`);
    expect(reviewsElement).toBeInTheDocument();
  });

  test("renders the cafe address", () => {
    render(<CafeCard cafe={mockCafe} />);
    const addressElement = screen.getByText(mockCafe.address);
    expect(addressElement).toBeInTheDocument();
  });
});
