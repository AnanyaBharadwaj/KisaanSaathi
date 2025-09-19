import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard'; // Import the NewsCard component

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Replace the URL with your real API endpoint
    axios.get('https://newsapi.org/v2/top-headlines?apiKey=614d681fe5906987f28e76e348a9160f')
      .then(response => {
        setNews(response.data); // Assuming the response has an array of news
      })
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="news-section">
      <h2>Latest News</h2>
      {news.map((newsItem, index) => (
        <NewsCard
          key={index}
          title={newsItem.title}
          description={newsItem.description}
          url={newsItem.url} // URL for full article (Wikipedia or any other site)
        />
      ))}
    </div>
  );
};

export default NewsSection;
