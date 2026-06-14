import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/HomePage.css";
import WebsiteShowcase from "../../components/WebsiteShowcase";
import OurProcess from "../../components/OurProcess";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="homepage">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Reps &amp; Revenue</h1>
          <h2 className="hero-subtitle">Built for Revenue</h2>
          <p className="subtitle">
            Professional websites for small businesses. Pay a £50 deposit to get
            started - if you love the site, just £250 covers the full build, one
            year of hosting, unlimited updates and ongoing support.
          </p>
          <Link to="/packages" className="btn">
            See Website Pricing
          </Link>
          <div className="social-proof">
            <p>Trusted by trades, coaches, consultants and creatives across the UK</p>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2 className="section-title">What You Get</h2>
          <div className="service-grid">
            <div className="service-card glass-card">
              <h3>Custom Designed Website</h3>
              <p>
                A mobile-ready, professionally designed site built around your
                brand, your services and your goals.
              </p>
            </div>
            <div className="service-card glass-card">
              <h3>£50 Deposit, Risk-Free Start</h3>
              <p>
                We begin building from just £50. Unlimited revisions are included
                at no extra cost while we perfect the design.
              </p>
            </div>
            <div className="service-card glass-card">
              <h3>Hosting, Updates &amp; Support</h3>
              <p>
                The £250 completion fee includes a full year of hosting,
                maintenance, future updates and unlimited assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-teaser">
        <div className="container">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-card glass-card">
              <h3>Deposit</h3>
              <div className="price">£50</div>
              <p className="description">Non-refundable deposit to start your build.</p>
              <ul>
                <li>✓ Custom website design</li>
                <li>✓ Unlimited revisions (within reason)</li>
                <li>✓ Delivered in 4-7 days</li>
              </ul>
            </div>
            <div className="pricing-card glass-card popular">
              <span className="popular-badge">Most Popular</span>
              <h3>Full Website</h3>
              <div className="price">£250</div>
              <p className="description">Pay only if you love the finished site.</p>
              <ul>
                <li>✓ Full website ownership</li>
                <li>✓ 1 year hosting included</li>
                <li>✓ Unlimited updates &amp; maintenance</li>
                <li>✓ Ongoing assistance</li>
              </ul>
            </div>
          </div>
          <p className="pricing-note">
            Want more? We also offer CRM integration, chatbots, advanced tooling
            and fully bespoke solutions.{" "}
            <Link to="/contact">Contact our sales team</Link> for custom pricing.
          </p>
        </div>
      </section>

      <WebsiteShowcase />

      <OurProcess />
    </div>
  );
};

export default HomePage;
