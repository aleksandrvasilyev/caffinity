import React from "react";
import LogoIcon from "../Icons/LogoIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import { Link } from "react-router-dom";
import EmailIcon from "../Icons/EmailIcon";

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center p-6 h-auto flex flex-col md:flex-row items-center justify-between mt-2 space-y-6 md:space-y-0">
      <div className="flex flex-col space-y-4 p-4 items-center md:items-start">
        <Link to="/catalog" className="text-accent font-semibold">
          Catalog
        </Link>
        <Link to="/sign-up" className="text-accent font-semibold">
          Sign up
        </Link>
        <Link to="/login" className="text-accent font-semibold">
          Login
        </Link>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <LogoIcon className="self-center" />
        <p className="text-accent font-semibold">
          &copy; 2025, All rights reserved
        </p>
      </div>

      <div className="flex flex-col space-y-4 p-4 items-center md:items-end">
        <p className="text-accent font-semibold self-center text-md">
          Connect with Us
        </p>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/">
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/">
            <InstagramIcon />
          </a>
          <a href="mailto:caffinity@info.com">
            <EmailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
