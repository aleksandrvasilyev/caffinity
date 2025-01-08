import React, { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import useFetch from "../../hooks/useFetch";

const Login = () => {
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [response, setResponse] = useState({ message: "", token: "" });
  const [inputError, setInputError] = useState(null);
  const [storageError, setStorageError] = useState(null);
  const { isLoading, error, performFetch } = useFetch("/login", setResponse);
  const errorContainerRef = useRef(null);

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

  // to close the error message when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        errorContainerRef.current &&
        !errorContainerRef.current.contains(event.target)
      ) {
        setInputError(null);
        setStorageError(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // to update the loginData state
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value.trim() });
  };

  // to save the token in local storage
  useEffect(() => {
    if (response.token)
      try {
        localStorage.setItem("token", response.token);
      } catch (error) {
        setStorageError("Error saving token to local storage", error);
      }
  }, [response.token]);

  // to validate the input fields or now maybe we call add more validation checks or handle it in backend
  const inputValidation = () => {
    if (!loginData.userName || !loginData.password) {
      setInputError("Please enter a valid username and password");
      return false;
    }
    return true;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="flex flex-col justify-center w-full max-w-md bg-primary p-6 rounded-lg text-accent ">
        <label className="w-full">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            className="w-full p-3 rounded text-black mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            onChange={handleChange}
          />
        </label>

        <label className="w-full">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded text-black mb-6 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
            onChange={handleChange}
          />
        </label>

        {(inputError ||
          storageError ||
          isLoading ||
          error ||
          response.message) && (
          <div
            className="bg-white w-1/2 p-2 rounded-lg text-center"
            ref={errorContainerRef}
          >
            {inputError && <p>{inputError}</p>}
            {isLoading && <p>Wait a sec...</p>}
            {storageError && <p>{storageError}</p>}
            {error && (
              <p>{error.message || "Something went wrong! Try Again."}</p>
            )}
            {!isLoading && !error && response && <p>{response.message}</p>}
          </div>
        )}

        <Button
          type="submit"
          className="rounded-full text-white bg-accent px-6 py-2 ml-auto w-1/2 hover:bg-accent-light transition"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
