// src/components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

function Sidebar({ setActiveSection }) {
  const registrationLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSdA-xNvfNXVMG-_XDRFn2OSJj3JW2Klo_eivXF61T5aEOTzNw/viewform?usp=sharing"; // Replace with your Google Form URL

  return (
    <div className="sidebar">
      <button onClick={() => setActiveSection('features')}>Commodity</button>
      <button onClick={() => setActiveSection('guidelines')}>Guidelines</button>
      <button onClick={() => setActiveSection('faqs')}>FAQs</button>
      <button onClick={() => setActiveSection('weather')}>Weather Forecast</button>

      {/* Registration Button with Highlight */}
      <div className="sidebar-registration">
        <span className="highlight-badge">FOR FARMERS</span>
        <button onClick={() => window.open(registrationLink, "_blank")}>
          Registration
        </button>
      </div>
    </div>
  );
}

export default Sidebar;