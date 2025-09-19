import React, { useEffect, useState } from 'react';
import './RightSidebar.css';

function RightSidebar() {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?q=agriculture AND India&apiKey=1fbfdc30d0de4a25985dd94d9a8819a1`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch news");
                }
                const data = await response.json();

                // Further filter news to be especially relevant for farmers
                const filteredNews = data.articles
                    .filter(article =>
                        article.title.toLowerCase().includes('farmer') || 
                        article.description?.toLowerCase().includes('farmer')
                    )
                    .map((article, index) => ({
                        id: index + 1,
                        title: article.title,
                        link: article.url,
                    }));

                // Limit to 6 news items
                setNewsItems(filteredNews.slice(0, 6));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div className="right-sidebar">Loading news...</div>;
    }

    if (error) {
        return <div className="right-sidebar">Error: {error}</div>;
    }

    return (
        <div className="right-sidebar">
            <h3>Recent Farmer-Specific News (India)</h3>
            {newsItems.length > 0 ? (
                <ul>
                    {newsItems.map(news => (
                        <li key={news.id}>
                            <a href={news.link} target="_blank" rel="noopener noreferrer">
                                {news.title}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No relevant news found.</p>
            )}
        </div>
    );
}

export default RightSidebar;