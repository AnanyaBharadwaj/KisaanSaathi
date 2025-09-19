// src/components/NewsCard.js
import React from 'react';
import './NewsCard.css'; // Import the CSS for styling the NewsCard

const NewsCard = () => {
  return (
    <div className="news-card">
      <h3>Latest News</h3>
      <div className="news-card-item">
        <a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)" target="_blank" rel="noopener noreferrer">
          React JS: A JavaScript library for building user interfaces
        </a>
      </div>
      <div className="news-card-item">
        <a href="https://en.wikipedia.org/wiki/Node.js" target="_blank" rel="noopener noreferrer">
          Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine
        </a>
      </div>
      {/* Add more news items as needed */}
    </div>
  );
}

export default NewsCard;
