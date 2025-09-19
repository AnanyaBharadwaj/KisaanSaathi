import React from 'react';
import './Guidelines.css';

function Guidelines() {
  const guidelines = [
    {
      title: 'Soil Management',
      description: 'Learn how to test and improve soil health for better crop yield.',
    },
    {
      title: 'Water Conservation',
      description: 'Understand the importance of efficient irrigation techniques.',
    },
    {
      title: 'Pest Control',
      description: 'Guidelines for managing pests without harming the environment.',
    },
    {
      title: 'Crop Rotation',
      description: 'Maximize soil fertility and prevent pest build-up with proper crop rotation.',
    },
    {
      title: 'Sustainable Harvesting',
      description: 'Best practices for harvesting crops without depleting the land.',
    },
  ];

  return (
    <div className="guidelines">
      <h1>Guidelines</h1>
      <p>Follow these guidelines to improve your farming practices and achieve better results.</p>
      <div className="guidelines-cards">
        {guidelines.map((guide, index) => (
          <div className="card" key={index}>
            <h3>{guide.title}</h3>
            <p>{guide.description}</p>
            <button className="btn">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guidelines;
