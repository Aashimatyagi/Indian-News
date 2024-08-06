// src/components/NewsColumn.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NEWS_API_KEY, categories } from "../config";
import Tooltip from "./Tooltip";

const NewsColumn = ({
  source,
  title,
  favorites,
  addFavorite,
  removeFavorite,
}) => {
  const [articles, setArticles] = useState({});
  const [hoveredArticle, setHoveredArticle] = useState(null);

  useEffect(() => {
    categories.forEach((category) => {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=in&author=${source}&apiKey=${NEWS_API_KEY}`
        )
        .then((response) => {
          setArticles((prev) => ({
            ...prev,
            [category]: response.data.articles,
          }));
        })
        .catch((error) => console.error(error));
    });
  }, [source]);

  const handleFavorite = (article) => {
    const isFavorite = favorites.some((fav) => fav.url === article.url);
    if (isFavorite) {
      removeFavorite(article.url);
    } else {
      addFavorite(article);
    }
  };

  return (
    <div style={{ margin: "0 10px" }}>
      <h2>{title}</h2>
      {categories.map((category) => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          {articles[category] ? (
            articles[category].map((article, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredArticle(article)}
                onMouseLeave={() => setHoveredArticle(null)}
                style={{
                  marginBottom: "10px",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <h4 onClick={() => window.open(article.url, "_blank")}>
                  {article.title}
                </h4>
                <button onClick={() => handleFavorite(article)}>
                  {favorites.some((fav) => fav.url === article.url)
                    ? "Unfavorite"
                    : "Favorite"}
                </button>
                {hoveredArticle === article && (
                  <Tooltip article={hoveredArticle} />
                )}
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsColumn;
