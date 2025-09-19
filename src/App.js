// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import Features from './components/Features';
import Footer from './components/Footer';
import Guidelines from './components/Guidelines';
import FAQs from './components/FAQs';
import Navbar from './components/Navbar';
import AdminDashBoard from './components/AdminDashBoard';
import Weather from './components/Weather';
import RightSidebar from './components/RightSidebar';

function App() {
  const [activeSection, setActiveSection] = useState('features'); // default section

  return (
    <div className="App">
      <Header />
      <HeroSection />
      <Navbar />
      
      <div className="content">
        <Sidebar setActiveSection={setActiveSection} />
        
        <div className="main-section">
          {activeSection === 'features' && <Features />}
          {activeSection === 'AdminDashBoard' && <AdminDashBoard />}
          {activeSection === 'guidelines' && <Guidelines />}
          {activeSection === 'faqs' && <FAQs />}
          {activeSection === 'weather' && <Weather />} {/* Render Weather component */}
        </div>

        <RightSidebar />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;

