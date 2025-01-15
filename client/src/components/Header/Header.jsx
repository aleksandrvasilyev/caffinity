import React from "react";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../Icons/LogoIcon";
import Button from "../Button/Button";
import HeartIcon from "../Icons/HeartIcon";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSignUpClick = () => {
    navigate("/sign-up");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  return (
    <header className="flex items-center justify-between px-4 py-7 bg-background border-b border-text">
      <div
        className="flex flex-row cursor-pointer gap-2 p-0"
        onClick={handleLogoClick}
      >
        <LogoIcon />{" "}
        <div className="flex">
          <p className="self-center font-roboto text-accent text-2xl">
            Caffinity
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <HeartIcon onClick={handleFavoritesClick} className="cursor-pointer" />
        <Button
          onClick={handleSignUpClick}
          className="bg-accent text-white rounded-3xl hover:bg-background border-accent border hover:text-text"
        >
          Sign Up
        </Button>
        <Button
          onClick={handleLoginClick}
          className="bg-background border-accent border text-text rounded-3xl hover:bg-accent hover:border hover:text-background"
        >
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
