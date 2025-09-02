// src/components/Footer.js
import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"; // Import icons
import NewsletterSignup from "./NewsletterSignup";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Column 1: About */}
        <div className="footer-about">
          <h3>GrowthForge</h3>
          <p>Automated systems for business growth.</p>
          <p className="copyright">
            &copy; {new Date().getFullYear()} GrowthForge. All Rights Reserved.
          </p>
        </div>

        {/* Column 2: Newsletter */}
        <div className="footer-subscribe">
          <NewsletterSignup />
        </div>

        {/* Column 3: Social Media */}
        <div className="footer-social">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
