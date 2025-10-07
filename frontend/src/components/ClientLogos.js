// src/components/ClientLogos.js
import React from "react";
import "./ClientLogos.css";

// Each SVG is a simple, royalty-free design that represents a generic tech company.
const ClientLogos = () => {
  return (
    <div className="client-logos-section">
      <div className="container">
        <p className="section-subtitle">
          Powering the world's most innovative companies
        </p>
        <div className="logos-grid">
          {/* Logo 1: Apex Solutions */}
          <a
            href="/case-studies"
            className="client-logo"
            aria-label="Apex Solutions"
          >
            <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <title>Apex Solutions</title>
              <path d="M0 40 L20 0 L40 40 Z M30 20 L20 0 L10 20 Z" />
              <text
                x="50"
                y="28"
                fontFamily="Inter, sans-serif"
                fontSize="20"
                fontWeight="bold"
              >
                APEX
              </text>
            </svg>
          </a>

          {/* Logo 2: Quantum Leap */}
          <a
            href="/case-studies"
            className="client-logo"
            aria-label="Quantum Leap"
          >
            <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <title>Quantum Leap</title>
              <circle
                cx="20"
                cy="20"
                r="18"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
              />
              <circle cx="20" cy="20" r="10" />
              <text
                x="45"
                y="28"
                fontFamily="Inter, sans-serif"
                fontSize="20"
                fontWeight="bold"
              >
                Quantum
              </text>
            </svg>
          </a>

          {/* Logo 3: Starlight */}
          <a href="case-studies" className="client-logo" aria-label="Starlight">
            <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <title>Starlight</title>
              <path d="M20 0 L25 15 L40 15 L28 25 L32 40 L20 30 L8 40 L12 25 L0 15 L15 15 Z" />
              <text
                x="48"
                y="28"
                fontFamily="Inter, sans-serif"
                fontSize="20"
                fontWeight="bold"
              >
                Starlight
              </text>
            </svg>
          </a>

          {/* Logo 4: Nexus Corp */}
          <a
            href="/case-studies"
            className="client-logo"
            aria-label="Nexus Corp"
          >
            <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <title>Nexus Corp</title>
              <rect x="0" y="0" width="15" height="40" rx="3" />
              <rect x="20" y="0" width="15" height="40" rx="3" />
              <text
                x="45"
                y="28"
                fontFamily="Inter, sans-serif"
                fontSize="20"
                fontWeight="bold"
              >
                Nexus
              </text>
            </svg>
          </a>

          {/* Logo 5: Innovate Inc */}
          <a
            href="/case-studies"
            className="client-logo"
            aria-label="Innovate Inc"
          >
            <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <title>Innovate Inc</title>
              <circle cx="20" cy="20" r="20" />
              <circle cx="20" cy="20" r="15" fill="#0B0B1A" />
              <circle cx="20" cy="20" r="10" />
              <text
                x="50"
                y="28"
                fontFamily="Inter, sans-serif"
                fontSize="20"
                fontWeight="bold"
              >
                Innovate
              </text>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
