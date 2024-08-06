// src/components/Tooltip.js
import React from "react";
import "../styles/Tooltip.css";

const Tooltip = ({ article }) => {
  return (
    <div className="tooltip">
      <h5>{article.title}</h5>
      <p>{article.description}</p>
      <p>
        <strong>Source:</strong> {article.source.name}
      </p>
      <p>
        <strong>Published:</strong>{" "}
        {new Date(article.publishedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Tooltip;
