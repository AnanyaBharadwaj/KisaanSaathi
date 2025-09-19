import React from "react";
import "../App.css";

function Header() {
  return (
    <header className="top-header">
      <div className="header-left">
        <img src="Chart/line-graph/public/Flag_img.png" alt="India Flag" className="flag-icon" />
      </div>

      <div className="header-middle">
        <p className="header-title">KisaanSaathi</p>
      </div>

      <div className="header-right">
        <div className="header-right-text">Azadi Ka Amrit Mahotsav</div>
        <select className="language-selector">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
