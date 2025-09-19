import React, { useState } from 'react';
import "../App.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => setIsMobile(!isMobile);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Hamburger Icon for Mobile */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navbar Menu */}
        <ul className={`navbar-menu ${isMobile ? 'active' : ''}`}>
          <li className="navbar-item">Home</li>
          <li className="navbar-item">Price & Arrivals</li>
          <li className="navbar-item">Weather Forecast</li>
          <li className="navbar-item">Price Trend</li>
          <li className="navbar-item">Mobile App</li>
          <li className="navbar-item">Chatbot</li>
          <li className="navbar-item">Tender</li>
        </ul>

        {/* Search Bar */}
    
      </div>
    </nav>
  );
};

export default Navbar;
