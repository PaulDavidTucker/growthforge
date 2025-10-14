import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";
import FunnelPreview from "../../components/FunnelPreview";
// import ClientLogos from "../../components/ClientLogos";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Reps &amp; Revenue</h1>
          <h2 className="hero-subtitle">Turn Workouts to Payouts</h2>
          <p className="subtitle">
            We build automated systems that drive sales, streamline customer
            service, and capture leads, so you can focus on what you do best.
          </p>
          <Link to="/packages" className="btn">
            Explore Our Packages
          </Link>
          <div className="social-proof">
            <p>Trusted by innovative businesses across the globe</p>
          </div>
        </div>
      </section>

      {/* <ClientLogos />*/}

      <section className="services">
        <div className="container">
          <h2 className="section-title">What We Do</h2>
          <div className="service-grid">
            {/* Now using the reusable glass-card style */}
            <div className="service-card glass-card">
              <h3>Sales &amp; Growth Funnels</h3>
              <p>
                Custom-built funnels integrated with targeted ad campaigns to
                convert prospects into loyal customers.
              </p>
            </div>
            <div className="service-card glass-card">
              <h3>AI Chatbot Applications</h3>
              <p>
                Automate customer support, answer FAQs, and qualify leads 24/7
                with intelligent, conversational AI.
              </p>
            </div>
            <div className="service-card glass-card">
              <h3>Lead Automation Outreach</h3>
              <p>
                Powerful outreach systems that engage potential clients, turning
                cold leads into warm opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FunnelPreview />
    </div>
  );
};

export default HomePage;
