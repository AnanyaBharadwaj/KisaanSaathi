import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import '../../Signup.css';

function Signup() {
  const [fontSize, setFontSize] = useState(14); // Base font size
  const [language, setLanguage] = useState('en'); // Default language
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // To differentiate between success and error
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); // React Router's navigate function

  const placeholders = {
    en: {
      name: 'Enter your name',
      email: 'Enter your official email',
      employeeId: 'Enter your Employee ID',
      password: 'Enter your password',
      confirmPassword: 'Confirm your password',
    },
    hi: {
      name: 'अपना नाम दर्ज करें',
      email: 'अपना आधिकारिक ईमेल दर्ज करें',
      employeeId: 'अपना कर्मचारी आईडी दर्ज करें',
      password: 'अपना पासवर्ड दर्ज करें',
      confirmPassword: 'अपना पासवर्ड पुष्टि करें',
    },
  };

  const labels = {
    en: {
      name: 'Name',
      email: 'Email',
      employeeId: 'Employee ID',
      password: 'Password',
      confirmPassword: 'Confirm Password',
    },
    hi: {
      name: 'नाम',
      email: 'ईमेल',
      employeeId: 'कर्मचारी आईडी',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड पुष्टि करें',
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePasswordStrength = (password) => {
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 8;

    if (!lowerCase || !upperCase || !specialChar || !minLength) {
      return language === 'en'
        ? 'Password must contain at least 8 characters, including uppercase, lowercase, and a special character.'
        : 'पासवर्ड में कम से कम 8 अक्षर, अपरकेस, लोअरकेस और एक विशेष वर्ण शामिल होना चाहिए।';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, employeeId, password, confirmPassword } = formData;

    // Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(language === 'en' ? 'Email must include "@" and have a valid domain.' : 'ईमेल में "@" और एक मान्य डोमेन शामिल होना चाहिए।');
      setMessageType('error');
      return;
    }
    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
      setMessage(passwordError);
      setMessageType('error');
      return;
    }
    if (password !== confirmPassword) {
      setMessage(language === 'en' ? 'Passwords do not match!' : 'पासवर्ड मेल नहीं खाते!');
      setMessageType('error');
      return;
    }
    if (!name || !employeeId || !password) {
      setMessage(language === 'en' ? 'Please fill all fields!' : 'कृपया सभी फ़ील्ड भरें!');
      setMessageType('error');
      return;
    }

    // API call to backend
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/auth/signup`, formData);
      console.log(response.data);
      // Redirect to verification page
      navigate('/verification', { state: { language, email } });
    } catch (error) {
      setMessage(language === 'en' ? error.response?.data?.message : 'साइन अप में समस्या हुई!');
      setMessageType('error');
    }
  };

  return (
    <div className="signup-page">
      {/* Combined Header */}
      <div className="combined-header">
        {/* Top Bar */}
        <div className="header-top">
          <div className="container">
            <div className="goi">
              <a
                href="https://www.india.gov.in/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src="https://img1.digitallocker.gov.in/assets/img/indian_flag.jpg"
                  alt="Indian Flag"
                  width="33"
                />
                <strong>{language === 'en' ? 'Government of India' : 'भारत सरकार'}</strong>
              </a>
            </div>
          </div>
        </div>

        {/* Blue Header */}
        <header className="header">
          <div className="header-content">
            <img
              src="frontend/KisaanSaathi_Logo (1).png"
              alt="Logo"
              className="signup-logo"
            />
            <h1>{language === 'en' ? 'KisaanSaathi' : 'किसानसाथी'}</h1>
          </div>
        </header>
      </div>

      {/* Signup Form */}
      <div className="signup-container" style={{ fontSize: `${fontSize}px` }}>
        <div className="signup-header">
          <h2>{language === 'en' ? 'Sign Up' : 'साइन अप करें'}</h2>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div className="form-group" key={field}>
              <label>
                {labels[language][field]}
              </label>
              <div className={field === 'password' || field === 'confirmPassword' ? 'password-wrapper' : ''}>
                <input
                  type={field === 'password' ? (showPassword ? 'text' : 'password') : (field === 'confirmPassword' ? 'password' : 'text')}
                  name={field}
                  value={formData[field]}
                  placeholder={placeholders[language][field]}
                  onChange={handleInputChange}
                />
                {field === 'password' && (
                  <i
                    className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} eye-icon`}
                    onClick={() => setShowPassword(prev => !prev)}
                    role="button"
                    aria-label="Toggle password visibility"
                  ></i>
                )}
              </div>
            </div>
          ))}
          <button type="submit" className="signup-button">
            {language === 'en' ? 'Sign Up' : 'साइन-अप करें'}
          </button>
        </form>
        {message && (
          <p className={`signup-message ${messageType}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
