// src/components/FunnelPreview.js
import React from "react";
import "./FunnelPreview.css";

const FunnelPreview = () => {
  return (
    <section className="funnel-preview-section">
      <div className="container">
        <h2>Visualize Your Growth Engine</h2>
        <p className="subtitle">
          See how our custom funnels guide customers from awareness to action.
          This is a visual demo of what we can build for you.
        </p>
        <div className="funnel-container">
          <div className="funnel-step">
            <div className="step-icon">📢</div>
            <h4>Ad Campaign</h4>
            <p>Facebook / Google Ads</p>
          </div>
          <div className="arrow">→</div>
          <div className="funnel-step">
            <div className="step-icon">📄</div>
            <h4>Landing Page</h4>
            <p>Capture Leads</p>
          </div>
          <div className="arrow">→</div>
          <div className="funnel-step">
            <div className="step-icon">📧</div>
            <h4>Email Sequence</h4>
            <p>Nurture & Educate</p>
          </div>
          <div className="arrow">→</div>
          <div className="funnel-step">
            <div className="step-icon">💰</div>
            <h4>Sales Page</h4>
            <p>Convert & Sell</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunnelPreview;
