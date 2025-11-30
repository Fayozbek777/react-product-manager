import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import ProtInfo from "../pages/ProInfo/ProtInfo";
import FavoritePro from "../pages/Favorite/FavoritePro";
import NotFound from "../components/NotFound/NotFound";

const Router = ({ favorites, toggleFavorite }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />}
      />
      <Route path="/products/:id" element={<ProtInfo />} />
      <Route
        path="/favorites"
        element={<FavoritePro favorites={favorites} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
