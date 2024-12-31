import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  });

  const renderHeader = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

  test("renders the logo icon", () => {
    renderHeader();
    const logoIcon = screen.getByRole("img", { name: /logo/i });
    expect(logoIcon).toBeInTheDocument();
  });

  test("renders the favorites button", () => {
    renderHeader();
    const favoritesButton = screen.getByRole("button", { name: /favorites/i });
    expect(favoritesButton).toBeInTheDocument();
  });

  test("renders the Sign Up and Login buttons", () => {
    renderHeader();
    const signUpButton = screen.getByRole("button", { name: /sign up/i });
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(signUpButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("navigates to favorites when the favorites button is clicked", async () => {
    renderHeader();
    const favoritesButton = screen.getByRole("button", { name: /favorites/i });
    await userEvent.click(favoritesButton);

    expect(mockNavigate).toHaveBeenCalledWith("/favorites");
  });
});
