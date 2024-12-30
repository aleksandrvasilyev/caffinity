import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cafe from "./pages/Cafe/Cafe";
import Catalog from "./pages/Catalog/Catalog";
import Favorite from "./pages/Favorite/Favorite";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorites" element={<Favorite />} />
      </Routes>
    </>
  );
};

export default App;
