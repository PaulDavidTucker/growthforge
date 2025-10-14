// src/components/Footer.js
import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"; // Import icons
import NewsletterSignup from "./NewsletterSignup";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Column 1: About */}
        <div className="footer-about">
          <h3>Reps &amp; Revenue</h3>
          <p>Automated systems for business growth.</p>
          <a
            href="/static/Reps-and-Revenue-Ts-and-Cs.pdf"
            download="terms-and-conditions.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms &amp; Conditions
          </a>
          <a
            href="/static/Reps-and-Revenue-Privacy-Policy.pdf"
            download="privacy-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            id="priv"
          >
            Privacy Policy
          </a>
          <p className="copyright">
            &copy; {new Date().getFullYear()} Reps&amp;Revenue. All Rights
            Reserved.
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
              href="https://www.instagram.com/repsandrev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@repsrevenue?_t=ZP-90YDE3C3Nxn&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.facebook.com/people/RepsRevenue/61581665985621/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
