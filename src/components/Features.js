import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section id="features" className="features-section">
      <h2>Our Key Features</h2>
      <div className="feature-cards">
        <div className="card">
          <h3>Commodity Price Predictions</h3>
          <p>Advanced tools to forecast commodity prices.</p>
        </div>
        <div className="card">
          <h3>Data Visualization</h3>
          <p>Interactive charts and graphs for insights.</p>
        </div>
        <div className="card">
          <h3>Informed Insights</h3>
          <p>Access to historical data and trends for better predictions.</p>
        </div>
       
      </div>
    </section>
  );
};

export default Features;
