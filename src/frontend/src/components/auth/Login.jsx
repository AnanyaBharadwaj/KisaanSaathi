import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import '../../Login.css';

function Login() {
  const [fontSize, setFontSize] = useState(14); // Base font size
  const [language, setLanguage] = useState('en'); // Default language
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totp, setTotp] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const placeholders = {
    en: {
      email: 'Enter your email',
      password: 'Enter your password',
      totp: 'Enter 6-digit code',
    },
    hi: {
      email: 'अपना ईमेल दर्ज करें',
      password: 'अपना पासवर्ड दर्ज करें',
      totp: '6-अंकीय कोड दर्ज करें',
    },
  };

  const labels = {
    en: {
      email: 'Email',
      password: 'Password',
      totp: 'Secret Key',
    },
    hi: {
      email: 'ईमेल',
      password: 'पासवर्ड',
      totp: 'गूगल ऑथेंटिकेटर कोड',
    },
  };

  const handleFontSizeChange = (change) => {
    setFontSize((prevSize) => Math.max(12, prevSize + change)); // Minimum font size 12px
    document.documentElement.style.setProperty('--base-font-size', `${fontSize + change}px`);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    // Ensure backend URL is accessed correctly
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { email, password, totp });
      setMessage(language === 'en' ? 'Login successful!' : 'लॉगिन सफल रहा!');
    } catch (error) {
      setMessage(
        language === 'en'
          ? error.response?.data?.message || 'An error occurred.'
          : error.response?.data?.message || 'एक त्रुटि हुई।'
      );
    }
  };

  return (
    <div className="login-page" style={{ fontSize: `${fontSize}px` }}>
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
              className="login-logo"
            />
            <h1>{language === 'en' ? 'KisaanSaathi' : 'किसान साथी'}</h1>
          </div>
        </header>
      </div>

      {/* Login Form */}
      <div className="login-container">
        <div className="login-header">
          <h2>{language === 'en' ? 'Login' : 'लॉग इन करें'}</h2>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {['email', 'password', 'totp'].map((field) => (
            <div className="form-group" key={field}>
              <label>{labels[language][field]}</label>
              <div className={field === 'password' ? 'password-wrapper' : ''}>
                <input
                  type={field === 'password' && !showPassword ? 'password' : 'text'}
                  placeholder={placeholders[language][field]}
                  value={field === 'email' ? email : field === 'password' ? password : totp}
                  onChange={(e) =>
                    field === 'email'
                      ? setEmail(e.target.value)
                      : field === 'password'
                      ? setPassword(e.target.value)
                      : setTotp(e.target.value)
                  }
                />
                {field === 'password' && (
                  <i
                    className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} eye-icon`}
                    onClick={() => setShowPassword((prev) => !prev)}
                    role="button"
                    aria-label="Toggle password visibility"
                  ></i>
                )}
              </div>
            </div>
          ))}

          <button type="submit" className="login-button">
            {language === 'en' ? 'Login' : 'लॉग इन करें'}
          </button>
        </form>

        {message && (
          <p className={`login-message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <div className="login-footer">
          
          <a href="/signup">{language === 'en' ? "Don't have an account? Sign up here" : 'खाता नहीं है? यहां साइन अप करें।'}</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
