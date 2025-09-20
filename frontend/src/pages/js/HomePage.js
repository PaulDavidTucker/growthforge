import React from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";
import { motion } from "framer-motion";
import FunnelPreview from "../../components/FunnelPreview";

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <h1>Reps and Revenue</h1>
          <h2>Supercharge Your Business Growth</h2>
          <p className="subtitle">
            We build automated systems that drive sales, streamline customer
            service, and capture leads, so you can focus on what you do best.
          </p>
          <Link to="/packages" className="btn">
            Explore Our Packages
          </Link>
        </div>
      </section>

      <section className="services">
        <div className="container" id="services">
          <h2>Our Core Services</h2>
          <div className="service-grid">
            <motion.div
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="service-card">
                <h3>Sales & Growth Funnels</h3>
                <p>
                  Custom-built funnels integrated with targeted ad campaigns to
                  convert prospects into loyal customers.
                </p>
              </div>
              <div className="service-card">
                <h3>AI Chatbot Applications</h3>
                <p>
                  Automate customer support, answer FAQs, and qualify leads 24/7
                  with intelligent, conversational AI.
                </p>
              </div>
              <div className="service-card">
                <h3>Lead Automation Outreach</h3>
                <p>
                  Powerful outreach systems that engage potential clients across
                  multiple platforms, turning cold leads into warm
                  opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FunnelPreview />
    </div>
  );
};

export default HomePage;
