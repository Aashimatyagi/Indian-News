// src/components/NewsItem.js
import React from "react";
import "../styles/NewsItem.css";

const NewsItem = ({ article, toggleFavorite, isFavorite }) => {
  const handleFavoriteClick = () => {
    toggleFavorite(article);
  };

  return (
    <div className="news-item">
      <h4 title={article.description}>{article.title}</h4>
      <button onClick={handleFavoriteClick}>{isFavorite ? "❤️" : "♡"}</button>
    </div>
  );
};

export default NewsItem;
