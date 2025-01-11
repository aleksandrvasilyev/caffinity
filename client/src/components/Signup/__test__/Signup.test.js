import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "../Signup";
import useFetch from "../../../hooks/useFetch";

// Mock the custom hook
jest.mock("../../../hooks/useFetch");

// Mock the navigate function
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Helper function to render with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Signup", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    // Default mock implementation
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: jest.fn(),
    });
    localStorage.clear();
  });

  test("renders signup form correctly", () => {
    renderWithRouter(<Signup />);
    expect(screen.getByPlaceholderText("Enter a Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /signup/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Already have an account\? Login/i),
    ).toBeInTheDocument();
  });

  test("shows processing message when loading", () => {
    useFetch.mockReturnValue({
      isLoading: true,
      error: null,
      performFetch: jest.fn(),
    });

    renderWithRouter(<Signup />);
    expect(screen.getByText("Processing...")).toBeInTheDocument();
  });

  test("shows error message when API returns an error", () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: "Network error",
      performFetch: jest.fn(),
    });

    renderWithRouter(<Signup />);
    expect(screen.getByText("Something went wrong...")).toBeInTheDocument();
  });

  test("performs signup when form is submitted with matching passwords", () => {
    const mockPerformFetch = jest.fn();
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: mockPerformFetch,
    });

    renderWithRouter(<Signup />);

    const usernameInput = screen.getByPlaceholderText("Enter a Username");
    const passwordInput = screen.getByPlaceholderText("Enter password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    expect(mockPerformFetch).toHaveBeenCalledWith({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "testuser",
        password: "password123",
      }),
    });
  });

  test("handles successful signup response", () => {
    const mockPerformFetch = jest.fn();
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: mockPerformFetch,
    });

    renderWithRouter(<Signup />);

    // Simulate successful form submission
    const usernameInput = screen.getByPlaceholderText("Enter a Username");
    const passwordInput = screen.getByPlaceholderText("Enter password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /signup/i }));

    expect(mockPerformFetch).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled(); // Navigation happens after response
  });
});
