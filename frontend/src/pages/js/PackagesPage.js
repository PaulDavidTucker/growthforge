// src/pages/PackagesPage.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/PackagesPage.css";
import ChatbotShowcase from "../../components/ChatbotShowcase";

const PackagesPage = () => {
  return (
    <div className="packages-page container">
      <h1>Our Packages</h1>
      <p className="packages-intro">
        Choose the plan that's right for your business. Each package is designed
        to deliver maximum impact and a significant return on investment.
      </p>

      <div className="package-grid">
        <div className="package-card">
          <h2>Starter</h2>
          <p className="price">$500</p>
          <ul>
            <li>✓ Custom Sales Funnel</li>
            <li>✓ Basic Ad Package</li>
            <li>- AI Chatbot</li>
            <li>- Lead Automation</li>
          </ul>
          <Link to="/contact" className="btn">
            Get Started
          </Link>
        </div>
        <div className="package-card popular">
          <h2>Growth</h2>
          <p className="price">$750</p>
          <ul>
            <li>✓ Custom Sales Funnel</li>
            <li>✓ Advanced Ad Package</li>
            <li>✓ AI Chatbot (FAQs)</li>
            <li>- Lead Automation</li>
          </ul>
          <Link to="/contact" className="btn">
            Get Started
          </Link>
        </div>
        <div className="package-card">
          <h2>Scale</h2>
          <p className="price">$1,000</p>
          <ul>
            <li>✓ Multi-Step Sales Funnel</li>
            <li>✓ Pro Ad Package</li>
            <li>✓ Advanced AI Chatbot</li>
            <li>✓ Lead Automation Outreach</li>
          </ul>
          <Link to="/contact" className="btn">
            Get Started
          </Link>
        </div>
      </div>
      <ChatbotShowcase />
    </div>
  );
};

export default PackagesPage;
