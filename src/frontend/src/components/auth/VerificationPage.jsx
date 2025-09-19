import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed
import '../../VerificationPage.css';

function VerificationPage() {
  const location = useLocation();
  const { language = 'en', email } = location.state || {}; // Get language and email from state
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Log email to verify it's being passed correctly
  console.log('Email:', email);

  const handleVerify = async (e) => {
    e.preventDefault();

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Use backend URL from .env or fallback to localhost

    try {
      const response = await axios.post(`${backendUrl}/api/auth/verify-code`, { email, code });
      setMessage(language === 'en' ? response.data.message : 'ईमेल सफलतापूर्वक सत्यापित किया गया!');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after successful verification
    } catch (error) {
      setMessage(language === 'en' ? error.response.data.message : 'अमान्य सत्यापन कोड। कृपया पुनः प्रयास करें।');
    }
  };

  return (
    <div className="signup-page">
      <div className="combined-header">
        {/* Top Bar */}
        <div className="header-top">
          <div className="container">
            <div className="goi">
              <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer noopener">
                <img src="https://img1.digitallocker.gov.in/assets/img/indian_flag.jpg" alt="Indian Flag" width="33" />
                <strong>{language === 'en' ? 'Government of India' : 'भारत सरकार'}</strong>
              </a>
            </div>
          </div>
        </div>

        {/* Blue Header */}
        <header className="header">
          <div className="header-content">
            <img src="frontend/KisaanSaathi_Logo (1).png" alt="Logo" className="signup-logo" />
            <h1>{language === 'en' ? 'KisaanSaathi' : 'किसान साथी'}</h1>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <div className="verification-container">
        <h2>{language === 'en' ? 'Verify Your Email' : 'अपना ईमेल सत्यापित करें'}</h2>
        <p>
          {language === 'en' ? 'A verification code has been sent to your email. Please enter it below.' : 'एक सत्यापन कोड आपके ईमेल पर भेजा गया है। कृपया इसे नीचे दर्ज करें।'}
        </p>
        <form onSubmit={handleVerify}>
          <div className="form-group">
            <label>{language === 'en' ? 'Verification Code' : 'सत्यापन कोड'}</label>
            <input
              type="text"
              placeholder={language === 'en' ? 'Enter code' : 'कोड दर्ज करें'}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button type="submit" className="signup-button">
            {language === 'en' ? 'Verify' : 'सत्यापित करें'}
          </button>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  );
}

export default VerificationPage;
