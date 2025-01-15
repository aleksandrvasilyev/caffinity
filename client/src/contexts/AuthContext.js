import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    };

    const storedToken = getCookie("token");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  const login = (authToken) => {
    setIsAuthenticated(true);
    setToken(authToken);

    const now = new Date();
    now.setTime(now.getTime() + 60 * 60 * 1000);
    const expires = now.toUTCString();

    document.cookie = `token=${authToken}; path=/; expires=${expires}; secure; SameSite=Strict;`;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);

    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Strict;";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
