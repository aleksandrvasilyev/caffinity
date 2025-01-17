import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import useFetch from "../../../hooks/useFetch/useFetch";
import useAuth from "../../../hooks/useAuth/useAuth";

jest.mock("../../../hooks/useFetch/useFetch");
jest.mock("../../../hooks/useAuth/useAuth");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Login", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: jest.fn(),
    });

    useAuth.mockReturnValue({
      login: mockLogin,
    });

    localStorage.clear();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
  };

  test("renders login form with all elements correctly", () => {
    renderLogin();

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(
      screen.getByText("Don't have an account? Register"),
    ).toBeInTheDocument();
  });

  test("handles input changes correctly", () => {
    renderLogin();

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpass" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpass");
  });

  test("shows loading state when submitting", () => {
    useFetch.mockReturnValue({
      isLoading: true,
      error: null,
      performFetch: jest.fn(),
    });

    renderLogin();

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    expect(screen.getByText("Wait a sec...")).toBeInTheDocument();
  });

  test("handles successful login correctly", async () => {
    const mockPerformFetch = jest.fn();
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: mockPerformFetch,
    });

    renderLogin();

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpass" } });

    fireEvent.click(loginButton);

    expect(mockPerformFetch).toHaveBeenCalledWith({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "testuser",
        password: "testpass",
      }),
    });
  });

  test("handles failed login attempt correctly", async () => {
    const mockPerformFetch = jest.fn();
    useFetch.mockReturnValue({
      isLoading: false,
      error: null,
      performFetch: mockPerformFetch,
    });

    renderLogin();

    await act(async () => {
      const handleResponse = useFetch.mock.calls[0][1];
      handleResponse({ msg: "Invalid credentials" });
    });

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });
});
