import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cafe from "./pages/Cafe/Cafe";
import Catalog from "./pages/Catalog/Catalog";
import Favorite from "./pages/Favorite/Favorite";
import Header from "./components/Header/Header";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import AuthProvider from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafe/:id" element={<Cafe />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </AuthProvider>
  );
};

export default App;
