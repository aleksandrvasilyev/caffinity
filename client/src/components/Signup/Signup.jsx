import React, { useState, useEffect, useRef } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch/useFetch";

const Signup = () => {
  const navigate = useNavigate();
  const errorContainerRef = useRef(null);

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [feedback, setFeedback] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { isLoading, error, performFetch } = useFetch("/register", (data) => {
    if (data.success) {
      setFeedback(true);
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordMatchCheck()) {
      return;
    }

    const submitData = {
      username: formData.username,
      password: formData.password,
    };

    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const passwordMatchCheck = () => {
    const match = formData.password === formData.confirmPassword;
    setPasswordMatch(match);
    return match;
  };

  const clearErrorsOnClickOutside = (event) => {
    if (
      errorContainerRef.current &&
      !errorContainerRef.current.contains(event.target)
    ) {
      setPasswordMatch(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clearErrorsOnClickOutside);
    return () => {
      document.removeEventListener("click", clearErrorsOnClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        className="flex flex-col justify-center w-full max-w-md bg-primary p-6 rounded-lg text-accent"
        onSubmit={handleSubmit}
      >
        <h1 className="text-[2rem] font-bold drop-shadow-lg mt-4 mb-2">
          Signup
        </h1>

        <p className="text-left text-md mb-8">
          Create an account and start sharing your cafe experiences with
          Caffinity!
        </p>

        <Input
          placeholder="Enter a Username"
          type="text"
          name="username"
          onChange={handleChange}
        />

        <Input
          placeholder="Enter password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <Input
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
        />

        {feedback && (
          <div className="flex flex-col items-center justify-center m-4 bg-white">
            <p className=" text-accent mb-4 p-4 rounded-lg ">
              Account created successfully!
            </p>
            <p className="text-accent mb-4 p-4 rounded-lg">
              Redirecting to login page...
            </p>
          </div>
        )}

        {(!passwordMatch || isLoading || error) && (
          <div
            className="flex flex-col items-center justify-center mb-4 bg-white p-4 rounded-lg"
            ref={errorContainerRef}
          >
            {!passwordMatch && (
              <p className="text-accent">Passwords do not match</p>
            )}
            {isLoading && <p>Processing...</p>}

            {error && (
              <div className="text-center">
                <p>Something went wrong...</p>
                <br />
                <p className="text-accent">{error}</p>
              </div>
            )}
          </div>
        )}

        <Button
          type="submit"
          className="rounded-full text-white bg-accent px-6 py-2 ml-auto w-1/2 hover:bg-accent-light transition mt-2"
        >
          Signup
        </Button>

        <Link className="mt-10 " to="/login">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Signup;
