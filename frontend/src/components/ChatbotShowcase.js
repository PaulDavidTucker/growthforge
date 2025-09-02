// src/components/ChatbotShowcase.js
import React from "react";
import ChatbotDemo from "../../src/pages/js/ChatBotDemo"; // The interactive demo
import "./ChatbotShowcase.css";

const ChatbotShowcase = () => {
  return (
    <section className="chatbot-showcase">
      <div className="container showcase-grid">
        {/* Column 1: Interactive Demo */}
        <div className="showcase-demo-wrapper">
          <ChatbotDemo />
        </div>

        {/* Column 2: Benefits Text */}
        <div className="showcase-benefits">
          <h2>Work Smarter, Not Harder</h2>
          <p>
            An AI Chatbot is your tireless employee, working 24/7 to engage
            visitors, answer questions, and qualify leads.
          </p>
          <ul>
            <li>
              <strong>Instant Customer Support:</strong> Provide immediate
              answers to common questions, improving user satisfaction.
            </li>
            <li>
              <strong>Lead Qualification:</strong> Automatically screen visitors
              and book meetings with only the most qualified leads.
            </li>
            <li>
              <strong>Boost Sales:</strong> Guide users through your sales
              funnel and proactively offer assistance, increasing conversions.
            </li>
            <li>
              <strong>Reduce Workload:</strong> Free up your team to focus on
              high-value tasks instead of repetitive inquiries.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ChatbotShowcase;
