// src/components/NewspaperSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NEWS_API_KEY } from "../config";
import NewsItem from "./NewsItem";
import "../styles/NewspaperSection.css";

const NewspaperSection = ({ sourceKey, source, favorites, toggleFavorite }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${NEWS_API_KEY}`
        );
        const allArticles = response.data.articles;

        // Filter articles to match source key either in source.name or author
        const filteredArticles = allArticles.filter((article) => {
          const sourceName = article.source.name.toLowerCase();
          const authorName = article.author ? article.author.toLowerCase() : "";
          const key = sourceKey.toLowerCase();

          return sourceName.includes(key) || authorName.includes(key);
        });

        setArticles(filteredArticles);
      } catch (error) {
        setError("Failed to fetch news.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [source, sourceKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const getFavoritesForSource = () => {
    return favorites.filter((article) => {
      const sourceName = article.source.name.toLowerCase();
      const key = sourceKey.toLowerCase();
      return sourceName.includes(key);
    });
  };

  const isFavorite = (article) =>
    favorites.some((fav) => fav.url === article.url);

  return (
    <div className="newspaper-section">
      <h2>
        {sourceKey
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())}
      </h2>
      {getFavoritesForSource().map((article, index) => (
        <NewsItem
          key={index}
          article={article}
          toggleFavorite={toggleFavorite}
          isFavorite
        />
      ))}
      {articles.map((article, index) => (
        <NewsItem
          key={index}
          article={article}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite(article)}
        />
      ))}
    </div>
  );
};

export default NewspaperSection;
