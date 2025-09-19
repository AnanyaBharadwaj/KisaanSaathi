import React, { useState } from 'react';
import '../../ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState(14);

  const placeholders = {
    en: {
      email: 'Enter your email',
    },
    hi: {
      email: 'अपना ईमेल दर्ज करें',
    },
  };

  const labels = {
    en: {
      email: 'Email',
    },
    hi: {
      email: 'ईमेल',
    },
  };

  const handleFontSizeChange = (change) => {
    const newFontSize = Math.max(12, fontSize + change); // Limit minimum font size to 12px
    setFontSize(newFontSize);
    document.documentElement.style.setProperty('--base-font-size', `${newFontSize}px`);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    // Basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(language === 'en' ? 'Invalid email format!' : 'अमान्य ईमेल प्रारूप!');
      return;
    }

    // Simulate sending the reset email
    setMessage(
      language === 'en'
        ? 'Password reset email has been sent!'
        : 'पासवर्ड रीसेट ईमेल भेजा गया है!'
    );
  };

  return (
    <div className="forgot-password-page" style={{ fontSize: `${fontSize}px` }}>
      {/* Combined Header */}
      <div className="combined-header">
        {/* Top Bar */}
        <div className="header-top">
          <div className="container">
            {/* Left: Government Logo */}
            <div className="goi">
              <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer noopener">
                <img
                  src="https://img1.digitallocker.gov.in/assets/img/indian_flag.jpg"
                  alt="Indian Flag"
                  width="33"
                />
                <strong>{language === 'en' ? 'Government of India' : 'भारत सरकार'}</strong>
              </a>
            </div>

            {/* Right: Font Size Controls and Language Selector */}
            <div className="text-size-controls">
              <button onClick={() => handleFontSizeChange(1)} className="button-native">
                A+
              </button>
              <button onClick={() => handleFontSizeChange(-1)} className="button-native">
                A-
              </button>
              <span className="partition">|</span>
              <select value={language} onChange={handleLanguageChange} className="language-selector">
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blue Header */}
        <header className="header">
          <div className="header-content">
            <img
              src="frontend/KisaanSaathi_Logo (1).png"
              alt="Logo"
              className="forgot-password-logo"
            />
            <h1>{language === 'en' ? 'KisaanSaathi' : 'किसान साथी'}</h1>
          </div>
        </header>
      </div>

      {/* Forgot Password Form */}
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <h2>{language === 'en' ? 'Forgot Password' : 'पासवर्ड भूल गए'}</h2>
        </div>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{labels[language].email}</label>
            <input
              type="email"
              placeholder={placeholders[language].email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="forgot-password-button">
            {language === 'en' ? 'Send Reset Email' : 'रीसेट ईमेल भेजें'}
          </button>
        </form>
        {message && (
          <p className={`forgot-password-message ${message.includes('sent') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
