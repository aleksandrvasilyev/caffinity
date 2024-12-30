import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header", () => {
  let navigate;

  beforeEach(() => {
    navigate = useNavigate();
  });

  test("renders the header with logo and buttons", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByTestId("logo-icon")).toBeInTheDocument();
  });

  test("navigates to the favorites page when HeartIcon is clicked", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const heartIcon = screen.getByTestId("heart-icon");

    fireEvent.click(heartIcon);

    expect(navigate).toHaveBeenCalledWith("/favorites");
  });
});
