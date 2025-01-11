import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";
import useFetch from "../../../hooks/useFetch";

jest.mock("../../../hooks/useFetch");

describe("Login", () => {
  beforeEach(() => {
    // Default mock implementation
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: jest.fn(),
    });
    localStorage.clear();
  });

  test("render login form correctly", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("shows an error message when username or password is missing", () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(
      screen.getByText(/Please enter a valid username and password/i),
    ).toBeInTheDocument();
  });

  test("shows wait message when loading", () => {
    useFetch.mockReturnValue({
      isLoading: true,
      error: null,
      performFetch: jest.fn(),
    });

    render(<Login />);
    expect(screen.getByText(/Wait a sec.../i)).toBeInTheDocument();
  });

  test("shows error message when API returns an error", () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: { message: "Invalid credentials" },
      performFetch: jest.fn(),
    });

    render(<Login />);
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  test("shows success message when API returns success", () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: jest.fn(),
    });

    const mockResponse = { massage: "Invalid credentials", token: "" };

    render(<Login />);
    const performFetch = useFetch.mock.calls[0][1];
    performFetch(mockResponse);

    expect(screen.queryByText("Invalid credentials")).toBeNull();
  });
});
