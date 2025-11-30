import React, { useState } from "react";
import Router from "./Router/Router";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    if (favorites.find((p) => p.id === product.id)) {
      setFavorites(favorites.filter((p) => p.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };
  return (
    <div>
      <Router favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default App;
