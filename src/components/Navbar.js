// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#about">About Us</a></li>
        <li><a href="http://localhost:3000/login">Log In</a></li>
        <li><a href="#signup">Sign Up</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
