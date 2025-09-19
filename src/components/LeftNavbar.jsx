import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaChartBar, FaCog, FaUser, FaHome, FaBars } from "react-icons/fa";

const LeftNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      style={isOpen ? sidebarStyle : sidebarCollapsedStyle}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div style={logoContainerStyle}>
        {isOpen ? <h2 style={logoStyle}>KisaanSaathi</h2> : <h2 style={logoCollapsedStyle}>KS</h2>}
      </div>
      <button onClick={toggleSidebar} style={toggleButtonStyle}>
        <FaBars />
      </button>
      <ul style={menuStyle}>
        <li style={menuItemStyle}>
          <FaHome style={iconStyle} />
          {isOpen && (
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
          )}
        </li>
        <li style={menuItemStyle}>
          <FaChartBar style={iconStyle} />
          {isOpen && (
            <Link to="/graphs" style={linkStyle}>
              Graphs
            </Link>
          )}
        </li>
        <li style={menuItemStyle}>
          <FaCog style={iconStyle} />
          {isOpen && <span>Settings</span>}
        </li>
        <li style={menuItemStyle}>
          <FaUser style={iconStyle} />
          {isOpen && <span>Profile</span>}
        </li>
      </ul>
    </aside>
  );
};

// Styles
const sidebarStyle = {
  width: "250px",
  backgroundColor: "#f8f9fa",
  color: "#333",
  padding: "20px",
  height: "100vh",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  transition: "width 0.3s ease",
};

const sidebarCollapsedStyle = {
  width: "80px",
  backgroundColor: "#f8f9fa",
  color: "#333",
  padding: "20px",
  height: "100vh",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  transition: "width 0.3s ease",
};

const logoContainerStyle = {
  marginBottom: "30px",
  textAlign: "center",
};

const logoStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#0073aa",
};

const logoCollapsedStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#0073aa",
};

const menuStyle = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
};

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px 15px",
  marginBottom: "15px",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  color: "#555",
  transition: "all 0.3s ease",
};

const iconStyle = {
  marginRight: "10px",
  fontSize: "18px",
  color: "#0073aa",
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const toggleButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#0073aa",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "20px",
};

export default LeftNavbar;
