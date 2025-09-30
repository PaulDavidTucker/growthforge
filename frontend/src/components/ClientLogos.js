// src/components/ClientLogos.js
import React from "react";
import "./ClientLogos.css";

// In a real project, you would import these logos or get them from an API
// For this demo, we'll use placeholders.
const ClientLogos = () => {
  return (
    <div className="client-logos-section">
      <div className="container">
        <p className="section-subtitle">
          Powering the world's most innovative companies
        </p>
        <div className="logos-grid">
          {/* Replace these with your actual client logo image tags */}
          <div className="logo-placeholder">Client A</div>
          <div className="logo-placeholder">Client B</div>
          <div className="logo-placeholder">Client C</div>
          <div className="logo-placeholder">Client D</div>
          <div className="logo-placeholder">Client E</div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
