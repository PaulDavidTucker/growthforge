// src/pages/PackagesPage.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/PackagesPage.css";
import ChatbotShowcase from "../../components/ChatbotShowcase";

const PackagesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="packages-page container">
      <div className="page-header">
        <h1>Find your Growth Plan</h1>
        <p className="packages-intro">
          Transparent pricing for serious results. Choose the package that
          aligns with your business goals.
        </p>
      </div>
      <div className="package-grid">
        <div className="package-card glass-card">
          <h2>Starter</h2>
          <p className="description">
            For businesses ready to build a foundational sales funnel.
          </p>
          <ul>
            <li>✓ Custom Sales Funnel Design</li>
            <li>✓ Basic Ad Campaign Setup</li>
            <li>✓ Lead Form Integration</li>
            <li>✘ AI Chatbot</li>
            <li>✘ Lead Automation</li>
          </ul>
          <Link to="/contact" className="btn">
            Learn More
          </Link>
        </div>
        <div className="package-card glass-card popular">
          <h2>Growth</h2>
          <p className="description">
            The complete package to automate and scale your lead generation.
          </p>
          <ul>
            <li>✓ Advanced Funnel Strategy</li>
            <li>✓ Pro Ad Package & Management</li>
            <li>✓ AI Chatbot (FAQs & Lead Capture)</li>
            <li>✓ Email List Integration</li>
            <li>✘ Advanced Automation</li>
          </ul>
          <Link to="/contact" className="btn">
            Learn More
          </Link>
        </div>
        <div className="package-card glass-card">
          <h2>Scale</h2>
          <p className="description">
            A fully custom, enterprise-level solution for maximum growth.
          </p>
          <ul>
            <li>✓ Multi-Step Funnel Ecosystem</li>
            <li>✓ Enterprise Ad Management</li>
            <li>✓ Advanced Conversational AI</li>
            <li>✓ Full Lead Automation Outreach</li>
            <li>✓ CRM Integration</li>
          </ul>
          <Link to="/contact" className="btn">
            Learn More
          </Link>
        </div>
      </div>
      <ChatbotShowcase />
    </div>
  );
};

export default PackagesPage;
