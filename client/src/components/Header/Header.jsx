import React from "react";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../icons/LogoIcon";
import Button from "../Button/Button";
import HeartIcon from "../Icons/HeartIcon";

const Header = () => {
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background border-b border-text">
      <div>
        <LogoIcon />
      </div>

      <div className="flex items-center gap-4">
        <HeartIcon onClick={handleFavoritesClick} className="cursor-pointer" />
        <Button className="bg-accent text-white rounded-3xl hover:bg-background border-accent border hover:text-text">
          Sign Up
        </Button>
        <Button className="bg-background border-accent border text-text rounded-3xl hover:bg-accent hover:border hover:text-background">
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
