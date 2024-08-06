// src/components/App.js
import React, { useState, useEffect } from "react";
import { newsSources } from "./config";
import NewspaperSection from "./components/NewspaperSection";
import "./styles/App.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (article) => {
    let updatedFavorites = [];
    if (favorites.some((fav) => fav.url === article.url)) {
      updatedFavorites = favorites.filter((fav) => fav.url !== article.url);
    } else {
      updatedFavorites = [...favorites, article];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Daily News from Top Newspapers</h1>
      </header>
      {Object.keys(newsSources).map((sourceKey) => (
        <NewspaperSection
          key={sourceKey}
          sourceKey={sourceKey}
          source={newsSources[sourceKey]}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default App;
