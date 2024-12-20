import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul className="flex space-x-4 p-4 text-accent">
        <li>
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/catalog" className="hover:text-gray-400">
            Catalog
          </Link>
        </li>
        <li>
          <Link to="/favorites" className="hover:text-gray-400">
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
