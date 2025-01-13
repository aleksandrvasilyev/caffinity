import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import useFetch from "../../hooks/useFetch/useFetch";
import Input from "../Input/Input";
import useAuth from "../../hooks/useAuth/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [inputError, setInputError] = useState(null);
  const errorContainerRef = useRef(null);

  const navigate = useNavigate();

  const handleResponse = (data) => {
    if (data?.result?.token) {
      login(data.result.token);
    } else {
      setInputError("Invalid credentials. Please try again.");
    }
  };
  const handleLoginClick = () => {
    navigate("/");
  };

  const { isLoading, error, performFetch } = useFetch("/login", handleResponse);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValidation()) {
      return;
    }

    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        errorContainerRef.current &&
        !errorContainerRef.current.contains(event.target)
      ) {
        setInputError(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputValidation = () => {
    if (!loginData.username || !loginData.password) {
      setInputError("Please enter a valid username and password");
      return false;
    }
    return true;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col justify-center w-full max-w-md bg-primary p-6 rounded-lg text-accent "
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 rounded text-black mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 rounded text-black mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          onChange={handleChange}
        />

        {(inputError || isLoading || error) && (
          <div
            className="bg-white w-1/2 p-2 rounded-lg text-center"
            ref={errorContainerRef}
          >
            {inputError && <p>{inputError}</p>}
            {isLoading && <p>Wait a sec...</p>}
            {error && <p>{error.message}</p>}
          </div>
        )}

        <Button
          onClick={handleLoginClick}
          type="submit"
          className="rounded-full text-white bg-accent px-6 py-2 ml-auto w-1/2 hover:bg-accent-light transition"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
