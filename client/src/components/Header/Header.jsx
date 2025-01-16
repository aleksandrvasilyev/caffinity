import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import LogoIcon from "../Icons/LogoIcon";
import Button from "../Button/Button";
import HeartIcon from "../Icons/HeartIcon";
import UserDefaultIcon from "../Icons/UserDefaultIcon";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setShowDropdown(false);
    }
  }, [isAuthenticated]);

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

        {!isAuthenticated ? (
          <>
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
          </>
        ) : (
          <div className="relative">
            <UserDefaultIcon
              size={30}
              className="cursor-pointer"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white text-black py-1 px-4 rounded shadow">
                <button onClick={handleLogout} className="w-full text-left">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
