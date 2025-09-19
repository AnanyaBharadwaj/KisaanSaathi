
//import logo from '../assets/kslogo.png'; // Make sure to place your logo image in the assets folder or correct path

import React from 'react';
import './HeaderLanding.css';
import logo from '../assets/kslogo.png'; // Corrected path

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="KisaanSaathi Logo" className="logo-img" />
          <span className="logo-text">KisaanSaathi</span>
        </div>
       
      </nav>
    </header>
  );
};

export default Header;

